const { describe, beforeEach } = require('mocha');
const { given } = require('mocha-testdata');
const assert = require('assert');
const SUT = require('../../src/js/app/content.tab');
const pageInfoFactory = require('../../src/js/app/content.pageInfo');
const testUtil = require('../../test_lib/util');

describe('app.message.content.tab', () => {
  /**
   * @type {jQuery}
   */
  let $;

  /**
   * @type {PageInfo}
   */
  let pageInfo;

  testUtil.uiBase.registerHooks();
  beforeEach(() => {
    const dom = testUtil.uiBase.initDom2(testUtil.getHtml('test_resource/html/content.02.html'));
    $ = require('jquery')(dom.window);
    pageInfo = pageInfoFactory.init(dom.window.location, $).get();
  });

  given([
    {displayPosition: 'top', marginTop: '10px', marginBottom: '20px'},
    {displayPosition: 'bottom', marginTop: '10px', marginBottom: '20px'},
  ]).it('pattern matched and status is 0', (arg) => {
    SUT.listen($, pageInfo);

    testUtil.chrome.contentTabNotifyStatusDispatch(arg.displayPosition, 0);

    assert.strictEqual(testUtil.content.page($).marginTop(), arg.marginTop);
    assert.strictEqual(testUtil.content.page($).marginBottom(), arg.marginBottom);
    assert.strictEqual(testUtil.content.message($).hidden(), true);
  });

  given([
    {displayPosition: 'top', marginTop: '50px', marginBottom: '20px'},
    {displayPosition: 'bottom', marginTop: '10px', marginBottom: '50px'},
  ]).it('pattern matched and status is 1', (arg) => {
    SUT.listen($, pageInfo);

    testUtil.chrome.contentTabNotifyStatusDispatch(arg.displayPosition, 1);

    assert.strictEqual(testUtil.content.page($).marginTop(), arg.marginTop);
    assert.strictEqual(testUtil.content.page($).marginBottom(), arg.marginBottom);
    assert.strictEqual(testUtil.content.message($).shown(), true);
  });
});
