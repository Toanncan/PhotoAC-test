const http = require('http');
const fs = require('fs');
const path = require('path');
const { spawn, exec } = require('child_process');

const ROOT_DIR = path.resolve(__dirname, '..');

// Load root .env if available
try {
  require('dotenv').config({ path: path.join(ROOT_DIR, '.env') });
} catch (e) {}

const PORT = process.env.PORT || 4000;
const PUBLIC_DIR = path.join(__dirname, 'public');
const ALLURE_REPORT_DIR = path.join(ROOT_DIR, 'allure-report');
const PLAYWRIGHT_REPORT_DIR = path.join(ROOT_DIR, 'playwright-report');
const ALLURE_RESULTS_DIR = path.join(ROOT_DIR, 'allure-results');
const TEST_RESULTS_DIR = path.join(ROOT_DIR, 'test-results');

// Registry of supported child projects under root workspace
const PROJECTS = {
  'photo-ac': {
    id: 'photo-ac',
    name: 'Photo-AC',
    dir: path.join(ROOT_DIR, 'photo-ac'),
    testsDir: path.join(ROOT_DIR, 'photo-ac', 'src', 'tests'),
    allureResultsDir: path.join(ROOT_DIR, 'photo-ac', 'allure-results'),
    allureReportDir: path.join(ROOT_DIR, 'photo-ac', 'allure-report'),
    playwrightReportDir: path.join(ROOT_DIR, 'photo-ac', 'playwright-report'),
    testResultsDir: path.join(ROOT_DIR, 'photo-ac', 'test-results')
  },
  'illust-ac': {
    id: 'illust-ac',
    name: 'AC-Illust',
    dir: path.join(ROOT_DIR, 'illust-ac'),
    testsDir: path.join(ROOT_DIR, 'illust-ac', 'src', 'tests'),
    allureResultsDir: path.join(ROOT_DIR, 'illust-ac', 'allure-results'),
    allureReportDir: path.join(ROOT_DIR, 'illust-ac', 'allure-report'),
    playwrightReportDir: path.join(ROOT_DIR, 'illust-ac', 'playwright-report'),
    testResultsDir: path.join(ROOT_DIR, 'illust-ac', 'test-results')
  }
};

let activeProjectId = 'photo-ac';

function getActiveProject(id) {
  const targetId = id || activeProjectId;
  return PROJECTS[targetId] || PROJECTS['photo-ac'];
}

// Read environment key-value pairs for a project (.env in project or root)
function getProjectEnv(siteId) {
  const proj = getActiveProject(siteId);
  const envPath = fs.existsSync(path.join(proj.dir, '.env'))
    ? path.join(proj.dir, '.env')
    : path.join(ROOT_DIR, '.env');
  const parsed = {};
  if (fs.existsSync(envPath)) {
    try {
      const content = fs.readFileSync(envPath, 'utf8');
      const lines = content.split('\n');
      for (const line of lines) {
        const trimmed = line.trim();
        if (!trimmed || trimmed.startsWith('#')) continue;
        const match = trimmed.match(/^([^=]+)=(.*)$/);
        if (match) {
          const key = match[1].trim();
          let val = match[2].trim();
          if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
            val = val.slice(1, -1);
          }
          parsed[key] = val;
        }
      }
    } catch (e) {}
  }
  return parsed;
}

let currentProcess = null;

// Clean old test artifacts to prevent ghost tests and result pollution
function cleanOldReports(projectId = activeProjectId) {
  const proj = getActiveProject(projectId);
  let cleanedCount = 0;
  try {
    // 1. Dọn dẹp allure-results (giữ lại history nếu có để duy trì xu hướng)
    if (fs.existsSync(proj.allureResultsDir)) {
      const files = fs.readdirSync(proj.allureResultsDir);
      for (const file of files) {
        if (file === 'history') continue;
        const fullPath = path.join(proj.allureResultsDir, file);
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
    if (fs.existsSync(proj.testResultsDir)) {
      const files = fs.readdirSync(proj.testResultsDir);
      for (const file of files) {
        const fullPath = path.join(proj.testResultsDir, file);
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

// Find all test spec files for a specific project
function getTestFiles(projectId = activeProjectId) {
  const proj = getActiveProject(projectId);
  const dir = proj.testsDir;
  let results = [];
  if (!fs.existsSync(dir)) return results;

  function walk(d) {
    const list = fs.readdirSync(d);
    for (const file of list) {
      const fullPath = path.join(d, file);
      const stat = fs.statSync(fullPath);
      if (stat && stat.isDirectory()) {
        walk(fullPath);
      } else if (file.endsWith('.spec.ts')) {
        const relPath = path.relative(dir, fullPath).replace(/\\/g, '/');
        results.push(relPath);
      }
    }
  }

  walk(dir);
  return results;
}

// Generate Allure Report
function generateAllureReport(projectId = activeProjectId) {
  const proj = getActiveProject(projectId);
  return new Promise((resolve) => {
    broadcast('status', { message: `Đang tạo báo cáo Allure cho ${proj.name}...` });

    const resultsDir = proj.allureResultsDir;
    const reportDir = proj.allureReportDir;

    let allureCmd = `npx allure generate "${resultsDir}" --clean -o "${reportDir}"`;
    const localAllureWin = path.join(ROOT_DIR, 'node_modules', '.bin', 'allure.cmd');
    const localAllureUnix = path.join(ROOT_DIR, 'node_modules', '.bin', 'allure');

    if (process.platform === 'win32' && fs.existsSync(localAllureWin)) {
      allureCmd = `"${localAllureWin}" generate "${resultsDir}" --clean -o "${reportDir}"`;
    } else if (process.platform !== 'win32' && fs.existsSync(localAllureUnix)) {
      allureCmd = `"${localAllureUnix}" generate "${resultsDir}" --clean -o "${reportDir}"`;
    }

    exec(allureCmd, { cwd: proj.dir }, (err, stdout, stderr) => {
      if (err) {
        console.error('Lỗi khi chạy Allure:', stderr || err.message);
        exec(`npx allure-commandline generate "${resultsDir}" --clean -o "${reportDir}"`, { cwd: proj.dir }, (fallbackErr) => {
          if (fallbackErr) {
            broadcast('allureError', { message: 'Không thể tạo Allure Report. Vui lòng kiểm tra môi trường Java!' });
            resolve(false);
          } else {
            broadcast('allureReady', { url: `/allure-report/index.html?project=${proj.id}` });
            resolve(true);
          }
        });
      } else {
        broadcast('allureReady', { url: `/allure-report/index.html?project=${proj.id}` });
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

  const {
    project,
    projects,
    file,
    files,
    headed,
    grep,
    workers,
    cleanReport,
    retries,
    isRerun,
    projectSite,
    customUrl,
    httpAuth,
    customAccounts,
    forceRefreshAuth
  } = options;

  const siteId = projectSite || activeProjectId || 'photo-ac';
  activeProjectId = siteId;
  const proj = getActiveProject(siteId);

  // Pre-run Cleanup: Chỉ xóa kết quả cũ khi cleanReport !== false và không phải chế độ rerun
  if (cleanReport !== false && !isRerun) {
    const cleaned = cleanOldReports(siteId);
    console.log(`[CLEANUP] Đã tự động dọn dẹp ${cleaned} tệp kết quả kiểm thử cũ của ${proj.name}.`);

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

    currentRun.logs.push(`🧹 Đã tự động làm sạch dữ liệu kiểm thử cũ (${proj.name}).`);
  } else {
    console.log('[RERUN] Chạy lại test case lỗi - bảo lưu toàn bộ kết quả kiểm thử trước đó.');
    currentRun.running = true;
    currentRun.isRerun = true;
    currentRun.logs.push('🔁 Đang chạy lại các bài kiểm thử bị lỗi (bảo lưu kết quả các bài test đã Passed)...');
  }

  // Session Invalidation: Xóa session .auth/*.json khi có custom URL, custom accounts hoặc forceRefreshAuth
  const hasCustomAccounts = customAccounts && (
    (customAccounts.freeUser?.email && customAccounts.freeUser.email.trim()) ||
    (customAccounts.freeUser?.password && customAccounts.freeUser.password.trim()) ||
    (customAccounts.premiumUser?.email && customAccounts.premiumUser.email.trim()) ||
    (customAccounts.premiumUser?.password && customAccounts.premiumUser.password.trim()) ||
    (customAccounts.creatorUser?.email && customAccounts.creatorUser.email.trim()) ||
    (customAccounts.creatorUser?.password && customAccounts.creatorUser.password.trim())
  );
  const hasCustomUrl = Boolean(customUrl && customUrl.trim());

  if (hasCustomUrl || hasCustomAccounts || forceRefreshAuth) {
    const authDirs = [
      path.join(proj.dir, '.auth'),
      path.join(ROOT_DIR, '.auth')
    ];
    let cleanedAuthCount = 0;
    for (const ad of authDirs) {
      if (fs.existsSync(ad)) {
        try {
          const files = fs.readdirSync(ad);
          for (const f of files) {
            if (f.endsWith('.json')) {
              fs.unlinkSync(path.join(ad, f));
              cleanedAuthCount++;
            }
          }
        } catch (e) {
          console.error('[AUTH] Lỗi khi dọn dẹp .auth session:', e);
        }
      }
    }
    if (cleanedAuthCount > 0) {
      currentRun.logs.push(`🔑 Đã tự động làm mới ${cleanedAuthCount} phiên (.auth) để áp dụng thông tin môi trường/tài khoản mới.`);
    }
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

  // Calculate reporter path relative to project dir
  const relReporter = path.relative(proj.dir, path.join(ROOT_DIR, 'dashboard', 'reporter.js')).replace(/\\/g, '/');
  args.push(`--reporter=${relReporter},allure-playwright,html`);

  const cmd = process.platform === 'win32' ? 'npx.cmd' : 'npx';

  // Sanitize options to avoid exposing sensitive passwords via SSE
  const sanitizedOptions = {
    ...options,
    httpAuth: httpAuth ? { ...httpAuth, password: httpAuth.password ? '********' : undefined } : undefined,
    customAccounts: customAccounts ? {
      freeUser: customAccounts.freeUser ? { ...customAccounts.freeUser, password: customAccounts.freeUser.password ? '********' : undefined } : undefined,
      premiumUser: customAccounts.premiumUser ? { ...customAccounts.premiumUser, password: customAccounts.premiumUser.password ? '********' : undefined } : undefined,
      creatorUser: customAccounts.creatorUser ? { ...customAccounts.creatorUser, password: customAccounts.creatorUser.password ? '********' : undefined } : undefined,
    } : undefined
  };
  broadcast('runStarted', { options: sanitizedOptions, project: proj.id, command: `npx ${args.join(' ')}` });

  // Prepare environment variables with dynamic overrides
  const env = {
    ...process.env,
    HEADLESS: headed ? 'false' : 'true'
  };

  // Base URL override (supports http://, https://, or bare domain)
  if (hasCustomUrl) {
    let cleanUrl = customUrl.trim();
    if (!/^https?:\/\//i.test(cleanUrl)) {
      cleanUrl = /^(localhost|127\.0\.0\.1|192\.168\.|10\.)/i.test(cleanUrl)
        ? `http://${cleanUrl}`
        : `https://${cleanUrl}`;
    }
    env.BASE_URL = cleanUrl;
    currentRun.logs.push(`Base URL: ${cleanUrl}`);
  }

  // HTTP Basic Auth override
  if (httpAuth) {
    if (httpAuth.enabled !== false) {
      if (httpAuth.username && httpAuth.username.trim()) {
        env.HTTP_USER = httpAuth.username.trim();
      }
      if (httpAuth.password && httpAuth.password.trim()) {
        env.HTTP_PASS = httpAuth.password.trim();
      }
    } else {
      delete env.HTTP_USER;
      delete env.HTTP_PASS;
    }
  }

  // Custom Accounts override
  if (customAccounts) {
    if (customAccounts.freeUser?.email && customAccounts.freeUser.email.trim()) {
      env.FREE_USER_EMAIL = customAccounts.freeUser.email.trim();
    }
    if (customAccounts.freeUser?.password && customAccounts.freeUser.password.trim()) {
      env.FREE_USER_PASSWORD = customAccounts.freeUser.password.trim();
    }

    if (customAccounts.premiumUser?.email && customAccounts.premiumUser.email.trim()) {
      env.PREMIUM_USER_EMAIL = customAccounts.premiumUser.email.trim();
      env.TEST_USER_EMAIL = customAccounts.premiumUser.email.trim();
    }
    if (customAccounts.premiumUser?.password && customAccounts.premiumUser.password.trim()) {
      env.PREMIUM_USER_PASSWORD = customAccounts.premiumUser.password.trim();
      env.TEST_USER_PASSWORD = customAccounts.premiumUser.password.trim();
    }

    if (customAccounts.creatorUser?.email && customAccounts.creatorUser.email.trim()) {
      env.CREATOR_EMAIL = customAccounts.creatorUser.email.trim();
    }
    if (customAccounts.creatorUser?.password && customAccounts.creatorUser.password.trim()) {
      env.CREATOR_PASSWORD = customAccounts.creatorUser.password.trim();
    }
  }

  // Passwords to mask in output logs
  const passwordsToMask = [];
  if (httpAuth?.password) passwordsToMask.push(httpAuth.password);
  if (customAccounts?.freeUser?.password) passwordsToMask.push(customAccounts.freeUser.password);
  if (customAccounts?.premiumUser?.password) passwordsToMask.push(customAccounts.premiumUser.password);
  if (customAccounts?.creatorUser?.password) passwordsToMask.push(customAccounts.creatorUser.password);
  if (env.HTTP_PASS) passwordsToMask.push(env.HTTP_PASS);
  if (env.FREE_USER_PASSWORD) passwordsToMask.push(env.FREE_USER_PASSWORD);
  if (env.PREMIUM_USER_PASSWORD) passwordsToMask.push(env.PREMIUM_USER_PASSWORD);
  if (env.CREATOR_PASSWORD) passwordsToMask.push(env.CREATOR_PASSWORD);

  function maskLog(text) {
    if (!text) return text;
    let res = text;
    for (const pwd of passwordsToMask) {
      if (pwd && pwd.length >= 3 && res.includes(pwd)) {
        res = res.split(pwd).join('********');
      }
    }
    return res;
  }

  currentProcess = spawn(cmd, args, {
    cwd: proj.dir,
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
        const masked = maskLog(trimmed);
        currentRun.logs.push(masked);
        broadcast('log', { text: masked });
      }
    }
  });

  currentProcess.stderr.on('data', (data) => {
    const text = data.toString().trim();
    if (text) {
      const masked = maskLog(text);
      currentRun.logs.push(masked);
      broadcast('log', { text: masked, isError: true });
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

    // Auto generate Allure report for the active project
    await generateAllureReport(siteId);
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
    const projectParam = parsedUrl.searchParams.get('project') || activeProjectId;
    const proj = getActiveProject(projectParam);
    const rel = pathname.replace('/allure-report', '') || '/';
    let reportFilePath = path.join(proj.allureReportDir, rel);
    if (!fs.existsSync(reportFilePath)) {
      reportFilePath = path.join(ALLURE_REPORT_DIR, rel);
    }
    return serveStaticFile(req, res, reportFilePath);
  }

  // Static route for Playwright HTML Report
  if (pathname.startsWith('/playwright-report')) {
    const projectParam = parsedUrl.searchParams.get('project') || activeProjectId;
    const proj = getActiveProject(projectParam);
    const rel = pathname.replace('/playwright-report', '') || '/';
    let reportFilePath = path.join(proj.playwrightReportDir, rel);
    if (!fs.existsSync(reportFilePath)) {
      reportFilePath = path.join(PLAYWRIGHT_REPORT_DIR, rel);
    }
    return serveStaticFile(req, res, reportFilePath);
  }

  // API: Get Status & System info
  if (pathname === '/api/status' && req.method === 'GET') {
    await checkJava();
    const proj = getActiveProject(activeProjectId);
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      running: currentRun.running,
      javaInstalled: isJavaInstalled,
      platform: process.platform,
      port: PORT,
      activeProject: activeProjectId,
      allureExists: fs.existsSync(path.join(proj.allureReportDir, 'index.html')) || fs.existsSync(path.join(ALLURE_REPORT_DIR, 'index.html')),
      playwrightReportExists: fs.existsSync(path.join(proj.playwrightReportDir, 'index.html')) || fs.existsSync(path.join(PLAYWRIGHT_REPORT_DIR, 'index.html')),
      currentRun
    }));
    return;
  }

  // API: Get List of Projects
  if (pathname === '/api/projects' && req.method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      active: activeProjectId,
      projects: Object.values(PROJECTS).map(p => ({
        id: p.id,
        name: p.name
      }))
    }));
    return;
  }

  // API: Get Project Environment Defaults (for Test Portal modal placeholders)
  if (pathname === '/api/env-info' && req.method === 'GET') {
    const projectParam = parsedUrl.searchParams.get('projectSite') || parsedUrl.searchParams.get('project') || activeProjectId;
    const projEnv = getProjectEnv(projectParam);
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      project: projectParam,
      baseUrl: projEnv.BASE_URL || process.env.BASE_URL || '',
      httpUser: projEnv.HTTP_USER || process.env.HTTP_USER || '',
      freeUserEmail: projEnv.FREE_USER_EMAIL || process.env.FREE_USER_EMAIL || '',
      premiumUserEmail: projEnv.PREMIUM_USER_EMAIL || process.env.PREMIUM_USER_EMAIL || '',
      creatorEmail: projEnv.CREATOR_EMAIL || process.env.CREATOR_EMAIL || ''
    }));
    return;
  }

  // API: Get Test Suites & Spec files
  if (pathname === '/api/suites' && req.method === 'GET') {
    const projectParam = parsedUrl.searchParams.get('projectSite') || parsedUrl.searchParams.get('project') || activeProjectId;
    const proj = getActiveProject(projectParam);
    const files = getTestFiles(proj.id);

    const testsRoot = proj.testsDir;
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
    res.end(JSON.stringify({ project: proj.id, files, modules, filesByModule, projects }));
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
    res.write(`event: init\ndata: ${JSON.stringify({ currentRun, isJavaInstalled, activeProject: activeProjectId })}\n\n`);

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
    const cleaned = cleanOldReports(activeProjectId);
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
  console.log(`   TEST PORTAL ĐANG CHẠY TẠI:`);
  console.log(`   👉 ${url}`);
  console.log(`   Hệ điều hành: ${process.platform.toUpperCase()}`);
  console.log(`   Java Runtime: ${isJavaInstalled ? '✅ Đã cài đặt' : '⚠️ CHƯA CÓ (Cần cho Allure)'}`);
  console.log(`======================================================\n`);

  // Auto open browser if not in CI or quiet mode
  if (!process.env.NO_OPEN && !process.env.CI) {
    openBrowser(url);
  }
});
