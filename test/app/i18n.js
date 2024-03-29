const { describe, beforeEach, it } = require('mocha');
const assert = require('assert');
const SUT = require('../../src/js/app/i18n');
const testUtil = require('../../test_lib/util');

describe('app.i18n', () => {
  testUtil.chromeBackground.registerHooks();

  describe('en', () => {
    beforeEach(() => {
      testUtil.chromeBackground.i18n('en');
    });

    describe('get', () => {
      it('label_background_color', () => {
        assert.strictEqual(SUT.get('label_background_color'), 'Background color');
      });
    });
  });

  describe('ja', () => {
    beforeEach(() => {
      testUtil.chromeBackground.i18n('ja');
    });

    describe('get', () => {
      it('label_background_color', () => {
        assert.strictEqual(SUT.get('label_background_color'), '背景色');
      });
    });
  });
});
