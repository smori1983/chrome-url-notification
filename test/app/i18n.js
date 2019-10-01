const { describe, before, beforeEach, afterEach, after, it } = require('mocha');
const assert = require('assert');
const SUT = require('../../src/js/app/i18n');
const testUtil = require('../../test_lib/util');

describe('i18n', function () {
  before(testUtil.options.before);
  beforeEach(testUtil.options.beforeEach);
  afterEach(testUtil.options.afterEach);
  after(testUtil.options.after);

  describe('get', function () {
    it('label_background_color', function () {
      assert.strictEqual(SUT.get('label_background_color'), 'Background color');
    });
  });
});
