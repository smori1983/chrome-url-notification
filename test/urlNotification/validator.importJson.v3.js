const { describe, it } = require('mocha');
const assert = require('assert');
const testUtil = require('../../test_lib/util');

describe('urlNotification.validator.importJson.v3', function() {
  describe('for basic structure', function() {
    it('import json - error - argument is an array', function () {
      assert.ok(testUtil.isNotValidJson([]));
    });

    it('import json - error - argument is an object but no keys', function () {
      assert.ok(testUtil.isNotValidJson({}));
    });

    it('import json - error - version is not defined', function () {
      assert.ok(testUtil.isNotValidJson({
        pattern: [
          { url: 'sample1', msg: 'sample1', backgroundColor: '111111', displayPosition: 'top', status: 1 },
          { url: 'sample2', msg: 'sample2', backgroundColor: '222222', displayPosition: 'top', status: 1 },
        ],
      }));
    });

    it('import json - error - version is null', function () {
      assert.ok(testUtil.isNotValidJson({
        version: null,
        pattern: [
          { url: 'sample1', msg: 'sample1', backgroundColor: '111111', displayPosition: 'top', status: 1 },
          { url: 'sample2', msg: 'sample2', backgroundColor: '222222', displayPosition: 'top', status: 1 },
        ],
      }));
    });

    it('import json - error - version is true', function () {
      assert.ok(testUtil.isNotValidJson({
        version: true,
        pattern: [
          { url: 'sample1', msg: 'sample1', backgroundColor: '111111', displayPosition: 'top', status: 1 },
          { url: 'sample2', msg: 'sample2', backgroundColor: '222222', displayPosition: 'top', status: 1 },
        ],
      }));
    });

    it('import json - error - version is false', function () {
      assert.ok(testUtil.isNotValidJson({
        version: false,
        pattern: [
          { url: 'sample1', msg: 'sample1', backgroundColor: '111111', displayPosition: 'top', status: 1 },
          { url: 'sample2', msg: 'sample2', backgroundColor: '222222', displayPosition: 'top', status: 1 },
        ],
      }));
    });

    it('import json - error - version is string of integer', function () {
      assert.ok(testUtil.isNotValidJson({
        version: '1',
        pattern: [
          { url: 'sample1', msg: 'sample1', backgroundColor: '111111', displayPosition: 'top', status: 1 },
          { url: 'sample2', msg: 'sample2', backgroundColor: '222222', displayPosition: 'top', status: 1 },
        ],
      }));
    });

    it('import json - error - version is float', function () {
      assert.ok(testUtil.isNotValidJson({
        version: 1.1,
        pattern: [
          { url: 'sample1', msg: 'sample1', backgroundColor: '111111', displayPosition: 'top', status: 1 },
          { url: 'sample2', msg: 'sample2', backgroundColor: '222222', displayPosition: 'top', status: 1 },
        ],
      }));
    });

    it('import json - error - version is out of range', function () {
      assert.ok(testUtil.isNotValidJson({
        version: 0,
        pattern: [
          { url: 'sample1', msg: 'sample1', backgroundColor: '111111', displayPosition: 'top', status: 1 },
          { url: 'sample2', msg: 'sample2', backgroundColor: '222222', displayPosition: 'top', status: 1 },
        ],
      }));

      assert.ok(testUtil.isNotValidJson({
        version: 4,
        pattern: [
          { url: 'sample1', msg: 'sample1', backgroundColor: '111111', displayPosition: 'top', status: 1 },
          { url: 'sample2', msg: 'sample2', backgroundColor: '222222', displayPosition: 'top', status: 1 },
        ],
      }));
    });

    it('import json - error - pattern is not defined', function () {
      assert.ok(testUtil.isNotValidJson({
        version: 3,
      }));
    });

    it('import json - error - pattern is null', function () {
      assert.ok(testUtil.isNotValidJson({
        version: 3,
        pattern: null,
      }));
    });

    it('import json - error - pattern is true', function () {
      assert.ok(testUtil.isNotValidJson({
        version: 3,
        pattern: true,
      }));
    });

    it('import json - error - pattern is false', function () {
      assert.ok(testUtil.isNotValidJson({
        version: 3,
        pattern: false,
      }));
    });

    it('import json - error - pattern is string', function () {
      assert.ok(testUtil.isNotValidJson({
        version: 3,
        pattern: 'dummy',
      }));
    });

    it('import json - error - pattern is not an array of object(s)', function () {
      assert.ok(testUtil.isNotValidJson({
        version: 3,
        pattern: { url: 'sample1', msg: 'sample1', backgroundColor: '111111', displayPosition: 'top', status: 1 },
      }));
    });
  });

  describe('for pattern data', function() {
    // TODO add tests

    it('import json - error - pattern - status is not defined', function () {
      assert.ok(testUtil.isNotValidJson({
        version: 3,
        pattern: [
          { url: 'sample1', msg: 'sample1', backgroundColor: '111111', displayPosition: 'top', status: 1 },
          { url: 'sample2', msg: 'sample2', backgroundColor: '222222', displayPosition: 'top' },
        ],
      }));

      assert.ok(testUtil.isNotValidJson({
        version: 3,
        pattern: [
          { url: 'sample1', msg: 'sample1', backgroundColor: '111111', displayPosition: 'top' },
          { url: 'sample2', msg: 'sample2', backgroundColor: '222222', displayPosition: 'top', status: 0 },
        ],
      }));
    });

    it('import json - error - pattern - status is null', function () {
      assert.ok(testUtil.isNotValidJson({
        version: 3,
        pattern: [
          { url: 'sample1', msg: 'sample1', backgroundColor: '111111', displayPosition: 'top', status: 1 },
          { url: 'sample2', msg: 'sample2', backgroundColor: '222222', displayPosition: 'top', status: null },
        ],
      }));

      assert.ok(testUtil.isNotValidJson({
        version: 3,
        pattern: [
          { url: 'sample1', msg: 'sample1', backgroundColor: '111111', displayPosition: 'top', status: null },
          { url: 'sample2', msg: 'sample2', backgroundColor: '222222', displayPosition: 'top', status: 0 },
        ],
      }));
    });

    it('import json - error - pattern - status is true', function () {
      assert.ok(testUtil.isNotValidJson({
        version: 3,
        pattern: [
          { url: 'sample1', msg: 'sample1', backgroundColor: '111111', displayPosition: 'top', status: 1 },
          { url: 'sample2', msg: 'sample2', backgroundColor: '222222', displayPosition: 'top', status: true },
        ],
      }));

      assert.ok(testUtil.isNotValidJson({
        version: 3,
        pattern: [
          { url: 'sample1', msg: 'sample1', backgroundColor: '111111', displayPosition: 'top', status: true },
          { url: 'sample2', msg: 'sample2', backgroundColor: '222222', displayPosition: 'top', status: 0 },
        ],
      }));
    });

    it('import json - error - pattern - status is false', function () {
      assert.ok(testUtil.isNotValidJson({
        version: 3,
        pattern: [
          { url: 'sample1', msg: 'sample1', backgroundColor: '111111', displayPosition: 'top', status: 1 },
          { url: 'sample2', msg: 'sample2', backgroundColor: '222222', displayPosition: 'top', status: false },
        ],
      }));

      assert.ok(testUtil.isNotValidJson({
        version: 3,
        pattern: [
          { url: 'sample1', msg: 'sample1', backgroundColor: '111111', displayPosition: 'top', status: false },
          { url: 'sample2', msg: 'sample2', backgroundColor: '222222', displayPosition: 'top', status: 0 },
        ],
      }));
    });

    it('import json - error - pattern - status is empty string', function () {
      assert.ok(testUtil.isNotValidJson({
        version: 3,
        pattern: [
          { url: 'sample1', msg: 'sample1', backgroundColor: '111111', displayPosition: 'top', status: 1 },
          { url: 'sample2', msg: 'sample2', backgroundColor: '222222', displayPosition: 'top', status: '' },
        ],
      }));

      assert.ok(testUtil.isNotValidJson({
        version: 3,
        pattern: [
          { url: 'sample1', msg: 'sample1', backgroundColor: '111111', displayPosition: 'top', status: '' },
          { url: 'sample2', msg: 'sample2', backgroundColor: '222222', displayPosition: 'top', status: 0 },
        ],
      }));
    });

    it('import json - error - pattern - status is string of integer', function () {
      assert.ok(testUtil.isNotValidJson({
        version: 3,
        pattern: [
          { url: 'sample1', msg: 'sample1', backgroundColor: '111111', displayPosition: 'top', status: '1' },
          { url: 'sample2', msg: 'sample2', backgroundColor: '222222', displayPosition: 'top', status: 0 },
        ],
      }));

      assert.ok(testUtil.isNotValidJson({
        version: 3,
        pattern: [
          { url: 'sample1', msg: 'sample1', backgroundColor: '111111', displayPosition: 'top', status: 1 },
          { url: 'sample2', msg: 'sample2', backgroundColor: '222222', displayPosition: 'top', status: '0' },
        ],
      }));
    });

    it('import json - error - pattern - status is float', function () {
      assert.ok(testUtil.isNotValidJson({
        version: 3,
        pattern: [
          { url: 'sample1', msg: 'sample1', backgroundColor: '111111', displayPosition: 'top', status: 1.1 },
          { url: 'sample2', msg: 'sample2', backgroundColor: '222222', displayPosition: 'top', status: 0 },
        ],
      }));

      assert.ok(testUtil.isNotValidJson({
        version: 3,
        pattern: [
          { url: 'sample1', msg: 'sample1', backgroundColor: '111111', displayPosition: 'top', status: 1 },
          { url: 'sample2', msg: 'sample2', backgroundColor: '222222', displayPosition: 'top', status: 0.1 },
        ],
      }));
    });

    it('import json - error - pattern - status is invalid integer', function () {
      assert.ok(testUtil.isNotValidJson({
        version: 3,
        pattern: [
          { url: 'sample1', msg: 'sample1', backgroundColor: '111111', displayPosition: 'top', status: 2 },
          { url: 'sample2', msg: 'sample2', backgroundColor: '222222', displayPosition: 'top', status: 0 },
        ],
      }));

      assert.ok(testUtil.isNotValidJson({
        version: 3,
        pattern: [
          { url: 'sample1', msg: 'sample1', backgroundColor: '111111', displayPosition: 'top', status: 1 },
          { url: 'sample2', msg: 'sample2', backgroundColor: '222222', displayPosition: 'top', status: -1 },
        ],
      }));
    });

    it('import json - ok', function () {
      assert.ok(testUtil.isValidJson({
        version: 3,
        pattern: [
          { url: 'sample1', msg: 'sample1', backgroundColor: '111111', displayPosition: 'top', status: 1 },
          { url: 'sample2', msg: 'sample2', backgroundColor: '222222', displayPosition: 'top', status: 0 },
        ],
      }));

      assert.ok(testUtil.isValidJson({
        version: 3,
        pattern: [
          { url: 'sample1', msg: 'sample1', backgroundColor: '111111', displayPosition: 'top', status: 0 },
          { url: 'sample2', msg: 'sample2', backgroundColor: '222222', displayPosition: 'top', status: 1 },
        ],
      }));
    });

    it('import json - ok - no data', function () {
      assert.ok(testUtil.isValidJson({
        version: 3,
        pattern: [],
      }));
    });
  });
});
