const { describe, it } = require('mocha');
const assert = require('assert');
const testUtil = require('../../test_lib/util');
const sharedBasic = require('./shared/importJson.basic');
const sharedPattern = require('./shared/importJson.pattern');

describe('urlNotification.validator.importJson.v3', function() {
  describe('basic structure', function() {
    sharedBasic.run(3, {
      url: 'sample1',
      msg: 'sample1',
      backgroundColor: '111111',
      displayPosition: 'top',
      status: 1,
    });
  });

  describe('pattern data', function() {
    sharedPattern.runUrl(3, {
      url: 'sample1',
      msg: 'sample1',
      backgroundColor: '111111',
      displayPosition: 'top',
      status: 1,
    });

    sharedPattern.runMsg(3, {
      url: 'sample1',
      msg: 'sample1',
      backgroundColor: '111111',
      displayPosition: 'top',
      status: 1,
    });

    sharedPattern.runBackgroundColor(3, {
      url: 'sample1',
      msg: 'sample1',
      backgroundColor: '111111',
      displayPosition: 'top',
      status: 1,
    });

    sharedPattern.runDisplayPosition(3, {
      url: 'sample1',
      msg: 'sample1',
      backgroundColor: '111111',
      displayPosition: 'top',
      status: 1,
    });

    sharedPattern.runDisplayPositionV2andV3(3, {
      url: 'sample1',
      msg: 'sample1',
      backgroundColor: '111111',
      displayPosition: 'top',
      status: 1,
    });

    sharedPattern.runStatus(3, {
      url: 'sample1',
      msg: 'sample1',
      backgroundColor: '111111',
      displayPosition: 'top',
      status: 1,
    });

    it('ok', function () {
      assert.ok(testUtil.isValidJson({
        version: 3,
        pattern: [
          {url: 'sample1', msg: 'sample1', backgroundColor: '111111', displayPosition: 'top',    status: 1},
          {url: 'sample2', msg: 'sample2', backgroundColor: '222222', displayPosition: 'bottom', status: 0},
        ],
      }));
    });

    it('ok - no data', function () {
      assert.ok(testUtil.isValidJson({
        version: 3,
        pattern: [],
      }));
    });
  });
});
