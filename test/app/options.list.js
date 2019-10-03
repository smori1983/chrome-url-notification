const { describe, before, beforeEach, afterEach, after, it } = require('mocha');
const assert = require('assert');
const storage = require('../../src/js/urlNotification/storage');
const SUT = require('../../src/js/app/options.list');
const testUtil = require('../../test_lib/util');

describe('options.list', function () {
  before(testUtil.uiBase.before);
  beforeEach(testUtil.uiBase.beforeEach);
  beforeEach(function () {
    testUtil.uiBase.initDom(testUtil.getHtml('src/html/options.html'));
  });
  afterEach(testUtil.uiBase.afterEach);
  after(testUtil.uiBase.after);

  it('tr element - without pattern data', function () {
    SUT.show();

    const list = testUtil.options.list();

    assert.strictEqual(list.header().length, 0);
    assert.strictEqual(list.numOfItems(), 0);
  });

  it('tr element - with pattern data', function () {
    testUtil.setUpStorage('3', [
      {
        url: 'http://example.com/1',
        msg: 'message1',
        backgroundColor: '111111',
        displayPosition: 'top',
        status: 1,
      },
    ]);

    SUT.show();

    const list = testUtil.options.list();

    assert.strictEqual(list.header().length, 1);
    assert.strictEqual(list.numOfItems(), 1);
  });

  it('header columns', function () {
    testUtil.setUpStorage('3', [
      {
        url: 'http://example.com/1',
        msg: 'message1',
        backgroundColor: '111111',
        displayPosition: 'top',
        status: 1,
      },
    ]);

    SUT.show();

    const $ = require('jquery');
    const $columns = testUtil.options.list().header().find('th');

    assert.strictEqual($columns.length, 5);
    assert.strictEqual($($columns[0]).text(), 'URL pattern');
    assert.strictEqual($($columns[1]).text(), 'Message');
    assert.strictEqual($($columns[2]).text(), 'Display position');
    assert.strictEqual($($columns[3]).text(), 'Enabled');
    assert.strictEqual($($columns[4]).text(), 'Operation');
  });

  it('list area', function () {
    testUtil.setUpStorage('3', [
      {
        url: 'http://example.com/1',
        msg: 'message1',
        backgroundColor: '111111',
        displayPosition: 'top',
        status: 1,
      },
    ]);

    SUT.show();

    assert.strictEqual(testUtil.options.list().numOfItems(), 1);

    const item = testUtil.options.list().item(0);
    assert.strictEqual(item.pattern(), 'http://example.com/1');
    assert.strictEqual(item.message(), 'message1');
    assert.strictEqual(item.displayPosition(), 'Top');
    assert.strictEqual(item.status(), 'Y');
  });

  it('copy button', function () {
    testUtil.setUpStorage('3', [
      {
        url: 'http://example.com/1',
        msg: 'message1',
        backgroundColor: '111111',
        displayPosition: 'top',
        status: 1,
      },
      {
        url: 'http://example.com/2',
        msg: 'message2',
        backgroundColor: '111111',
        displayPosition: 'bottom',
        status: 0,
      },
    ]);

    SUT.show();

    const list = testUtil.options.list();
    const form = testUtil.options.patternForm();

    list.item(0).clickCopy();

    assert.ok(form.shown());
    assert.strictEqual(form.pattern(), 'http://example.com/1');

    list.item(1).clickCopy();

    assert.ok(form.shown());
    assert.strictEqual(form.pattern(), 'http://example.com/2');
  });

  it('edit button', function () {
    testUtil.setUpStorage('3', [
      {
        url: 'http://example.com/1',
        msg: 'message1',
        backgroundColor: '111111',
        displayPosition: 'top',
        status: 1,
      },
      {
        url: 'http://example.com/2',
        msg: 'message2',
        backgroundColor: '111111',
        displayPosition: 'bottom',
        status: 0,
      },
    ]);

    SUT.show();

    const list = testUtil.options.list();
    const form = testUtil.options.patternForm();

    list.item(0).clickEdit();

    assert.ok(form.shown());
    assert.strictEqual(form.pattern(), 'http://example.com/1');

    list.item(1).clickEdit();

    assert.ok(form.shown());
    assert.strictEqual(form.pattern(), 'http://example.com/2');
  });

  describe('delete operation', function () {
    beforeEach(function () {
      testUtil.setUpStorage('3', [
        {
          url: 'http://example.com/1',
          msg: 'message1',
          backgroundColor: '111111',
          displayPosition: 'top',
          status: 1,
        },
        {
          url: 'http://example.com/2',
          msg: 'message2',
          backgroundColor: '111111',
          displayPosition: 'bottom',
          status: 0,
        },
      ]);
    });

    it('open modal twice', function () {
      SUT.show();

      const list = testUtil.options.list();
      const form = testUtil.options.deleteForm();

      list.item(0).clickDelete();

      assert.ok(form.shown());
      assert.strictEqual(form.pattern(), 'http://example.com/1');
      assert.strictEqual(form.message(), 'message1');

      list.item(1).clickDelete();

      assert.ok(form.shown());
      assert.strictEqual(form.pattern(), 'http://example.com/2');
      assert.strictEqual(form.message(), 'message2');
    });

    it('execute', function () {
      SUT.show();

      testUtil.options.list().item(0).clickDelete();
      testUtil.options.deleteForm().submit();

      assert.strictEqual(storage.getCount(), 1);
      assert.deepStrictEqual(storage.getAll(), [
        {
          url: 'http://example.com/2',
          msg: 'message2',
          backgroundColor: '111111',
          displayPosition: 'bottom',
          status: 0,
        },
      ]);
    });

    it('cancel', function () {
      SUT.show();

      testUtil.options.list().item(0).clickDelete();
      testUtil.options.deleteForm().cancel();

      assert.strictEqual(storage.getCount(), 2);
    });
  });
});
