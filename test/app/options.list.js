const { describe, beforeEach, it } = require('mocha');
const { given } = require('mocha-testdata');
const assert = require('assert');
const testUtil = require('../../test_lib/util');
const ChromeMock = testUtil.ChromeMock;
const Options = testUtil.Options;
const Storage = testUtil.Storage;

describe('app.options.list', () => {
  /**
   * @type {Storage}
   */
  let storage;

  /**
   * @type {ChromeMock}
   */
  let chrome;

  /**
   * @type {Options}
   */
  let options;

  beforeEach(() => {
    const dom = testUtil.dom.initOptions('src/html/options.html');

    storage = new Storage(dom.window.localStorage);

    chrome = new ChromeMock(dom.window.chrome);
    chrome.i18n('en');

    options = new Options(dom.window.jQuery);
  });

  describe('badge number', () => {
    it('without data', () => {
      assert.strictEqual(options.list().badge(), '0');
    });

    it('with 1 pattern', () => {
      storage.init(testUtil.currentVersion().toString(), [
        testUtil.makePatternItem({}),
      ]);

      const list = options.list();

      list.reload();

      assert.strictEqual(list.badge(), '1');
    });

    it('with 3 patterns', () => {
      storage.init(testUtil.currentVersion().toString(), [
        testUtil.makePatternItem({url: 'site1.example.com'}),
        testUtil.makePatternItem({url: 'site2.example.com'}),
        testUtil.makePatternItem({url: 'site3.example.com'}),
      ]);

      const list = options.list();

      list.reload();

      assert.strictEqual(list.badge(), '3');
    });
  });

  describe('table tr element', () => {
    it('without pattern data', () => {
      const list = options.list();

      assert.strictEqual(list.header().length, 0);
      assert.strictEqual(list.numOfItems(), 0);
    });

    it('with pattern data', () => {
      storage.init(testUtil.currentVersion().toString(), [
        testUtil.makePatternItem({}),
      ]);

      const list = options.list();

      list.reload();

      assert.strictEqual(list.header().length, 1);
      assert.strictEqual(list.numOfItems(), 1);
    });
  });

  describe('header area', () => {
    it('labels', () => {
      storage.init(testUtil.currentVersion().toString(), [
        testUtil.makePatternItem({}),
      ]);

      const list = options.list();

      list.reload();

      const columns = list.header().find('th');

      assert.strictEqual(columns.length, 5);
      assert.strictEqual(columns.eq(0).text(), 'URL pattern');
      assert.strictEqual(columns.eq(1).text(), 'Message');
      assert.strictEqual(columns.eq(2).text(), 'Display position');
      assert.strictEqual(columns.eq(3).text(), 'Enabled');
      assert.strictEqual(columns.eq(4).text(), 'Operation');
    });
  });

  describe('list area', () => {
    beforeEach(() => {
      storage.init(testUtil.currentVersion().toString(), [
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

      options.list().reload();
    });

    it('displayed elements of item', () => {
      assert.strictEqual(options.list().numOfItems(), 2);

      const item1 = options.list().item(0);
      assert.strictEqual(item1.pattern(), 'site1.example.com');
      assert.strictEqual(item1.message(), 'site1');
      assert.strictEqual(item1.backgroundColor(), '#111111');
      assert.strictEqual(item1.displayPosition(), 'Top');
      assert.strictEqual(item1.status(), 'Y');

      const item2 = options.list().item(1);
      assert.strictEqual(item2.pattern(), 'site2.example.com');
      assert.strictEqual(item2.message(), 'site2');
      assert.strictEqual(item2.backgroundColor(), '#222222');
      assert.strictEqual(item2.displayPosition(), 'Bottom');
      assert.strictEqual(item2.status(), 'n');
    });

    it('click copy button twice and form should be refreshed', () => {
      const list = options.list();
      const form = options.patternForm();

      list.item(0).clickCopy();

      assert.ok(form.shown());
      assert.strictEqual(form.pattern(), 'site1.example.com');

      list.item(1).clickCopy();

      assert.ok(form.shown());
      assert.strictEqual(form.pattern(), 'site2.example.com');
    });

    it('click edit button twice and form should be refreshed', () => {
      const list = options.list();
      const form = options.patternForm();

      list.item(0).clickEdit();

      assert.ok(form.shown());
      assert.strictEqual(form.pattern(), 'site1.example.com');

      list.item(1).clickEdit();

      assert.ok(form.shown());
      assert.strictEqual(form.pattern(), 'site2.example.com');
    });

    it('click delete button twice and form should be refreshed', () => {
      const list = options.list();
      const form = options.deleteForm();

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
      options.list().item(arg.itemIndex).clickDelete();
      options.deleteForm().submit();

      assert.strictEqual(storage.getCount(), 1);
      assert.deepStrictEqual(storage.getAll(), arg.remained);
    });

    given([
      {itemIndex: 0},
      {itemIndex: 1},
    ]).it('cancel delete', (arg) => {
      options.list().item(arg.itemIndex).clickDelete();
      options.deleteForm().cancel();

      assert.strictEqual(storage.getCount(), 2);
    });
  });

  describe('list area - display position', () => {
    beforeEach(() => {
      storage.init(testUtil.currentVersion().toString(), [
        testUtil.makePatternItem({url: 'site1.example.com', displayPosition: 'top'}),
        testUtil.makePatternItem({url: 'site2.example.com', displayPosition: 'bottom'}),
        testUtil.makePatternItem({url: 'site3.example.com', displayPosition: 'top_left'}),
        testUtil.makePatternItem({url: 'site4.example.com', displayPosition: 'top_right'}),
        testUtil.makePatternItem({url: 'site5.example.com', displayPosition: 'bottom_left'}),
        testUtil.makePatternItem({url: 'site6.example.com', displayPosition: 'bottom_right'}),
      ]);

      options.list().reload();
    });

    given([
      {itemIndex: 0, expected: 'Top'},
      {itemIndex: 1, expected: 'Bottom'},
      {itemIndex: 2, expected: 'Top left'},
      {itemIndex: 3, expected: 'Top right'},
      {itemIndex: 4, expected: 'Bottom left'},
      {itemIndex: 5, expected: 'Bottom right'},
    ]).it('label of display position', (arg) => {
      const item = options.list().item(arg.itemIndex);

      assert.strictEqual(item.displayPosition(), arg.expected);
    });
  });

  describe('behavior for broken or invalid data', () => {
    it('url not registered', () => {
      storage.init(testUtil.currentVersion().toString(), [
        {
          msg: 'site1',
          backgroundColor: '111111',
          displayPosition: 'top',
          status: 1,
        },
      ]);

      const list = options.list();

      list.reload();

      assert.strictEqual(list.numOfItems(), 1);
      assert.strictEqual(list.item(0).pattern(), '');
      assert.strictEqual(list.item(0).message(), 'site1');
      assert.strictEqual(list.item(0).backgroundColor(), '#111111');
      assert.strictEqual(list.item(0).displayPosition(), 'Top');
      assert.strictEqual(list.item(0).status(), 'Y');
    });

    it('message not registered', () => {
      storage.init(testUtil.currentVersion().toString(), [
        {
          url: 'site1.example.com',
          backgroundColor: '111111',
          displayPosition: 'top',
          status: 1,
        },
      ]);

      const list = options.list();

      list.reload();

      assert.strictEqual(list.numOfItems(), 1);
      assert.strictEqual(list.item(0).pattern(), 'site1.example.com');
      assert.strictEqual(list.item(0).message(), '');
      assert.strictEqual(list.item(0).backgroundColor(), '#111111');
      assert.strictEqual(list.item(0).displayPosition(), 'Top');
      assert.strictEqual(list.item(0).status(), 'Y');
    });

    it('display position not registered', () => {
      storage.init(testUtil.currentVersion().toString(), [
        {
          url: 'site1.example.com',
          msg: 'site1',
          backgroundColor: '111111',
          status: 1,
        },
      ]);

      const list = options.list();

      list.reload();

      assert.strictEqual(list.numOfItems(), 1);
      assert.strictEqual(list.item(0).pattern(), 'site1.example.com');
      assert.strictEqual(list.item(0).message(), 'site1');
      assert.strictEqual(list.item(0).backgroundColor(), '#111111');
      assert.strictEqual(list.item(0).displayPosition(), '');
      assert.strictEqual(list.item(0).status(), 'Y');
    });

    it('display position is invalid', () => {
      storage.init(testUtil.currentVersion().toString(), [
        {
          url: 'site1.example.com',
          msg: 'site1',
          backgroundColor: '111111',
          displayPosition: 'foo',
          status: 1,
        },
      ]);

      const list = options.list();

      list.reload();

      assert.strictEqual(list.numOfItems(), 1);
      assert.strictEqual(list.item(0).pattern(), 'site1.example.com');
      assert.strictEqual(list.item(0).message(), 'site1');
      assert.strictEqual(list.item(0).backgroundColor(), '#111111');
      assert.strictEqual(list.item(0).displayPosition(), '');
      assert.strictEqual(list.item(0).status(), 'Y');
    });

    it('status not registered', () => {
      storage.init(testUtil.currentVersion().toString(), [
        {
          url: 'site1.example.com',
          msg: 'site1',
          backgroundColor: '111111',
          displayPosition: 'top',
        },
      ]);

      const list = options.list();

      list.reload();

      assert.strictEqual(list.numOfItems(), 1);
      assert.strictEqual(list.item(0).pattern(), 'site1.example.com');
      assert.strictEqual(list.item(0).message(), 'site1');
      assert.strictEqual(list.item(0).backgroundColor(), '#111111');
      assert.strictEqual(list.item(0).displayPosition(), 'Top');
      assert.strictEqual(list.item(0).status(), '');
    });

    it('status is invalid', () => {
      storage.init(testUtil.currentVersion().toString(), [
        {
          url: 'site1.example.com',
          msg: 'site1',
          backgroundColor: '111111',
          displayPosition: 'top',
          status: 2,
        },
      ]);

      const list = options.list();

      list.reload();

      assert.strictEqual(list.numOfItems(), 1);
      assert.strictEqual(list.item(0).pattern(), 'site1.example.com');
      assert.strictEqual(list.item(0).message(), 'site1');
      assert.strictEqual(list.item(0).backgroundColor(), '#111111');
      assert.strictEqual(list.item(0).displayPosition(), 'Top');
      assert.strictEqual(list.item(0).status(), '');
    });
  });
});
