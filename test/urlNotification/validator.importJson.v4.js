const { describe } = require('mocha');
const { given } = require('mocha-testdata');
const assert = require('assert');
const testUtil = require('../../test_lib/util');
const sharedBasic = require('./shared/importJson.basic');
const sharedPattern = require('./shared/importJson.pattern');

describe('urlNotification.validator.importJson.v4', function() {
  describe('basic structure', function () {
    sharedBasic.run(4, {
      url: 'sample1',
      msg: 'sample1',
      backgroundColor: '111111',
      displayPosition: 'top',
      status: 1,
    });
  });

  describe('pattern data', function () {
    sharedPattern.runUrl(4, {
      url: 'sample1',
      msg: 'sample1',
      backgroundColor: '111111',
      displayPosition: 'top',
      status: 1,
    });

    sharedPattern.runMsg(4, {
      url: 'sample1',
      msg: 'sample1',
      backgroundColor: '111111',
      displayPosition: 'top',
      status: 1,
    });

    sharedPattern.runBackgroundColor(4, {
      url: 'sample1',
      msg: 'sample1',
      backgroundColor: '111111',
      displayPosition: 'top',
      status: 1,
    });

    sharedPattern.runDisplayPosition(4, {
      url: 'sample1',
      msg: 'sample1',
      backgroundColor: '111111',
      displayPosition: 'top',
      status: 1,
    });

    sharedPattern.runStatus(4, {
      url: 'sample1',
      msg: 'sample1',
      backgroundColor: '111111',
      displayPosition: 'top',
      status: 1,
    });

    sharedPattern.runOk(4);

    given([
      {item: {url: 'sample1', msg: 'sample1', backgroundColor: '111111', displayPosition: 'top',          status: 1}},
      {item: {url: 'sample1', msg: 'sample1', backgroundColor: '111111', displayPosition: 'top',          status: 0}},
      {item: {url: 'sample2', msg: 'sample2', backgroundColor: '222222', displayPosition: 'bottom',       status: 1}},
      {item: {url: 'sample2', msg: 'sample2', backgroundColor: '222222', displayPosition: 'bottom',       status: 0}},
      {item: {url: 'sample3', msg: 'sample3', backgroundColor: '333333', displayPosition: 'top_left',     status: 1}},
      {item: {url: 'sample3', msg: 'sample3', backgroundColor: '333333', displayPosition: 'top_left',     status: 0}},
      {item: {url: 'sample4', msg: 'sample4', backgroundColor: '444444', displayPosition: 'top_right',    status: 1}},
      {item: {url: 'sample4', msg: 'sample4', backgroundColor: '444444', displayPosition: 'top_right',    status: 0}},
      {item: {url: 'sample5', msg: 'sample5', backgroundColor: '555555', displayPosition: 'bottom_left',  status: 1}},
      {item: {url: 'sample5', msg: 'sample5', backgroundColor: '555555', displayPosition: 'bottom_left',  status: 0}},
      {item: {url: 'sample6', msg: 'sample6', backgroundColor: '666666', displayPosition: 'bottom_right', status: 1}},
      {item: {url: 'sample6', msg: 'sample6', backgroundColor: '666666', displayPosition: 'bottom_right', status: 0}},
    ]).it('ok', function (arg) {
      assert.ok(testUtil.isValidJson({
        version: 4,
        pattern: [arg.item],
      }));
    });
  });
});
