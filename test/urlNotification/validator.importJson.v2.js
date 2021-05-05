const { describe } = require('mocha');
const { given } = require('mocha-testdata');
const assert = require('assert');
const testUtil = require('../../test_lib/util');
const sharedBasic = require('./shared/importJson.basic');
const sharedPattern = require('./shared/importJson.pattern');

describe('urlNotification.validator.importJson.v2', () => {
  describe('basic structure', () => {
    sharedBasic.run(2, {
      url: 'sample1',
      msg: 'sample1',
      backgroundColor: '111111',
      displayPosition: 'top',
    });
  });

  describe('pattern data', () => {
    sharedPattern.runUrl(2, {
      url: 'sample2',
      msg: 'sample2',
      backgroundColor: '222222',
      displayPosition: 'top',
    });

    sharedPattern.runMsg(2, {
      url: 'sample2',
      msg: 'sample2',
      backgroundColor: '222222',
      displayPosition: 'top',
    });

    sharedPattern.runBackgroundColor(2, {
      url: 'sample2',
      msg: 'sample2',
      backgroundColor: '222222',
      displayPosition: 'top',
    });

    sharedPattern.runDisplayPosition(2, {
      url: 'sample2',
      msg: 'sample2',
      backgroundColor: '222222',
      displayPosition: 'top',
    });

    sharedPattern.runDisplayPositionV2andV3(2, {
      url: 'sample2',
      msg: 'sample2',
      backgroundColor: '222222',
      displayPosition: 'top',
    });

    sharedPattern.runOk(2);

    given([
      {item: {url: 'sample1', msg: 'sample1', backgroundColor: '111111', displayPosition: 'top'}},
      {item: {url: 'sample2', msg: 'sample2', backgroundColor: '222222', displayPosition: 'bottom'}},

      {item: {url: 'sample1', msg: 'sample1', backgroundColor: 'ffffff', displayPosition: 'top'}},
      {item: {url: 'sample2', msg: 'sample2', backgroundColor: 'FFFFFF', displayPosition: 'bottom'}},
    ]).it('ok', (arg) => {
      assert.ok(testUtil.isValidJson({
        version: 2,
        pattern: [arg.item],
      }));
    });
  });
});
