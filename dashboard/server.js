const http = require('http');
const fs = require('fs');
const path = require('path');
const { spawn, exec } = require('child_process');

const PORT = process.env.PORT || 4000;
const ROOT_DIR = path.resolve(__dirname, '..');
const PUBLIC_DIR = path.join(__dirname, 'public');
const ALLURE_REPORT_DIR = path.join(ROOT_DIR, 'allure-report');
const PLAYWRIGHT_REPORT_DIR = path.join(ROOT_DIR, 'playwright-report');
const ALLURE_RESULTS_DIR = path.join(ROOT_DIR, 'allure-results');
const TEST_RESULTS_DIR = path.join(ROOT_DIR, 'test-results');

let currentProcess = null;

// Clean old test artifacts to prevent ghost tests and result pollution
function cleanOldReports() {
  let cleanedCount = 0;
  try {
    // 1. Dọn dẹp allure-results (giữ lại history nếu có để duy trì xu hướng)
    if (fs.existsSync(ALLURE_RESULTS_DIR)) {
      const files = fs.readdirSync(ALLURE_RESULTS_DIR);
      for (const file of files) {
        if (file === 'history') continue;
        const fullPath = path.join(ALLURE_RESULTS_DIR, file);
        try {
          if (fs.statSync(fullPath).isDirectory()) {
            fs.rmSync(fullPath, { recursive: true, force: true });
          } else {
            fs.unlinkSync(fullPath);
          }
          cleanedCount++;
        } catch {}
      }
    }

    // 2. Dọn dẹp test-results (video, screenshots, trace nặng)
    if (fs.existsSync(TEST_RESULTS_DIR)) {
      const files = fs.readdirSync(TEST_RESULTS_DIR);
      for (const file of files) {
        const fullPath = path.join(TEST_RESULTS_DIR, file);
        try {
          if (fs.statSync(fullPath).isDirectory()) {
            fs.rmSync(fullPath, { recursive: true, force: true });
          } else {
            fs.unlinkSync(fullPath);
          }
          cleanedCount++;
        } catch {}
      }
    }
  } catch (err) {
    console.error('Lỗi khi dọn dẹp báo cáo cũ:', err);
  }
  return cleanedCount;
}
let currentRun = {
  running: false,
  total: 0,
  passed: 0,
  failed: 0,
  skipped: 0,
  tests: [],
  logs: []
};

const sseClients = new Set();

function broadcast(event, data) {
  const payload = `event: ${event}\ndata: ${JSON.stringify(data)}\n\n`;
  for (const client of sseClients) {
    try {
      client.write(payload);
    } catch {
      sseClients.delete(client);
    }
  }
}

// Check if Java is installed
let isJavaInstalled = false;
function checkJava() {
  return new Promise((resolve) => {
    exec('java -version', (err, stdout, stderr) => {
      const output = (stdout + stderr).toLowerCase();
      isJavaInstalled = !err && (output.includes('version') || output.includes('runtime'));
      resolve(isJavaInstalled);
    });
  });
}

// Open browser cross-platform
function openBrowser(url) {
  const platform = process.platform;
  let cmd = '';
  if (platform === 'win32') {
    cmd = `start "" "${url}"`;
  } else if (platform === 'darwin') {
    cmd = `open "${url}"`;
  } else {
    cmd = `xdg-open "${url}"`;
  }
  exec(cmd, () => {});
}

// Find all test spec files
function getTestFiles(dir = path.join(ROOT_DIR, 'src', 'tests')) {
  let results = [];
  if (!fs.existsSync(dir)) return results;
  const list = fs.readdirSync(dir);
  for (const file of list) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) {
      results = results.concat(getTestFiles(fullPath));
    } else if (file.endsWith('.spec.ts')) {
      const relPath = path.relative(path.join(ROOT_DIR, 'src', 'tests'), fullPath).replace(/\\/g, '/');
      results.push(relPath);
    }
  }
  return results;
}

// Generate Allure Report
function generateAllureReport() {
  return new Promise((resolve, reject) => {
    broadcast('status', { message: 'Đang tạo báo cáo Allure...' });
    
    // Choose the best available allure command
    let allureCmd = 'npx allure generate allure-results --clean -o allure-report';
    const localAllureWin = path.join(ROOT_DIR, 'node_modules', '.bin', 'allure.cmd');
    const localAllureUnix = path.join(ROOT_DIR, 'node_modules', '.bin', 'allure');
    
    if (process.platform === 'win32' && fs.existsSync(localAllureWin)) {
      allureCmd = `"${localAllureWin}" generate allure-results --clean -o allure-report`;
    } else if (process.platform !== 'win32' && fs.existsSync(localAllureUnix)) {
      allureCmd = `"${localAllureUnix}" generate allure-results --clean -o allure-report`;
    }

    exec(allureCmd, { cwd: ROOT_DIR }, (err, stdout, stderr) => {
      if (err) {
        console.error('Lỗi khi chạy Allure:', stderr || err.message);
        // Fallback with npx allure-commandline
        exec('npx allure-commandline generate allure-results --clean -o allure-report', { cwd: ROOT_DIR }, (fallbackErr) => {
          if (fallbackErr) {
            broadcast('allureError', { message: 'Không thể tạo Allure Report. Vui lòng kiểm tra môi trường Java!' });
            resolve(false);
          } else {
            broadcast('allureReady', { url: '/allure-report/index.html' });
            resolve(true);
          }
        });
      } else {
        broadcast('allureReady', { url: '/allure-report/index.html' });
        resolve(true);
      }
    });
  });
}

// Kill running test process safely
function stopCurrentRun() {
  if (!currentProcess || !currentRun.running) return;
  const pid = currentProcess.pid;
  try {
    if (process.platform === 'win32') {
      exec(`taskkill /pid ${pid} /T /F`);
    } else {
      process.kill(-pid, 'SIGKILL');
    }
  } catch (e) {
    try { currentProcess.kill('SIGKILL'); } catch {}
  }
  currentRun.running = false;
  broadcast('runStopped', { message: 'Đã dừng test theo yêu cầu của người dùng.' });
}

// Start test run
function startTestRun(options) {
  if (currentRun.running) {
    return { error: 'Một phiên test đang chạy. Vui lòng chờ hoặc bấm Dừng.' };
  }

  const { project, projects, file, files, headed, grep, workers, cleanReport, retries, isRerun } = options;

  // Pre-run Cleanup: Chỉ xóa kết quả cũ khi cleanReport !== false và không phải chế độ rerun
  if (cleanReport !== false && !isRerun) {
    const cleaned = cleanOldReports();
    console.log(`[CLEANUP] Đã tự động dọn dẹp ${cleaned} tệp kết quả kiểm thử cũ.`);

    currentRun = {
      running: true,
      isRerun: false,
      total: 0,
      passed: 0,
      failed: 0,
      skipped: 0,
      tests: [],
      logs: []
    };

    currentRun.logs.push('🧹 Đã tự động làm sạch dữ liệu kiểm thử cũ (allure-results và test-results).');
  } else {
    console.log('[RERUN] Chạy lại test case lỗi - bảo lưu toàn bộ kết quả kiểm thử trước đó.');
    currentRun.running = true;
    currentRun.isRerun = true;
    currentRun.logs.push('🔁 Đang chạy lại các bài kiểm thử bị lỗi (bảo lưu kết quả các bài test đã Passed)...');
  }

  const args = ['playwright', 'test'];

  // Hỗ trợ chọn nhiều file hoặc 1 file hoặc toàn bộ
  let selectedFiles = [];
  if (Array.isArray(files) && files.length > 0) {
    selectedFiles = files;
  } else if (file && file.trim()) {
    selectedFiles = [file.trim()];
  }

  if (selectedFiles.length > 0) {
    for (let f of selectedFiles) {
      f = f.replace(/\\/g, '/');
      const idx = f.toLowerCase().indexOf('src/tests/');
      const relPath = idx !== -1 ? f.substring(idx + 'src/tests/'.length) : f;
      args.push(path.join('src', 'tests', relPath).replace(/\\/g, '/'));
    }
  }

  // Hỗ trợ chọn 1 project hoặc nhiều projects (ví dụ chromium-guest + firefox-guest)
  let selectedProjects = [];
  if (Array.isArray(projects) && projects.length > 0) {
    selectedProjects = projects.filter(p => p && p !== 'all');
  } else if (project && project !== 'all') {
    selectedProjects = [project];
  }

  if (selectedProjects.length > 0) {
    for (const p of selectedProjects) {
      args.push(`--project=${p}`);
    }
  }

  if (headed) {
    args.push('--headed');
  }

  if (grep && grep.trim()) {
    const cleanGrep = grep.trim();
    if (/[ &|<>\^]/.test(cleanGrep)) {
      args.push(`--grep="${cleanGrep.replace(/"/g, '\\"')}"`);
    } else {
      args.push(`--grep=${cleanGrep}`);
    }
  }

  if (workers && Number(workers) > 0) {
    args.push(`--workers=${workers}`);
  }

  if (retries && Number(retries) > 0) {
    args.push(`--retries=${retries}`);
  }

  // Use our custom reporter and keep allure-playwright + html
  args.push('--reporter=./dashboard/reporter.js,allure-playwright,html');

  const cmd = process.platform === 'win32' ? 'npx.cmd' : 'npx';
  broadcast('runStarted', { options, command: `npx ${args.join(' ')}` });

  const env = {
    ...process.env,
    HEADLESS: headed ? 'false' : 'true'
  };

  currentProcess = spawn(cmd, args, {
    cwd: ROOT_DIR,
    shell: true,
    detached: process.platform !== 'win32',
    env
  });

  currentProcess.stdout.on('data', (data) => {
    const text = data.toString();
    const lines = text.split('\n');

    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed) continue;

      if (trimmed.startsWith('__TEST_EVENT__')) {
        try {
          const jsonStr = trimmed.slice('__TEST_EVENT__'.length);
          const event = JSON.parse(jsonStr);
          handleTestEvent(event);
        } catch (e) {
          console.error('Parse event error:', e);
        }
      } else {
        currentRun.logs.push(trimmed);
        broadcast('log', { text: trimmed });
      }
    }
  });

  currentProcess.stderr.on('data', (data) => {
    const text = data.toString().trim();
    if (text) {
      currentRun.logs.push(text);
      broadcast('log', { text, isError: true });
    }
  });
  currentProcess.on('close', async (code) => {
    currentRun.running = false;
    currentProcess = null;
    broadcast('runFinished', {
      exitCode: code,
      passed: currentRun.passed,
      failed: currentRun.failed,
      skipped: currentRun.skipped,
      total: currentRun.total
    });

    // Auto generate Allure report
    await generateAllureReport();
  });

  return { success: true };
}

function handleTestEvent(event) {
  if (event.type === 'suiteStart') {
    if (!currentRun.isRerun) {
      currentRun.total = event.total;
    }
    broadcast('suiteStart', event);
  } else if (event.type === 'testBegin') {
    const existing = currentRun.tests.find(t => t.id === event.id);
    if (!existing) {
      currentRun.tests.push({ ...event, status: 'running' });
    } else {
      existing.status = 'running';
      existing.error = null;
    }
    broadcast('testBegin', event);
  } else if (event.type === 'testEnd') {
    const existing = currentRun.tests.find(t => t.id === event.id);
    const oldStatus = existing ? existing.status : null;
    if (existing) {
      existing.status = event.status;
      existing.duration = event.duration;
      existing.error = event.error;
    } else {
      currentRun.tests.push({ ...event });
    }

    // Nếu là rerun và cập nhật trạng thái của test cũ: giảm counter cũ
    if (oldStatus && oldStatus !== event.status) {
      if (oldStatus === 'passed') currentRun.passed = Math.max(0, currentRun.passed - 1);
      else if (oldStatus === 'failed' || oldStatus === 'timedOut') currentRun.failed = Math.max(0, currentRun.failed - 1);
      else if (oldStatus === 'skipped') currentRun.skipped = Math.max(0, currentRun.skipped - 1);
    }

    if (!oldStatus || oldStatus !== event.status) {
      if (event.status === 'passed') currentRun.passed++;
      else if (event.status === 'failed' || event.status === 'timedOut') currentRun.failed++;
      else if (event.status === 'skipped') currentRun.skipped++;
    }

    broadcast('testEnd', {
      ...event,
      passed: currentRun.passed,
      failed: currentRun.failed,
      skipped: currentRun.skipped,
      total: currentRun.total
    });
  } else if (event.type === 'suiteEnd') {
    broadcast('suiteEnd', event);
  }
}

// MIME types mapper
const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf'
};

function serveStaticFile(req, res, filePath) {
  if (!fs.existsSync(filePath)) {
    res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('404 Not Found');
    return;
  }

  let finalPath = filePath;
  const stat = fs.statSync(finalPath);
  if (stat.isDirectory()) {
    finalPath = path.join(finalPath, 'index.html');
    if (!fs.existsSync(finalPath)) {
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('404 Index Not Found');
      return;
    }
  }

  const ext = path.extname(finalPath).toLowerCase();
  const contentType = MIME_TYPES[ext] || 'application/octet-stream';

  res.writeHead(200, { 'Content-Type': contentType });
  fs.createReadStream(finalPath).pipe(res);
}

// Create HTTP Server
const server = http.createServer(async (req, res) => {
  const parsedUrl = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
  const pathname = parsedUrl.pathname;

  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  // Static route for Dashboard UI
  if (pathname === '/' || pathname === '/index.html') {
    return serveStaticFile(req, res, path.join(PUBLIC_DIR, 'index.html'));
  }

  // Static route for Allure Report
  if (pathname.startsWith('/allure-report')) {
    const rel = pathname.replace('/allure-report', '') || '/';
    const reportFilePath = path.join(ALLURE_REPORT_DIR, rel);
    return serveStaticFile(req, res, reportFilePath);
  }

  // Static route for Playwright HTML Report
  if (pathname.startsWith('/playwright-report')) {
    const rel = pathname.replace('/playwright-report', '') || '/';
    const reportFilePath = path.join(PLAYWRIGHT_REPORT_DIR, rel);
    return serveStaticFile(req, res, reportFilePath);
  }

  // API: Get Status & System info
  if (pathname === '/api/status' && req.method === 'GET') {
    await checkJava();
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      running: currentRun.running,
      javaInstalled: isJavaInstalled,
      platform: process.platform,
      port: PORT,
      allureExists: fs.existsSync(path.join(ALLURE_REPORT_DIR, 'index.html')),
      playwrightReportExists: fs.existsSync(path.join(PLAYWRIGHT_REPORT_DIR, 'index.html')),
      currentRun
    }));
    return;
  }

  // API: Get Test Suites & Spec files
  if (pathname === '/api/suites' && req.method === 'GET') {
    const files = getTestFiles();
    
    // Auto-detect subdirectories in src/tests as modules
    const testsRoot = path.join(ROOT_DIR, 'src', 'tests');
    const detectedFolders = fs.existsSync(testsRoot)
      ? fs.readdirSync(testsRoot).filter(f => fs.statSync(path.join(testsRoot, f)).isDirectory() && f !== 'auth')
      : [];

    const modules = [
      { id: 'all', name: 'Tất cả Thư mục (All Modules)' },
      ...detectedFolders.map(folder => ({
        id: folder,
        name: folder === 'downloader' ? 'Downloader' : folder === 'creator' ? 'Creator' : folder.charAt(0).toUpperCase() + folder.slice(1)
      }))
    ];

    const filesByModule = {};
    for (const mod of detectedFolders) {
      filesByModule[mod] = files.filter(f => f.startsWith(mod + '/'));
    }

    const projects = [
      { id: 'all', name: 'Tất cả Projects (Chromium & Firefox)' },
      { id: 'chromium-guest', name: 'Chromium - Guest (Không Cần Đăng Nhập)' },
      { id: 'chromium-free-user', name: 'Chromium - Free User (Miễn Phí)' },
      { id: 'chromium-downloader', name: 'Chromium - Downloader (Premium)' },
      { id: 'chromium-creator', name: 'Chromium - Creator Session' },
      { id: 'firefox-guest', name: 'Firefox - Guest (Không Cần Đăng Nhập)' },
      { id: 'firefox-free-user', name: 'Firefox - Free User (Miễn Phí)' },
      { id: 'firefox-downloader', name: 'Firefox - Downloader (Premium)' },
      { id: 'firefox-creator', name: 'Firefox - Creator Session' }
    ];

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ files, modules, filesByModule, projects }));
    return;
  }

  // API: Server-Sent Events (SSE) stream
  if (pathname === '/api/events' && req.method === 'GET') {
    res.writeHead(200, {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive'
    });

    sseClients.add(res);
    res.write(`event: init\ndata: ${JSON.stringify({ currentRun, isJavaInstalled })}\n\n`);

    req.on('close', () => {
      sseClients.delete(res);
    });
    return;
  }

  // API: Run Tests
  if (pathname === '/api/run' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', () => {
      try {
        const options = JSON.parse(body || '{}');
        const result = startTestRun(options);
        if (result.error) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify(result));
        } else {
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ success: true, message: 'Test execution started' }));
        }
      } catch (err) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: err.message }));
      }
    });
    return;
  }

  // API: Stop Tests
  if (pathname === '/api/stop' && req.method === 'POST') {
    stopCurrentRun();
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ success: true, message: 'Dừng test thành công' }));
    return;
  }

  // API: Manual Clean Reports
  if (pathname === '/api/clean-reports' && req.method === 'POST') {
    const cleaned = cleanOldReports();
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ success: true, cleaned, message: `Đã dọn dẹp ${cleaned} tệp kết quả cũ.` }));
    return;
  }

  // 404 for unknown routes
  res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
  res.end('Route Not Found');
});

// Start listening
server.listen(PORT, async () => {
  await checkJava();
  const url = `http://localhost:${PORT}`;
  console.log(`\n======================================================`);
  console.log(`   🚀 PHOTO-AC TEST PORTAL ĐANG CHẠY TẠI:`);
  console.log(`   👉 ${url}`);
  console.log(`   Hệ điều hành: ${process.platform.toUpperCase()}`);
  console.log(`   Java Runtime: ${isJavaInstalled ? '✅ Đã cài đặt' : '⚠️ CHƯA CÓ (Cần cho Allure)'}`);
  console.log(`======================================================\n`);

  // Auto open browser if not in CI or quiet mode
  if (!process.env.NO_OPEN && !process.env.CI) {
    openBrowser(url);
  }
});
