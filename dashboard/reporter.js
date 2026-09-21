/**
 * Custom Playwright Reporter for Local Test Portal
 * Emits structured events to stdout prefixed with __TEST_EVENT__
 * so the dashboard server can stream real-time test progress via SSE.
 */

function stripAnsi(str) {
  if (!str) return str;
  return str.replace(/[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]/g, '');
}

class DashboardReporter {
  onBegin(config, suite) {
    const allTests = suite.allTests();
    const cleanTests = allTests.map(t => ({
      id: t.id,
      title: t.title,
      project: t.parent?.project()?.name || '',
      file: t.location.file.replace(/\\/g, '/').split('src/tests/')[1] || t.location.file
    }));

    console.log('__TEST_EVENT__' + JSON.stringify({
      type: 'suiteStart',
      total: allTests.length,
      tests: cleanTests
    }));
  }

  onTestBegin(test) {
    const relativeFile = test.location.file.replace(/\\/g, '/').split('src/tests/')[1] || test.location.file;
    console.log('__TEST_EVENT__' + JSON.stringify({
      type: 'testBegin',
      id: test.id,
      title: test.title,
      project: test.parent?.project()?.name || '',
      file: relativeFile
    }));
  }

  onTestEnd(test, result) {
    const relativeFile = test.location.file.replace(/\\/g, '/').split('src/tests/')[1] || test.location.file;
    const rawError = result.error ? (result.error.message || String(result.error)) : null;
    console.log('__TEST_EVENT__' + JSON.stringify({
      type: 'testEnd',
      id: test.id,
      title: test.title,
      project: test.parent?.project()?.name || '',
      file: relativeFile,
      status: result.status, // 'passed' | 'failed' | 'timedOut' | 'skipped'
      duration: result.duration,
      error: rawError ? stripAnsi(rawError) : null
    }));
  }

  onEnd(result) {
    console.log('__TEST_EVENT__' + JSON.stringify({
      type: 'suiteEnd',
      status: result.status,
      duration: result.duration
    }));
  }
}

module.exports = DashboardReporter;
