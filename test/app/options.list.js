const { describe, before, beforeEach, afterEach, after, it } = require('mocha');
const { given } = require('mocha-testdata');
const assert = require('assert');
const storage = require('../../src/js/urlNotification/storage');
const SUT = require('../../src/js/app/options.list');
const testUtil = require('../../test_lib/util');

describe('app.options.list', () => {
  before(testUtil.uiBase.initI18n('en'));
  before(testUtil.uiBase.before);
  beforeEach(testUtil.uiBase.beforeEach);
  beforeEach(() => {
    testUtil.uiBase.initDom(testUtil.getHtml('src/html/options.html'));
  });
  afterEach(testUtil.uiBase.afterEach);
  after(testUtil.uiBase.after);

  describe('badge number', () => {
    it('without data', () => {
      SUT.show();

      assert.strictEqual(testUtil.options.list().badge(), '0');
    });

    it('with 1 pattern', () => {
      testUtil.initStorage(testUtil.currentVersion().toString(), [
        testUtil.makePatternItem({}),
      ]);
      SUT.show();

      assert.strictEqual(testUtil.options.list().badge(), '1');
    });

    it('with 3 patterns', () => {
      testUtil.initStorage(testUtil.currentVersion().toString(), [
        testUtil.makePatternItem({url: 'site1.example.com'}),
        testUtil.makePatternItem({url: 'site2.example.com'}),
        testUtil.makePatternItem({url: 'site3.example.com'}),
      ]);
      SUT.show();

      assert.strictEqual(testUtil.options.list().badge(), '3');
    });
  });

  describe('table tr element', () => {
    it('without pattern data', () => {
      SUT.show();

      const list = testUtil.options.list();

      assert.strictEqual(list.header().length, 0);
      assert.strictEqual(list.numOfItems(), 0);
    });

    it('with pattern data', () => {
      testUtil.initStorage(testUtil.currentVersion().toString(), [
        testUtil.makePatternItem({}),
      ]);
      SUT.show();

      const list = testUtil.options.list();

      assert.strictEqual(list.header().length, 1);
      assert.strictEqual(list.numOfItems(), 1);
    });
  });

  describe('header area', () => {
    it('labels', () => {
      testUtil.initStorage(testUtil.currentVersion().toString(), [
        testUtil.makePatternItem({}),
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
  });

  describe('list area', () => {
    beforeEach(() => {
      testUtil.initStorage(testUtil.currentVersion().toString(), [
        {
          url: 'site1.example.com',
          msg: 'site1',
          backgroundColor: '111111',
          displayPosition: 'top',
          status: 1,
        },
        {
          url: 'site2.example.com',
          msg: 'site2',
          backgroundColor: '222222',
          displayPosition: 'bottom',
          status: 0,
        },
      ]);
      SUT.show();
    });

    it('displayed elements of item', () => {
      assert.strictEqual(testUtil.options.list().numOfItems(), 2);

      const item1 = testUtil.options.list().item(0);
      assert.strictEqual(item1.pattern(), 'site1.example.com');
      assert.strictEqual(item1.message(), 'site1');
      assert.strictEqual(item1.backgroundColor(), '#111111');
      assert.strictEqual(item1.displayPosition(), 'Top');
      assert.strictEqual(item1.status(), 'Y');

      const item2 = testUtil.options.list().item(1);
      assert.strictEqual(item2.pattern(), 'site2.example.com');
      assert.strictEqual(item2.message(), 'site2');
      assert.strictEqual(item2.backgroundColor(), '#222222');
      assert.strictEqual(item2.displayPosition(), 'Bottom');
      assert.strictEqual(item2.status(), 'n');
    });

    it('click copy button twice and form should be updated', () => {
      const list = testUtil.options.list();
      const form = testUtil.options.patternForm();

      list.item(0).clickCopy();

      assert.ok(form.shown());
      assert.strictEqual(form.pattern(), 'site1.example.com');

      list.item(1).clickCopy();

      assert.ok(form.shown());
      assert.strictEqual(form.pattern(), 'site2.example.com');
    });

    it('click edit button twice and form should be updated', () => {
      const list = testUtil.options.list();
      const form = testUtil.options.patternForm();

      list.item(0).clickEdit();

      assert.ok(form.shown());
      assert.strictEqual(form.pattern(), 'site1.example.com');

      list.item(1).clickEdit();

      assert.ok(form.shown());
      assert.strictEqual(form.pattern(), 'site2.example.com');
    });

    it('click delete button twice and form should be updated', () => {
      const list = testUtil.options.list();
      const form = testUtil.options.deleteForm();

      list.item(0).clickDelete();

      assert.ok(form.shown());
      assert.strictEqual(form.pattern(), 'site1.example.com');
      assert.strictEqual(form.message(), 'site1');

      list.item(1).clickDelete();

      assert.ok(form.shown());
      assert.strictEqual(form.pattern(), 'site2.example.com');
      assert.strictEqual(form.message(), 'site2');
    });

    given([
      {
        itemIndex: 0,
        remained: [{
          url: 'site2.example.com',
          msg: 'site2',
          backgroundColor: '222222',
          displayPosition: 'bottom',
          status: 0,
        }],
      },
      {
        itemIndex: 1,
        remained: [{
          url: 'site1.example.com',
          msg: 'site1',
          backgroundColor: '111111',
          displayPosition: 'top',
          status: 1,
        }],
      },
    ]).it('execute delete', (arg) => {
      testUtil.options.list().item(arg.itemIndex).clickDelete();
      testUtil.options.deleteForm().submit();

      assert.strictEqual(storage.getCount(), 1);
      assert.deepStrictEqual(storage.getAll(), arg.remained);
    });

    given([
      {itemIndex: 0},
      {itemIndex: 1},
    ]).it('cancel delete', (arg) => {
      testUtil.options.list().item(arg.itemIndex).clickDelete();
      testUtil.options.deleteForm().cancel();

      assert.strictEqual(storage.getCount(), 2);
    });
  });

  describe('list area - display position', () => {
    beforeEach(() => {
      testUtil.initStorage(testUtil.currentVersion().toString(), [
        testUtil.makePatternItem({url: 'site1.example.com', displayPosition: 'top'}),
        testUtil.makePatternItem({url: 'site2.example.com', displayPosition: 'bottom'}),
        testUtil.makePatternItem({url: 'site3.example.com', displayPosition: 'top_left'}),
        testUtil.makePatternItem({url: 'site4.example.com', displayPosition: 'top_right'}),
        testUtil.makePatternItem({url: 'site5.example.com', displayPosition: 'bottom_left'}),
        testUtil.makePatternItem({url: 'site6.example.com', displayPosition: 'bottom_right'}),
      ]);
      SUT.show();
    });

    given([
      {itemIndex: 0, expected: 'Top'},
      {itemIndex: 1, expected: 'Bottom'},
      {itemIndex: 2, expected: 'Top left'},
      {itemIndex: 3, expected: 'Top right'},
      {itemIndex: 4, expected: 'Bottom left'},
      {itemIndex: 5, expected: 'Bottom right'},
    ]).it('label of display position', (arg) => {
      const item = testUtil.options.list().item(arg.itemIndex);

      assert.strictEqual(item.displayPosition(), arg.expected);
    });
  });

  describe('behavior for broken or invalid data', () => {
    it('url not registered', () => {
      testUtil.initStorage(testUtil.currentVersion().toString(), [
        {
          msg: 'site1',
          backgroundColor: '111111',
          displayPosition: 'top',
          status: 1,
        },
      ]);
      SUT.show();

      const list = testUtil.options.list();
      assert.strictEqual(list.numOfItems(), 1);
      assert.strictEqual(list.item(0).pattern(), '');
      assert.strictEqual(list.item(0).message(), 'site1');
      assert.strictEqual(list.item(0).backgroundColor(), '#111111');
      assert.strictEqual(list.item(0).displayPosition(), 'Top');
      assert.strictEqual(list.item(0).status(), 'Y');
    });

    it('message not registered', () => {
      testUtil.initStorage(testUtil.currentVersion().toString(), [
        {
          url: 'site1.example.com',
          backgroundColor: '111111',
          displayPosition: 'top',
          status: 1,
        },
      ]);
      SUT.show();

      const list = testUtil.options.list();
      assert.strictEqual(list.numOfItems(), 1);
      assert.strictEqual(list.item(0).pattern(), 'site1.example.com');
      assert.strictEqual(list.item(0).message(), '');
      assert.strictEqual(list.item(0).backgroundColor(), '#111111');
      assert.strictEqual(list.item(0).displayPosition(), 'Top');
      assert.strictEqual(list.item(0).status(), 'Y');
    });

    it('display position not registered', () => {
      testUtil.initStorage(testUtil.currentVersion().toString(), [
        {
          url: 'site1.example.com',
          msg: 'site1',
          backgroundColor: '111111',
          status: 1,
        },
      ]);
      SUT.show();

      const list = testUtil.options.list();
      assert.strictEqual(list.numOfItems(), 1);
      assert.strictEqual(list.item(0).pattern(), 'site1.example.com');
      assert.strictEqual(list.item(0).message(), 'site1');
      assert.strictEqual(list.item(0).backgroundColor(), '#111111');
      assert.strictEqual(list.item(0).displayPosition(), '');
      assert.strictEqual(list.item(0).status(), 'Y');
    });

    it('display position is invalid', () => {
      testUtil.initStorage(testUtil.currentVersion().toString(), [
        {
          url: 'site1.example.com',
          msg: 'site1',
          backgroundColor: '111111',
          displayPosition: 'foo',
          status: 1,
        },
      ]);
      SUT.show();

      const list = testUtil.options.list();
      assert.strictEqual(list.numOfItems(), 1);
      assert.strictEqual(list.item(0).pattern(), 'site1.example.com');
      assert.strictEqual(list.item(0).message(), 'site1');
      assert.strictEqual(list.item(0).backgroundColor(), '#111111');
      assert.strictEqual(list.item(0).displayPosition(), '');
      assert.strictEqual(list.item(0).status(), 'Y');
    });

    it('status not registered', () => {
      testUtil.initStorage(testUtil.currentVersion().toString(), [
        {
          url: 'site1.example.com',
          msg: 'site1',
          backgroundColor: '111111',
          displayPosition: 'top',
        },
      ]);
      SUT.show();

      const list = testUtil.options.list();
      assert.strictEqual(list.numOfItems(), 1);
      assert.strictEqual(list.item(0).pattern(), 'site1.example.com');
      assert.strictEqual(list.item(0).message(), 'site1');
      assert.strictEqual(list.item(0).backgroundColor(), '#111111');
      assert.strictEqual(list.item(0).displayPosition(), 'Top');
      assert.strictEqual(list.item(0).status(), '');
    });

    it('status is invalid', () => {
      testUtil.initStorage(testUtil.currentVersion().toString(), [
        {
          url: 'site1.example.com',
          msg: 'site1',
          backgroundColor: '111111',
          displayPosition: 'top',
          status: 2,
        },
      ]);
      SUT.show();

      const list = testUtil.options.list();
      assert.strictEqual(list.numOfItems(), 1);
      assert.strictEqual(list.item(0).pattern(), 'site1.example.com');
      assert.strictEqual(list.item(0).message(), 'site1');
      assert.strictEqual(list.item(0).backgroundColor(), '#111111');
      assert.strictEqual(list.item(0).displayPosition(), 'Top');
      assert.strictEqual(list.item(0).status(), '');
    });
  });
});
