const { describe, it } = require('mocha');
const assert = require('assert');
const testUtil = require('../../test_lib/util');

describe('urlNotification.validator.importJson.v1', function() {
  describe('basic structure', function() {
    it('error - argument is an array', function () {
      assert.ok(testUtil.isNotValidJson([]));
    });

    it('error - argument is an object but no keys', function () {
      assert.ok(testUtil.isNotValidJson({}));
    });

    it('error - version is not defined', function () {
      assert.ok(testUtil.isNotValidJson({
        pattern: [
          {url: 'sample1', msg: 'sample1', backgroundColor: '111111'},
        ],
      }));
    });

    it('error - version is null', function () {
      assert.ok(testUtil.isNotValidJson({
        version: null,
        pattern: [
          {url: 'sample1', msg: 'sample1', backgroundColor: '111111'},
        ],
      }));
    });

    it('error - version is true', function () {
      assert.ok(testUtil.isNotValidJson({
        version: true,
        pattern: [
          {url: 'sample1', msg: 'sample1', backgroundColor: '111111'},
        ],
      }));
    });

    it('error - version is false', function () {
      assert.ok(testUtil.isNotValidJson({
        version: false,
        pattern: [
          {url: 'sample1', msg: 'sample1', backgroundColor: '111111'},
        ],
      }));
    });

    it('error - version is string of integer', function () {
      assert.ok(testUtil.isNotValidJson({
        version: '1',
        pattern: [
          {url: 'sample1', msg: 'sample1', backgroundColor: '111111'},
        ],
      }));
    });

    it('error - version is float', function () {
      assert.ok(testUtil.isNotValidJson({
        version: 1.1,
        pattern: [
          {url: 'sample1', msg: 'sample1', backgroundColor: '111111'},
        ],
      }));
    });

    it('error - version is out of range', function () {
      assert.ok(testUtil.isNotValidJson({
        version: 0,
        pattern: [
          {url: 'sample1', msg: 'sample1', backgroundColor: '111111'},
        ],
      }));

      assert.ok(testUtil.isNotValidJson({
        version: 5,
        pattern: [
          {url: 'sample1', msg: 'sample1', backgroundColor: '111111'},
        ],
      }));
    });

    it('error - pattern is not defined', function () {
      assert.ok(testUtil.isNotValidJson({
        version: 1,
      }));
    });

    it('error - pattern is null', function () {
      assert.ok(testUtil.isNotValidJson({
        version: 1,
        pattern: null,
      }));
    });

    it('error - pattern is true', function () {
      assert.ok(testUtil.isNotValidJson({
        version: 1,
        pattern: true,
      }));
    });

    it('error - pattern is false', function () {
      assert.ok(testUtil.isNotValidJson({
        version: 1,
        pattern: false,
      }));
    });

    it('error - pattern is string', function () {
      assert.ok(testUtil.isNotValidJson({
        version: 1,
        pattern: 'dummy',
      }));
    });

    it('error - pattern is not an array of object(s)', function () {
      assert.ok(testUtil.isNotValidJson({
        version: 1,
        pattern: {url: 'sample1', msg: 'sample1', backgroundColor: '111111'},
      }));
    });
  });

  describe('pattern data', function() {
    it('error - url is not defined', function () {
      assert.ok(testUtil.isNotValidJson({
        version: 1,
        pattern: [
          {msg: 'sample2', backgroundColor: '222222' },
        ],
      }));
    });

    it('error - url is null', function () {
      assert.ok(testUtil.isNotValidJson({
        version: 1,
        pattern: [
          {url: null, msg: 'sample2', backgroundColor: '222222'},
        ],
      }));
    });

    it('error - url is true', function () {
      assert.ok(testUtil.isNotValidJson({
        version: 1,
        pattern: [
          {url: true, msg: 'sample2', backgroundColor: '222222'},
        ],
      }));
    });

    it('error - url is false', function () {
      assert.ok(testUtil.isNotValidJson({
        version: 1,
        pattern: [
          {url: false, msg: 'sample2', backgroundColor: '222222'},
        ],
      }));
    });

    it('error - url is number', function () {
      assert.ok(testUtil.isNotValidJson({
        version: 1,
        pattern: [
          {url: 100, msg: 'sample2', backgroundColor: '222222'},
        ],
      }));
    });

    it('error - url is empty string', function () {
      assert.ok(testUtil.isNotValidJson({
        version: 1,
        pattern: [
          {url: '', msg: 'sample2', backgroundColor: '222222'},
        ],
      }));
    });

    it('error - msg is not defined', function () {
      assert.ok(testUtil.isNotValidJson({
        version: 1,
        pattern: [
          {url: 'sample2', backgroundColor: '222222'},
        ],
      }));
    });

    it('error - msg is null', function () {
      assert.ok(testUtil.isNotValidJson({
        version: 1,
        pattern: [
          {url: 'sample2', msg: null, backgroundColor: '222222'},
        ],
      }));
    });

    it('error - msg is true', function () {
      assert.ok(testUtil.isNotValidJson({
        version: 1,
        pattern: [
          {url: 'sample2', msg: true, backgroundColor: '222222'},
        ],
      }));
    });

    it('error - msg is false', function () {
      assert.ok(testUtil.isNotValidJson({
        version: 1,
        pattern: [
          {url: 'sample2', msg: false, backgroundColor: '222222'},
        ],
      }));
    });

    it('error - msg is number', function () {
      assert.ok(testUtil.isNotValidJson({
        version: 1,
        pattern: [
          {url: 'sample2', msg: 100, backgroundColor: '222222'},
        ],
      }));
    });

    it('error - msg is empty string', function () {
      assert.ok(testUtil.isNotValidJson({
        version: 1,
        pattern: [
          {url: 'sample2', msg: '', backgroundColor: '222222'},
        ],
      }));
    });

    it('error - backgroundColor is not defined', function () {
      assert.ok(testUtil.isNotValidJson({
        version: 1,
        pattern: [
          {url: 'sample2', msg: 'sample2'},
        ],
      }));
    });

    it('error - backgroundColor is null', function () {
      assert.ok(testUtil.isNotValidJson({
        version: 1,
        pattern: [
          {url: 'sample2', msg: 'sample2', backgroundColor: null},
        ],
      }));
    });

    it('error - backgroundColor is true', function () {
      assert.ok(testUtil.isNotValidJson({
        version: 1,
        pattern: [
          {url: 'sample2', msg: 'sample2', backgroundColor: true},
        ],
      }));
    });

    it('error - backgroundColor is false', function () {
      assert.ok(testUtil.isNotValidJson({
        version: 1,
        pattern: [
          {url: 'sample2', msg: 'sample2', backgroundColor: false},
        ],
      }));
    });

    it('error - backgroundColor is empty string', function () {
      assert.ok(testUtil.isNotValidJson({
        version: 1,
        pattern: [
          {url: 'sample2', msg: 'sample2', backgroundColor: ''},
        ],
      }));
    });

    it('error - backgroundColor is not hex color', function () {
      assert.ok(testUtil.isNotValidJson({
        version: 1,
        pattern: [
          {url: 'sample2', msg: 'sample2', backgroundColor: '12345z'},
        ],
      }));

      assert.ok(testUtil.isNotValidJson({
        version: 1,
        pattern: [
          {url: 'sample2', msg: 'sample2', backgroundColor: 'black'},
        ],
      }));
    });

    it('ok', function () {
      assert.ok(testUtil.isValidJson({
        version: 1,
        pattern: [
          {url: 'sample1', msg: 'sample1', backgroundColor: '111111'},
          {url: 'sample2', msg: 'sample2', backgroundColor: '000000'},
        ],
      }));
    });

    it('ok - no data', function () {
      assert.ok(testUtil.isValidJson({
        version: 1,
        pattern: [],
      }))
    });
  });
});
