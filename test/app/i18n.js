const { describe, before, beforeEach, afterEach, after, it } = require('mocha');
const assert = require('assert');
const SUT = require('../../src/js/app/i18n');
const testUtil = require('../../test_lib/util');

describe('app.i18n', () => {
  before(testUtil.uiBase.before);
  beforeEach(testUtil.uiBase.beforeEach);
  afterEach(testUtil.uiBase.afterEach);
  after(testUtil.uiBase.after);

  describe('en', () => {
    before(testUtil.uiBase.initI18n('en'));

    describe('get', () => {
      it('label_background_color', () => {
        assert.strictEqual(SUT.get('label_background_color'), 'Background color');
      });
    });
  });

  describe('ja', () => {
    before(testUtil.uiBase.initI18n('ja'));

    describe('get', () => {
      it('label_background_color', () => {
        assert.strictEqual(SUT.get('label_background_color'), '背景色');
      });
    });
  });
});
