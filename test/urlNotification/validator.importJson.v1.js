const { describe } = require('mocha');
const { given } = require('mocha-testdata');
const assert = require('assert');
const testUtil = require('../../test_lib/util');
const sharedBasic = require('./shared/importJson.basic');
const sharedPattern = require('./shared/importJson.pattern');

describe('urlNotification.validator.importJson.v1', () => {
  describe('basic structure', () => {
    sharedBasic.run(1, {
      url: 'sample1',
      msg: 'sample1',
      backgroundColor: '111111',
    });
  });

  describe('pattern data', () => {
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

    given([
      {item: {url: 'sample1', msg: 'sample1', backgroundColor: '111111'}},
      {item: {url: 'sample2', msg: 'sample2', backgroundColor: '000000'}},

      {item: {url: 'sample1', msg: 'sample1', backgroundColor: 'ffffff'}},
      {item: {url: 'sample2', msg: 'sample2', backgroundColor: 'FFFFFF'}},
    ]).it('ok', (arg) => {
      assert.ok(testUtil.isValidJson({
        version: 1,
        pattern: [arg.item],
      }));
    });
  });
});
