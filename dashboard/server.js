const http = require('http');
const fs = require('fs');
const path = require('path');
const { spawn, exec } = require('child_process');

const PORT = process.env.PORT || 4000;
const ROOT_DIR = path.resolve(__dirname, '..');
const PUBLIC_DIR = path.join(__dirname, 'public');
const ALLURE_REPORT_DIR = path.join(ROOT_DIR, 'allure-report');
const PLAYWRIGHT_REPORT_DIR = path.join(ROOT_DIR, 'playwright-report');

let currentProcess = null;
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

  const { project, file, headed, grep, workers } = options;
  currentRun = {
    running: true,
    total: 0,
    passed: 0,
    failed: 0,
    skipped: 0,
    tests: [],
    logs: []
  };

  const args = ['playwright', 'test'];

  if (file && file.trim()) {
    args.push(path.join('src', 'tests', file).replace(/\\/g, '/'));
  }

  if (project && project !== 'all') {
    args.push(`--project=${project}`);
  }

  if (headed) {
    args.push('--headed');
  }

  if (grep && grep.trim()) {
    args.push(`--grep=${grep.trim()}`);
  }

  if (workers && Number(workers) > 0) {
    args.push(`--workers=${workers}`);
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
    currentRun.total = event.total;
    broadcast('suiteStart', event);
  } else if (event.type === 'testBegin') {
    const existing = currentRun.tests.find(t => t.id === event.id);
    if (!existing) {
      currentRun.tests.push({ ...event, status: 'running' });
    } else {
      existing.status = 'running';
    }
    broadcast('testBegin', event);
  } else if (event.type === 'testEnd') {
    const existing = currentRun.tests.find(t => t.id === event.id);
    if (existing) {
      existing.status = event.status;
      existing.duration = event.duration;
      existing.error = event.error;
    }

    if (event.status === 'passed') currentRun.passed++;
    else if (event.status === 'failed' || event.status === 'timedOut') currentRun.failed++;
    else if (event.status === 'skipped') currentRun.skipped++;

    broadcast('testEnd', {
      ...event,
      passed: currentRun.passed,
      failed: currentRun.failed,
      skipped: currentRun.skipped
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
      { id: 'all', name: '⚡ Tất cả Thư mục (All Modules)' },
      ...detectedFolders.map(folder => ({
        id: folder,
        name: folder === 'downloader' ? '📥 Downloader Module' : folder === 'creator' ? '🎨 Creator Module' : `📁 ${folder}`
      }))
    ];

    const filesByModule = {};
    for (const mod of detectedFolders) {
      filesByModule[mod] = files.filter(f => f.startsWith(mod + '/'));
    }

    const projects = [
      { id: 'all', name: 'Tất cả Projects (Chromium & Firefox)' },
      { id: 'chromium-downloader', name: 'Chromium - Downloader Session' },
      { id: 'chromium-creator', name: 'Chromium - Creator Session' },
      { id: 'firefox-downloader', name: 'Firefox - Downloader Session' },
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
