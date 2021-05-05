const { describe } = require('mocha');
const { given } = require('mocha-testdata');
const assert = require('assert');
const testUtil = require('../../test_lib/util');
const sharedBasic = require('./shared/importJson.basic');
const sharedPattern = require('./shared/importJson.pattern');

describe('urlNotification.validator.importJson.v3', () => {
  describe('basic structure', () => {
    sharedBasic.run(3, {
      url: 'sample1',
      msg: 'sample1',
      backgroundColor: '111111',
      displayPosition: 'top',
      status: 1,
    });
  });

  describe('pattern data', () => {
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

    sharedPattern.runOk(3);

    given([
      {item: {url: 'sample1', msg: 'sample1', backgroundColor: '111111', displayPosition: 'top',    status: 1}},
      {item: {url: 'sample1', msg: 'sample1', backgroundColor: '111111', displayPosition: 'top',    status: 0}},
      {item: {url: 'sample2', msg: 'sample2', backgroundColor: '222222', displayPosition: 'bottom', status: 1}},
      {item: {url: 'sample2', msg: 'sample2', backgroundColor: '222222', displayPosition: 'bottom', status: 0}},

      {item: {url: 'sample1', msg: 'sample1', backgroundColor: 'FFFFFF', displayPosition: 'top',    status: 1}},
      {item: {url: 'sample1', msg: 'sample1', backgroundColor: 'ffffff', displayPosition: 'top',    status: 0}},
      {item: {url: 'sample2', msg: 'sample2', backgroundColor: 'FFFFFF', displayPosition: 'bottom', status: 1}},
      {item: {url: 'sample2', msg: 'sample2', backgroundColor: 'ffffff', displayPosition: 'bottom', status: 0}},
    ]).it('ok', (arg) => {
      assert.ok(testUtil.isValidJson({
        version: 3,
        pattern: [arg.item],
      }));
    });
  });
});
