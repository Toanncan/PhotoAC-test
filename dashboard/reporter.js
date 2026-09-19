/**
 * Custom Playwright Reporter for Local Test Portal
 * Emits structured events to stdout prefixed with __TEST_EVENT__
 * so the dashboard server can stream real-time test progress via SSE.
 */

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
    console.log('__TEST_EVENT__' + JSON.stringify({
      type: 'testEnd',
      id: test.id,
      title: test.title,
      status: result.status, // 'passed' | 'failed' | 'timedOut' | 'skipped'
      duration: result.duration,
      error: result.error ? (result.error.message || String(result.error)) : null
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
