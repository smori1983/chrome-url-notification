const { describe, it } = require('mocha');
const assert = require('assert');
const testUtil = require('../../test_lib/util');
const sharedBasic = require('./shared/importJson.basic');
const sharedPattern = require('./shared/importJson.pattern');

describe('urlNotification.validator.importJson.v1', function() {
  describe('basic structure', function() {
    sharedBasic.run(1, {
      url: 'sample1',
      msg: 'sample1',
      backgroundColor: '111111',
    });
  });

  describe('pattern data', function() {
    sharedPattern.runUrl(1, {
      url: 'sample1',
      msg: 'sample1',
      backgroundColor: '111111',
    });

    sharedPattern.runMsg(1, {
      url: 'sample1',
      msg: 'sample1',
      backgroundColor: '111111',
    });

    sharedPattern.runBackgroundColor(1, {
      url: 'sample1',
      msg: 'sample1',
      backgroundColor: '111111',
    });

    sharedPattern.runOk(1);

    it('ok', function () {
      assert.ok(testUtil.isValidJson({
        version: 1,
        pattern: [
          {url: 'sample1', msg: 'sample1', backgroundColor: '111111'},
          {url: 'sample2', msg: 'sample2', backgroundColor: '000000'},
        ],
      }));
    });
  });
});
