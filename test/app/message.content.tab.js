const { describe, beforeEach } = require('mocha');
const { given } = require('mocha-testdata');
const assert = require('assert');
const SUT = require('../../src/js/app/content.tab');
const pageInfoFactory = require('../../src/js/app/content.pageInfo');
const testUtil = require('../../test_lib/util');

describe('app.message.content.tab', () => {
  testUtil.uiBase.registerHooks();
  beforeEach(() => {
    testUtil.uiBase.initDom(testUtil.getHtml('test_resource/html/content.02.html'));
  });

  given([
    {displayPosition: 'top', marginTop: '10px', marginBottom: '20px'},
    {displayPosition: 'bottom', marginTop: '10px', marginBottom: '20px'},
  ]).it('pattern matched and status is 0', (arg) => {
    SUT.listen(pageInfoFactory.init().get());

    testUtil.chrome.contentTabNotifyStatusDispatch(arg.displayPosition, 0);

    assert.strictEqual(testUtil.content.page().marginTop(), arg.marginTop);
    assert.strictEqual(testUtil.content.page().marginBottom(), arg.marginBottom);
    assert.strictEqual(testUtil.content.message().hidden(), true);
  });

  given([
    {displayPosition: 'top', marginTop: '50px', marginBottom: '20px'},
    {displayPosition: 'bottom', marginTop: '10px', marginBottom: '50px'},
  ]).it('pattern matched and status is 1', (arg) => {
    SUT.listen(pageInfoFactory.init().get());

    testUtil.chrome.contentTabNotifyStatusDispatch(arg.displayPosition, 1);

    assert.strictEqual(testUtil.content.page().marginTop(), arg.marginTop);
    assert.strictEqual(testUtil.content.page().marginBottom(), arg.marginBottom);
    assert.strictEqual(testUtil.content.message().shown(), true);
  });
});
