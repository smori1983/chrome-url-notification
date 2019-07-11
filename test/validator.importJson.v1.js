const describe = require('mocha').describe;
const it = require('mocha').it;
const assert = require('assert');
const testUtil = require('../test_lib/util');

describe('urlNotification.validator.importJson.v1', function() {
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
          { url: 'sample1', msg: 'sample1', backgroundColor: '111111' },
          { url: 'sample2', msg: 'sample2', backgroundColor: '222222' },
        ],
      }));
    });

    it('import json - error - version is null', function () {
      assert.ok(testUtil.isNotValidJson({
        version: null,
        pattern: [
          { url: 'sample1', msg: 'sample1', backgroundColor: '111111' },
          { url: 'sample2', msg: 'sample2', backgroundColor: '222222' },
        ],
      }));
    });

    it('import json - error - version is true', function () {
      assert.ok(testUtil.isNotValidJson({
        version: true,
        pattern: [
          { url: 'sample1', msg: 'sample1', backgroundColor: '111111' },
          { url: 'sample2', msg: 'sample2', backgroundColor: '222222' },
        ],
      }));
    });

    it('import json - error - version is false', function () {
      assert.ok(testUtil.isNotValidJson({
        version: false,
        pattern: [
          { url: 'sample1', msg: 'sample1', backgroundColor: '111111' },
          { url: 'sample2', msg: 'sample2', backgroundColor: '222222' },
        ],
      }));
    });

    it('import json - error - version is string of integer', function () {
      assert.ok(testUtil.isNotValidJson({
        version: '1',
        pattern: [
          { url: 'sample1', msg: 'sample1', backgroundColor: '111111' },
          { url: 'sample2', msg: 'sample2', backgroundColor: '222222' },
        ],
      }));
    });

    it('import json - error - version is float', function () {
      assert.ok(testUtil.isNotValidJson({
        version: 1.1,
        pattern: [
          { url: 'sample1', msg: 'sample1', backgroundColor: '111111' },
          { url: 'sample2', msg: 'sample2', backgroundColor: '222222' },
        ],
      }));
    });

    it('import json - error - version is out of range', function () {
      assert.ok(testUtil.isNotValidJson({
        version: 0,
        pattern: [
          { url: 'sample1', msg: 'sample1', backgroundColor: '111111' },
          { url: 'sample2', msg: 'sample2', backgroundColor: '222222' },
        ],
      }));

      assert.ok(testUtil.isNotValidJson({
        version: 4,
        pattern: [
          { url: 'sample1', msg: 'sample1', backgroundColor: '111111' },
          { url: 'sample2', msg: 'sample2', backgroundColor: '222222' },
        ],
      }));
    });

    it('import json - error - pattern is not defined', function () {
      assert.ok(testUtil.isNotValidJson({
        version: 1,
      }));
    });

    it('import json - error - pattern is null', function () {
      assert.ok(testUtil.isNotValidJson({
        version: 1,
        pattern: null,
      }));
    });

    it('import json - error - pattern is true', function () {
      assert.ok(testUtil.isNotValidJson({
        version: 1,
        pattern: true,
      }));
    });

    it('import json - error - pattern is false', function () {
      assert.ok(testUtil.isNotValidJson({
        version: 1,
        pattern: false,
      }));
    });

    it('import json - error - pattern is string', function () {
      assert.ok(testUtil.isNotValidJson({
        version: 1,
        pattern: 'dummy',
      }));
    });

    it('import json - error - pattern is not an array of object(s)', function () {
      assert.ok(testUtil.isNotValidJson({
        version: 1,
        pattern: { url: 'sample1', msg: 'sample1', backgroundColor: '111111' },
      }));
    });
  });

  describe('for pattern data', function() {
    it('import json - error - pattern - url is not defined', function () {
      assert.ok(testUtil.isNotValidJson({
        version: 1,
        pattern: [
          { url: 'sample1', msg: 'sample1', backgroundColor: '111111' },
          {                 msg: 'sample2', backgroundColor: '222222' },
        ],
      }));

      assert.ok(testUtil.isNotValidJson({
        version: 1,
        pattern: [
          {                 msg: 'sample1', backgroundColor: '111111' },
          { url: 'sample2', msg: 'sample2', backgroundColor: '222222' },
        ],
      }));
    });

    it('import json - error - pattern - url is null', function () {
      assert.ok(testUtil.isNotValidJson({
        version: 1,
        pattern: [
          { url: 'sample1', msg: 'sample1', backgroundColor: '111111' },
          { url: null,      msg: 'sample2', backgroundColor: '222222' },
        ],
      }));

      assert.ok(testUtil.isNotValidJson({
        version: 1,
        pattern: [
          { url: null,      msg: 'sample1', backgroundColor: '111111' },
          { url: 'sample2', msg: 'sample2', backgroundColor: '222222' },
        ],
      }));
    });

    it('import json - error - pattern - url is true', function () {
      assert.ok(testUtil.isNotValidJson({
        version: 1,
        pattern: [
          { url: 'sample1', msg: 'sample1', backgroundColor: '111111' },
          { url: true,      msg: 'sample2', backgroundColor: '222222' },
        ],
      }));

      assert.ok(testUtil.isNotValidJson({
        version: 1,
        pattern: [
          { url: true, msg: 'sample1', backgroundColor: '111111' },
          { url: 'sample2', msg: 'sample2', backgroundColor: '222222' },
        ],
      }));
    });

    it('import json - error - pattern - url is false', function () {
      assert.ok(testUtil.isNotValidJson({
        version: 1,
        pattern: [
          { url: 'sample1', msg: 'sample1', backgroundColor: '111111' },
          { url: false, msg: 'sample2', backgroundColor: '222222' },
        ],
      }));

      assert.ok(testUtil.isNotValidJson({
        version: 1,
        pattern: [
          { url: false,     msg: 'sample1', backgroundColor: '111111' },
          { url: 'sample2', msg: 'sample2', backgroundColor: '222222' },
        ],
      }));
    });

    it('import json - error - pattern - url is number', function () {
      assert.ok(testUtil.isNotValidJson({
        version: 1,
        pattern: [
          { url: 'sample1', msg: 'sample1', backgroundColor: '111111' },
          { url: 100,       msg: 'sample2', backgroundColor: '222222' },
        ],
      }));

      assert.ok(testUtil.isNotValidJson({
        version: 1,
        pattern: [
          { url: 100,       msg: 'sample1', backgroundColor: '111111' },
          { url: 'sample2', msg: 'sample2', backgroundColor: '222222' },
        ],
      }));
    });

    it('import json - error - pattern - url is empty string', function () {
      assert.ok(testUtil.isNotValidJson({
        version: 1,
        pattern: [
          { url: 'sample1', msg: 'sample1', backgroundColor: '111111' },
          { url: '',        msg: 'sample2', backgroundColor: '222222' },
        ],
      }));

      assert.ok(testUtil.isNotValidJson({
        version: 1,
        pattern: [
          { url: '',        msg: 'sample1', backgroundColor: '111111' },
          { url: 'sample2', msg: 'sample2', backgroundColor: '222222' },
        ],
      }));
    });

    it('import json - error - pattern - msg is not defined', function () {
      assert.ok(testUtil.isNotValidJson({
        version: 1,
        pattern: [
          { url: 'sample1', msg: 'sample1', backgroundColor: '111111' },
          { url: 'sample2',                 backgroundColor: '222222' },
        ],
      }));

      assert.ok(testUtil.isNotValidJson({
        version: 1,
        pattern: [
          { url: 'sample1',                 backgroundColor: '111111' },
          { url: 'sample2', msg: 'sample2', backgroundColor: '222222' },
        ],
      }));
    });

    it('import json - error - pattern - msg is null', function () {
      assert.ok(testUtil.isNotValidJson({
        version: 1,
        pattern: [
          { url: 'sample1', msg: 'sample1', backgroundColor: '111111' },
          { url: 'sample2', msg: null,      backgroundColor: '222222' },
        ],
      }));

      assert.ok(testUtil.isNotValidJson({
        version: 1,
        pattern: [
          { url: 'sample1', msg: null,      backgroundColor: '111111' },
          { url: 'sample2', msg: 'sample2', backgroundColor: '222222' },
        ],
      }));
    });

    it('import json - error - pattern - msg is true', function () {
      assert.ok(testUtil.isNotValidJson({
        version: 1,
        pattern: [
          { url: 'sample1', msg: 'sample1', backgroundColor: '111111' },
          { url: 'sample2', msg: true,      backgroundColor: '222222' },
        ],
      }));

      assert.ok(testUtil.isNotValidJson({
        version: 1,
        pattern: [
          { url: 'sample1', msg: true,      backgroundColor: '111111' },
          { url: 'sample2', msg: 'sample2', backgroundColor: '222222' },
        ],
      }));
    });

    it('import json - error - pattern - msg is false', function () {
      assert.ok(testUtil.isNotValidJson({
        version: 1,
        pattern: [
          { url: 'sample1', msg: 'sample1', backgroundColor: '111111' },
          { url: 'sample2', msg: false,     backgroundColor: '222222' },
        ],
      }));

      assert.ok(testUtil.isNotValidJson({
        version: 1,
        pattern: [
          { url: 'sample1', msg: false,     backgroundColor: '111111' },
          { url: 'sample2', msg: 'sample2', backgroundColor: '222222' },
        ],
      }));
    });

    it('import json - error - pattern - msg is number', function () {
      assert.ok(testUtil.isNotValidJson({
        version: 1,
        pattern: [
          { url: 'sample1', msg: 'sample1', backgroundColor: '111111' },
          { url: 'sample2', msg: 100,       backgroundColor: '222222' },
        ],
      }));

      assert.ok(testUtil.isNotValidJson({
        version: 1,
        pattern: [
          { url: 'sample1', msg: 100,       backgroundColor: '111111' },
          { url: 'sample2', msg: 'sample2', backgroundColor: '222222' },
        ],
      }));
    });

    it('import json - error - pattern - msg is empty string', function () {
      assert.ok(testUtil.isNotValidJson({
        version: 1,
        pattern: [
          { url: 'sample1', msg: 'sample1', backgroundColor: '111111' },
          { url: 'sample2', msg: '',        backgroundColor: '222222' },
        ],
      }));

      assert.ok(testUtil.isNotValidJson({
        version: 1,
        pattern: [
          { url: 'sample1', msg: '',        backgroundColor: '111111' },
          { url: 'sample2', msg: 'sample2', backgroundColor: '222222' },
        ],
      }));
    });

    it('import json - error - pattern - backgroundColor is not defined', function () {
      assert.ok(testUtil.isNotValidJson({
        version: 1,
        pattern: [
          { url: 'sample1', msg: 'sample1', backgroundColor: '111111' },
          { url: 'sample2', msg: 'sample2' },
        ],
      }));

      assert.ok(testUtil.isNotValidJson({
        version: 1,
        pattern: [
          { url: 'sample1', msg: 'sample1' },
          { url: 'sample2', msg: 'sample2', backgroundColor: '222222' },
        ],
      }));
    });

    it('import json - error - pattern - backgroundColor is null', function () {
      assert.ok(testUtil.isNotValidJson({
        version: 1,
        pattern: [
          { url: 'sample1', msg: 'sample1', backgroundColor: '111111' },
          { url: 'sample2', msg: 'sample2', backgroundColor: null },
        ],
      }));

      assert.ok(testUtil.isNotValidJson({
        version: 1,
        pattern: [
          { url: 'sample1', msg: 'sample1', backgroundColor: null },
          { url: 'sample2', msg: 'sample2', backgroundColor: '222222' },
        ],
      }));
    });

    it('import json - error - pattern - backgroundColor is true', function () {
      assert.ok(testUtil.isNotValidJson({
        version: 1,
        pattern: [
          { url: 'sample1', msg: 'sample1', backgroundColor: '111111' },
          { url: 'sample2', msg: 'sample2', backgroundColor: true },
        ],
      }));

      assert.ok(testUtil.isNotValidJson({
        version: 1,
        pattern: [
          { url: 'sample1', msg: 'sample1', backgroundColor: true },
          { url: 'sample2', msg: 'sample2', backgroundColor: '222222' },
        ],
      }));
    });

    it('import json - error - pattern - backgroundColor is false', function () {
      assert.ok(testUtil.isNotValidJson({
        version: 1,
        pattern: [
          { url: 'sample1', msg: 'sample1', backgroundColor: '111111' },
          { url: 'sample2', msg: 'sample2', backgroundColor: false },
        ],
      }));

      assert.ok(testUtil.isNotValidJson({
        version: 1,
        pattern: [
          { url: 'sample1', msg: 'sample1', backgroundColor: false },
          { url: 'sample2', msg: 'sample2', backgroundColor: '222222' },
        ],
      }));
    });

    it('import json - error - pattern - backgroundColor is empty string', function () {
      assert.ok(testUtil.isNotValidJson({
        version: 1,
        pattern: [
          { url: 'sample1', msg: 'sample1', backgroundColor: '111111' },
          { url: 'sample2', msg: 'sample2', backgroundColor: '' },
        ],
      }));

      assert.ok(testUtil.isNotValidJson({
        version: 1,
        pattern: [
          { url: 'sample1', msg: 'sample1', backgroundColor: '' },
          { url: 'sample2', msg: 'sample2', backgroundColor: '222222' },
        ],
      }));
    });

    it('import json - error - pattern - backgroundColor is not hex color', function () {
      assert.ok(testUtil.isNotValidJson({
        version: 1,
        pattern: [
          { url: 'sample1', msg: 'sample1', backgroundColor: '111111' },
          { url: 'sample2', msg: 'sample2', backgroundColor: '12345z' },
        ],
      }));

      assert.ok(testUtil.isNotValidJson({
        version: 1,
        pattern: [
          { url: 'sample1', msg: 'sample1', backgroundColor: '111111' },
          { url: 'sample2', msg: 'sample2', backgroundColor: 'black' },
        ],
      }));

      assert.ok(testUtil.isNotValidJson({
        version: 1,
        pattern: [
          { url: 'sample1', msg: 'sample1', backgroundColor: '12345z' },
          { url: 'sample2', msg: 'sample2', backgroundColor: '222222' },
        ],
      }));

      assert.ok(testUtil.isNotValidJson({
        version: 1,
        pattern: [
          { url: 'sample1', msg: 'sample1', backgroundColor: 'black' },
          { url: 'sample2', msg: 'sample2', backgroundColor: '222222' },
        ],
      }));
    });

    it('import json - ok', function () {
      assert.ok(testUtil.isValidJson({
        version: 1,
        pattern: [
          { url: 'sample1', msg: 'sample1', backgroundColor: '111111' },
          { url: 'sample2', msg: 'sample2', backgroundColor: '000000' },
        ],
      }));

      assert.ok(testUtil.isValidJson({
        version: 1,
        pattern: [
          { url: 'sample1', msg: 'sample1', backgroundColor: '111111' },
          { url: 'sample2', msg: 'sample2', backgroundColor: 'ffffff' },
        ],
      }));
    });

    it('import json - ok - no data', function () {
      assert.ok(testUtil.isValidJson({
        version: 1,
        pattern: [],
      }))
    });
  });
});
