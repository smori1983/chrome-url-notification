const { describe, it } = require('mocha');
const assert = require('assert');
const testUtil = require('../../test_lib/util');

describe('urlNotification.validator.importJson.v4', function() {
  describe('basic structure', function () {
    it('error - argument is an array', function () {
      assert.ok(testUtil.isNotValidJson([]));
    });

    it('error - argument is an object but no keys', function () {
      assert.ok(testUtil.isNotValidJson({}));
    });

    it('error - version is not defined', function () {
      assert.ok(testUtil.isNotValidJson({
        pattern: [
          {url: 'sample1', msg: 'sample1', backgroundColor: '111111', displayPosition: 'top', status: 1},
          {url: 'sample2', msg: 'sample2', backgroundColor: '222222', displayPosition: 'top', status: 1},
        ],
      }));
    });

    it('error - version is null', function () {
      assert.ok(testUtil.isNotValidJson({
        version: null,
        pattern: [
          {url: 'sample1', msg: 'sample1', backgroundColor: '111111', displayPosition: 'top', status: 1},
          {url: 'sample2', msg: 'sample2', backgroundColor: '222222', displayPosition: 'top', status: 1},
        ],
      }));
    });

    it('error - version is true', function () {
      assert.ok(testUtil.isNotValidJson({
        version: true,
        pattern: [
          {url: 'sample1', msg: 'sample1', backgroundColor: '111111', displayPosition: 'top', status: 1},
          {url: 'sample2', msg: 'sample2', backgroundColor: '222222', displayPosition: 'top', status: 1},
        ],
      }));
    });

    it('error - version is false', function () {
      assert.ok(testUtil.isNotValidJson({
        version: false,
        pattern: [
          {url: 'sample1', msg: 'sample1', backgroundColor: '111111', displayPosition: 'top', status: 1},
          {url: 'sample2', msg: 'sample2', backgroundColor: '222222', displayPosition: 'top', status: 1},
        ],
      }));
    });

    it('error - version is string of integer', function () {
      assert.ok(testUtil.isNotValidJson({
        version: '1',
        pattern: [
          {url: 'sample1', msg: 'sample1', backgroundColor: '111111', displayPosition: 'top', status: 1},
          {url: 'sample2', msg: 'sample2', backgroundColor: '222222', displayPosition: 'top', status: 1},
        ],
      }));
    });

    it('error - version is float', function () {
      assert.ok(testUtil.isNotValidJson({
        version: 1.1,
        pattern: [
          {url: 'sample1', msg: 'sample1', backgroundColor: '111111', displayPosition: 'top', status: 1},
          {url: 'sample2', msg: 'sample2', backgroundColor: '222222', displayPosition: 'top', status: 1},
        ],
      }));
    });

    it('error - version is out of range', function () {
      assert.ok(testUtil.isNotValidJson({
        version: 0,
        pattern: [
          {url: 'sample1', msg: 'sample1', backgroundColor: '111111', displayPosition: 'top', status: 1},
          {url: 'sample2', msg: 'sample2', backgroundColor: '222222', displayPosition: 'top', status: 1},
        ],
      }));

      assert.ok(testUtil.isNotValidJson({
        version: 5,
        pattern: [
          {url: 'sample1', msg: 'sample1', backgroundColor: '111111', displayPosition: 'top', status: 1},
          {url: 'sample2', msg: 'sample2', backgroundColor: '222222', displayPosition: 'top', status: 1},
        ],
      }));
    });

    it('error - pattern is not defined', function () {
      assert.ok(testUtil.isNotValidJson({
        version: 4,
      }));
    });

    it('error - pattern is null', function () {
      assert.ok(testUtil.isNotValidJson({
        version: 4,
        pattern: null,
      }));
    });

    it('error - pattern is true', function () {
      assert.ok(testUtil.isNotValidJson({
        version: 4,
        pattern: true,
      }));
    });

    it('error - pattern is false', function () {
      assert.ok(testUtil.isNotValidJson({
        version: 4,
        pattern: false,
      }));
    });

    it('error - pattern is string', function () {
      assert.ok(testUtil.isNotValidJson({
        version: 4,
        pattern: 'dummy',
      }));
    });

    it('error - pattern is not an array of object(s)', function () {
      assert.ok(testUtil.isNotValidJson({
        version: 4,
        pattern: {url: 'sample1', msg: 'sample1', backgroundColor: '111111', displayPosition: 'top', status: 1},
      }));
    });
  });

  describe('pattern data', function () {
    it('import json - error - pattern - displayPosition is not defined', function () {
      assert.ok(testUtil.isNotValidJson({
        version: 4,
        pattern: [
          {url: 'sample1', msg: 'sample1', backgroundColor: '111111', displayPosition: 'top', status: 1},
          {url: 'sample2', msg: 'sample2', backgroundColor: '222222',                         status: 0},
        ],
      }));

      assert.ok(testUtil.isNotValidJson({
        version: 4,
        pattern: [
          {url: 'sample1', msg: 'sample1', backgroundColor: '111111',                            status: 1},
          {url: 'sample2', msg: 'sample2', backgroundColor: '222222', displayPosition: 'bottom', status: 0},
        ],
      }));
    });

    it('import json - error - pattern - displayPosition is null', function () {
      assert.ok(testUtil.isNotValidJson({
        version: 4,
        pattern: [
          {url: 'sample1', msg: 'sample1', backgroundColor: '111111', displayPosition: 'top', status: 1},
          {url: 'sample2', msg: 'sample2', backgroundColor: '222222', displayPosition: null,  status: 0},
        ],
      }));

      assert.ok(testUtil.isNotValidJson({
        version: 4,
        pattern: [
          {url: 'sample1', msg: 'sample1', backgroundColor: '111111', displayPosition: null,     status: 1},
          {url: 'sample2', msg: 'sample2', backgroundColor: '222222', displayPosition: 'bottom', status: 0},
        ],
      }));
    });

    it('import json - error - pattern - displayPosition is bool', function () {
      assert.ok(testUtil.isNotValidJson({
        version: 4,
        pattern: [
          {url: 'sample1', msg: 'sample1', backgroundColor: '111111', displayPosition: 'top', status: 1},
          {url: 'sample2', msg: 'sample2', backgroundColor: '222222', displayPosition: true,  status: 0},
        ],
      }));

      assert.ok(testUtil.isNotValidJson({
        version: 4,
        pattern: [
          {url: 'sample1', msg: 'sample1', backgroundColor: '111111', displayPosition: false,    status: 1},
          {url: 'sample2', msg: 'sample2', backgroundColor: '222222', displayPosition: 'bottom', status: 0},
        ],
      }));
    });

    it('import json - error - pattern - displayPosition is number', function () {
      assert.ok(testUtil.isNotValidJson({
        version: 4,
        pattern: [
          {url: 'sample1', msg: 'sample1', backgroundColor: '111111', displayPosition: 'top', status: 1},
          {url: 'sample2', msg: 'sample2', backgroundColor: '222222', displayPosition: 123,   status: 0},
        ],
      }));

      assert.ok(testUtil.isNotValidJson({
        version: 4,
        pattern: [
          {url: 'sample1', msg: 'sample1', backgroundColor: '111111', displayPosition: 123,      status: 1},
          {url: 'sample2', msg: 'sample2', backgroundColor: '222222', displayPosition: 'bottom', status: 0},
        ],
      }));
    });

    it('import json - error - pattern - displayPosition is empty string', function () {
      assert.ok(testUtil.isNotValidJson({
        version: 4,
        pattern: [
          {url: 'sample1', msg: 'sample1', backgroundColor: '111111', displayPosition: 'top', status: 1},
          {url: 'sample2', msg: 'sample2', backgroundColor: '222222', displayPosition: '',    status: 0},
        ],
      }));

      assert.ok(testUtil.isNotValidJson({
        version: 4,
        pattern: [
          {url: 'sample1', msg: 'sample1', backgroundColor: '111111', displayPosition: '',       status: 1},
          {url: 'sample2', msg: 'sample2', backgroundColor: '222222', displayPosition: 'bottom', status: 0},
        ],
      }));
    });

    it('import json - error - pattern - displayPosition is invalid string', function () {
      assert.ok(testUtil.isNotValidJson({
        version: 4,
        pattern: [
          {url: 'sample1', msg: 'sample1', backgroundColor: '111111', displayPosition: 'top', status: 1},
          {url: 'sample2', msg: 'sample2', backgroundColor: '222222', displayPosition: 'foo', status: 0},
        ],
      }));

      assert.ok(testUtil.isNotValidJson({
        version: 4,
        pattern: [
          {url: 'sample1', msg: 'sample1', backgroundColor: '111111', displayPosition: 'top',    status: 1},
          {url: 'sample2', msg: 'sample2', backgroundColor: '222222', displayPosition: 'Bottom', status: 0},
        ],
      }));

      assert.ok(testUtil.isNotValidJson({
        version: 4,
        pattern: [
          {url: 'sample1', msg: 'sample1', backgroundColor: '111111', displayPosition: 'top',    status: 1},
          {url: 'sample2', msg: 'sample2', backgroundColor: '222222', displayPosition: 'BOTTOM', status: 0},
        ],
      }));

      assert.ok(testUtil.isNotValidJson({
        version: 4,
        pattern: [
          {url: 'sample1', msg: 'sample1', backgroundColor: '111111', displayPosition: 'bar',    status: 1},
          {url: 'sample2', msg: 'sample2', backgroundColor: '222222', displayPosition: 'bottom', status: 0},
        ],
      }));

      assert.ok(testUtil.isNotValidJson({
        version: 4,
        pattern: [
          {url: 'sample1', msg: 'sample1', backgroundColor: '111111', displayPosition: 'Top',    status: 1},
          {url: 'sample2', msg: 'sample2', backgroundColor: '222222', displayPosition: 'bottom', status: 0},
        ],
      }));

      assert.ok(testUtil.isNotValidJson({
        version: 4,
        pattern: [
          {url: 'sample1', msg: 'sample1', backgroundColor: '111111', displayPosition: 'TOP',    status: 1},
          {url: 'sample2', msg: 'sample2', backgroundColor: '222222', displayPosition: 'bottom', status: 0},
        ],
      }));
    });

    it('import json - ok', function () {
      assert.ok(testUtil.isValidJson({
        version: 4,
        pattern: [
          { url: 'sample1', msg: 'sample1', backgroundColor: '111111', displayPosition: 'top',          status: 1 },
          { url: 'sample2', msg: 'sample2', backgroundColor: '222222', displayPosition: 'bottom',       status: 0 },
          { url: 'sample3', msg: 'sample3', backgroundColor: '333333', displayPosition: 'top_left',     status: 1 },
          { url: 'sample4', msg: 'sample4', backgroundColor: '444444', displayPosition: 'top_right',    status: 0 },
          { url: 'sample5', msg: 'sample5', backgroundColor: '555555', displayPosition: 'bottom_left',  status: 1 },
          { url: 'sample6', msg: 'sample6', backgroundColor: '666666', displayPosition: 'bottom_right', status: 0 },
        ],
      }));
    });

    it('import json - ok - no data', function () {
      assert.ok(testUtil.isValidJson({
        version: 4,
        pattern: [],
      }));
    });
  });
});
