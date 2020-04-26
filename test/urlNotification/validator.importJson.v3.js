const { describe, it } = require('mocha');
const assert = require('assert');
const testUtil = require('../../test_lib/util');

describe('urlNotification.validator.importJson.v3', function() {
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
          {url: 'sample1', msg: 'sample1', backgroundColor: '111111', displayPosition: 'top', status: 1},
        ],
      }));
    });

    it('error - version is null', function () {
      assert.ok(testUtil.isNotValidJson({
        version: null,
        pattern: [
          {url: 'sample1', msg: 'sample1', backgroundColor: '111111', displayPosition: 'top', status: 1},
        ],
      }));
    });

    it('error - version is true', function () {
      assert.ok(testUtil.isNotValidJson({
        version: true,
        pattern: [
          {url: 'sample1', msg: 'sample1', backgroundColor: '111111', displayPosition: 'top', status: 1},
        ],
      }));
    });

    it('error - version is false', function () {
      assert.ok(testUtil.isNotValidJson({
        version: false,
        pattern: [
          {url: 'sample1', msg: 'sample1', backgroundColor: '111111', displayPosition: 'top', status: 1},
        ],
      }));
    });

    it('error - version is string of integer', function () {
      assert.ok(testUtil.isNotValidJson({
        version: '1',
        pattern: [
          {url: 'sample1', msg: 'sample1', backgroundColor: '111111', displayPosition: 'top', status: 1},
        ],
      }));
    });

    it('error - version is float', function () {
      assert.ok(testUtil.isNotValidJson({
        version: 1.1,
        pattern: [
          {url: 'sample1', msg: 'sample1', backgroundColor: '111111', displayPosition: 'top', status: 1},
        ],
      }));
    });

    it('error - version is out of range', function () {
      assert.ok(testUtil.isNotValidJson({
        version: 0,
        pattern: [
          {url: 'sample1', msg: 'sample1', backgroundColor: '111111', displayPosition: 'top', status: 1},
        ],
      }));

      assert.ok(testUtil.isNotValidJson({
        version: 5,
        pattern: [
          {url: 'sample1', msg: 'sample1', backgroundColor: '111111', displayPosition: 'top', status: 1},
        ],
      }));
    });

    it('error - pattern is not defined', function () {
      assert.ok(testUtil.isNotValidJson({
        version: 3,
      }));
    });

    it('error - pattern is null', function () {
      assert.ok(testUtil.isNotValidJson({
        version: 3,
        pattern: null,
      }));
    });

    it('error - pattern is true', function () {
      assert.ok(testUtil.isNotValidJson({
        version: 3,
        pattern: true,
      }));
    });

    it('error - pattern is false', function () {
      assert.ok(testUtil.isNotValidJson({
        version: 3,
        pattern: false,
      }));
    });

    it('error - pattern is string', function () {
      assert.ok(testUtil.isNotValidJson({
        version: 3,
        pattern: 'dummy',
      }));
    });

    it('error - pattern is not an array of object(s)', function () {
      assert.ok(testUtil.isNotValidJson({
        version: 3,
        pattern: {url: 'sample1', msg: 'sample1', backgroundColor: '111111', displayPosition: 'top', status: 1},
      }));
    });
  });

  describe('pattern data', function() {
    // TODO add tests

    it('error - displayPosition values supported since v4 are invalid in v3', function () {
      assert.ok(testUtil.isNotValidJson({
        version: 3,
        pattern: [
          {url: 'sample1', msg: 'sample1', backgroundColor: '111111', displayPosition: 'top_left', status: 1},
        ],
      }));

      assert.ok(testUtil.isNotValidJson({
        version: 3,
        pattern: [
          {url: 'sample1', msg: 'sample1', backgroundColor: '111111', displayPosition: 'top_right', status: 1},
        ],
      }));

      assert.ok(testUtil.isNotValidJson({
        version: 3,
        pattern: [
          {url: 'sample1', msg: 'sample1', backgroundColor: '111111', displayPosition: 'bottom_left', status: 1},
        ],
      }));

      assert.ok(testUtil.isNotValidJson({
        version: 3,
        pattern: [
          {url: 'sample1', msg: 'sample1', backgroundColor: '111111', displayPosition: 'bottom_right', status: 1},
        ],
      }));
    });

    it('error - status is not defined', function () {
      assert.ok(testUtil.isNotValidJson({
        version: 3,
        pattern: [
          {url: 'sample2', msg: 'sample2', backgroundColor: '222222', displayPosition: 'top'},
        ],
      }));
    });

    it('error - status is null', function () {
      assert.ok(testUtil.isNotValidJson({
        version: 3,
        pattern: [
          {url: 'sample1', msg: 'sample1', backgroundColor: '111111', displayPosition: 'top', status: null},
        ],
      }));
    });

    it('error - status is true', function () {
      assert.ok(testUtil.isNotValidJson({
        version: 3,
        pattern: [
          {url: 'sample1', msg: 'sample1', backgroundColor: '111111', displayPosition: 'top', status: true},
        ],
      }));
    });

    it('error - status is false', function () {
      assert.ok(testUtil.isNotValidJson({
        version: 3,
        pattern: [
          {url: 'sample1', msg: 'sample1', backgroundColor: '111111', displayPosition: 'top', status: false},
        ],
      }));
    });

    it('error - status is empty string', function () {
      assert.ok(testUtil.isNotValidJson({
        version: 3,
        pattern: [
          {url: 'sample1', msg: 'sample1', backgroundColor: '111111', displayPosition: 'top', status: ''},
        ],
      }));
    });

    it('error - status is string of integer', function () {
      assert.ok(testUtil.isNotValidJson({
        version: 3,
        pattern: [
          {url: 'sample1', msg: 'sample1', backgroundColor: '111111', displayPosition: 'top', status: '1'},
        ],
      }));
    });

    it('error - status is float', function () {
      assert.ok(testUtil.isNotValidJson({
        version: 3,
        pattern: [
          {url: 'sample1', msg: 'sample1', backgroundColor: '111111', displayPosition: 'top', status: 1.1},
        ],
      }));
    });

    it('error - status is invalid integer', function () {
      assert.ok(testUtil.isNotValidJson({
        version: 3,
        pattern: [
          {url: 'sample1', msg: 'sample1', backgroundColor: '111111', displayPosition: 'top', status: 2},
        ],
      }));

      assert.ok(testUtil.isNotValidJson({
        version: 3,
        pattern: [
          {url: 'sample1', msg: 'sample1', backgroundColor: '111111', displayPosition: 'top', status: -1},
        ],
      }));
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
