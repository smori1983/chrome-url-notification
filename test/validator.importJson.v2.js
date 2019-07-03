const describe = require('mocha').describe;
const beforeEach = require('mocha').beforeEach;
const it = require('mocha').it;
const assert = require('assert');
const urlNotification = require('../src/js/urlNotification/main');

describe('urlNotification.validator.importJson.v2', function() {
  beforeEach(function () {
    this.isValid = function (json) {
      return urlNotification.validator.forImportJson(json) === true;
    };
    this.isInvalid = function (json) {
      return urlNotification.validator.forImportJson(json) === false;
    };
  });

  describe('for basic structure', function() {
    it('import json - error - argument is an array', function () {
      assert.ok(this.isInvalid([]));
    });

    it('import json - error - argument is an object but no keys', function () {
      assert.ok(this.isInvalid({}));
    });

    it('import json - error - version is not defined', function () {
      assert.ok(this.isInvalid({
        pattern: [
          { url: 'sample1', msg: 'sample1', backgroundColor: '111111', displayPosition: 'top' },
          { url: 'sample2', msg: 'sample2', backgroundColor: '222222', displayPosition: 'top' },
        ],
      }));
    });

    it('import json - error - version is null', function () {
      assert.ok(this.isInvalid({
        version: null,
        pattern: [
          { url: 'sample1', msg: 'sample1', backgroundColor: '111111', displayPosition: 'top' },
          { url: 'sample2', msg: 'sample2', backgroundColor: '222222', displayPosition: 'top' },
        ],
      }));
    });

    it('import json - error - version is true', function () {
      assert.ok(this.isInvalid({
        version: true,
        pattern: [
          { url: 'sample1', msg: 'sample1', backgroundColor: '111111', displayPosition: 'top' },
          { url: 'sample2', msg: 'sample2', backgroundColor: '222222', displayPosition: 'top' },
        ],
      }));
    });

    it('import json - error - version is false', function () {
      assert.ok(this.isInvalid({
        version: false,
        pattern: [
          { url: 'sample1', msg: 'sample1', backgroundColor: '111111', displayPosition: 'top' },
          { url: 'sample2', msg: 'sample2', backgroundColor: '222222', displayPosition: 'top' },
        ],
      }));
    });

    it('import json - error - version is string of integer', function () {
      assert.ok(this.isInvalid({
        version: '1',
        pattern: [
          { url: 'sample1', msg: 'sample1', backgroundColor: '111111', displayPosition: 'top' },
          { url: 'sample2', msg: 'sample2', backgroundColor: '222222', displayPosition: 'top' },
        ],
      }));
    });

    it('import json - error - version is float', function () {
      assert.ok(this.isInvalid({
        version: 1.1,
        pattern: [
          { url: 'sample1', msg: 'sample1', backgroundColor: '111111', displayPosition: 'top' },
          { url: 'sample2', msg: 'sample2', backgroundColor: '222222', displayPosition: 'top' },
        ],
      }));
    });

    it('import json - error - version is out of range', function () {
      assert.ok(this.isInvalid({
        version: 0,
        pattern: [
          { url: 'sample1', msg: 'sample1', backgroundColor: '111111', displayPosition: 'top' },
          { url: 'sample2', msg: 'sample2', backgroundColor: '222222', displayPosition: 'top' },
        ],
      }));

      assert.ok(this.isInvalid({
        version: 4,
        pattern: [
          { url: 'sample1', msg: 'sample1', backgroundColor: '111111', displayPosition: 'top' },
          { url: 'sample2', msg: 'sample2', backgroundColor: '222222', displayPosition: 'top' },
        ],
      }));
    });

    it('import json - error - pattern is not defined', function () {
      assert.ok(this.isInvalid({
        version: 2,
      }));
    });

    it('import json - error - pattern is null', function () {
      assert.ok(this.isInvalid({
        version: 2,
        pattern: null,
      }));
    });

    it('import json - error - pattern is true', function () {
      assert.ok(this.isInvalid({
        version: 2,
        pattern: true,
      }));
    });

    it('import json - error - pattern is false', function () {
      assert.ok(this.isInvalid({
        version: 2,
        pattern: false,
      }));
    });

    it('import json - error - pattern is string', function () {
      assert.ok(this.isInvalid({
        version: 2,
        pattern: 'dummy',
      }));
    });

    it('import json - error - pattern is not an array of object(s)', function () {
      assert.ok(this.isInvalid({
        version: 2,
        pattern: { url: 'sample1', msg: 'sample1', backgroundColor: '111111', displayPosition: 'top' },
      }));
    });
  });

  describe('for pattern data', function() {
    it('import json - error - pattern - url is not defined', function () {
      assert.ok(this.isInvalid({
        version: 2,
        pattern: [
          { url: 'sample1', msg: 'sample1', backgroundColor: '111111', displayPosition: 'bottom' },
          {                 msg: 'sample2', backgroundColor: '222222', displayPosition: 'top' },
        ],
      }));

      assert.ok(this.isInvalid({
        version: 2,
        pattern: [
          {                 msg: 'sample1', backgroundColor: '111111', displayPosition: 'bottom' },
          { url: 'sample2', msg: 'sample2', backgroundColor: '222222', displayPosition: 'top' },
        ],
      }));
    });

    it('import json - error - pattern - url is null', function () {
      assert.ok(this.isInvalid({
        version: 2,
        pattern: [
          { url: 'sample1', msg: 'sample1', backgroundColor: '111111', displayPosition: 'bottom' },
          { url: null,      msg: 'sample2', backgroundColor: '222222', displayPosition: 'top' },
        ],
      }));

      assert.ok(this.isInvalid({
        version: 2,
        pattern: [
          { url: null,      msg: 'sample1', backgroundColor: '111111', displayPosition: 'bottom' },
          { url: 'sample2', msg: 'sample2', backgroundColor: '222222', displayPosition: 'top' },
        ],
      }));
    });

    it('import json - error - pattern - url is true', function () {
      assert.ok(this.isInvalid({
        version: 2,
        pattern: [
          { url: 'sample1', msg: 'sample1', backgroundColor: '111111', displayPosition: 'bottom' },
          { url: true,      msg: 'sample2', backgroundColor: '222222', displayPosition: 'top' },
        ],
      }));

      assert.ok(this.isInvalid({
        version: 2,
        pattern: [
          { url: true,      msg: 'sample1', backgroundColor: '111111', displayPosition: 'bottom' },
          { url: 'sample2', msg: 'sample2', backgroundColor: '222222', displayPosition: 'top' },
        ],
      }));
    });

    it('import json - error - pattern - url is false', function () {
      assert.ok(this.isInvalid({
        version: 2,
        pattern: [
          { url: 'sample1', msg: 'sample1', backgroundColor: '111111', displayPosition: 'bottom' },
          { url: false,     msg: 'sample2', backgroundColor: '222222', displayPosition: 'top' },
        ],
      }));

      assert.ok(this.isInvalid({
        version: 2,
        pattern: [
          { url: false,     msg: 'sample1', backgroundColor: '111111', displayPosition: 'bottom' },
          { url: 'sample2', msg: 'sample2', backgroundColor: '222222', displayPosition: 'top' },
        ],
      }));
    });

    it('import json - error - pattern - url is number', function () {
      assert.ok(this.isInvalid({
        version: 2,
        pattern: [
          { url: 'sample1', msg: 'sample1', backgroundColor: '111111', displayPosition: 'bottom' },
          { url: 100,       msg: 'sample2', backgroundColor: '222222', displayPosition: 'top' },
        ],
      }));

      assert.ok(this.isInvalid({
        version: 2,
        pattern: [
          { url: 100,       msg: 'sample1', backgroundColor: '111111', displayPosition: 'bottom' },
          { url: 'sample2', msg: 'sample2', backgroundColor: '222222', displayPosition: 'top' },
        ],
      }));
    });

    it('import json - error - pattern - url is empty string', function () {
      assert.ok(this.isInvalid({
        version: 2,
        pattern: [
          { url: 'sample1', msg: 'sample1', backgroundColor: '111111', displayPosition: 'bottom' },
          { url: '',        msg: 'sample2', backgroundColor: '222222', displayPosition: 'top' },
        ],
      }));

      assert.ok(this.isInvalid({
        version: 2,
        pattern: [
          { url: '',        msg: 'sample1', backgroundColor: '111111', displayPosition: 'bottom' },
          { url: 'sample2', msg: 'sample2', backgroundColor: '222222', displayPosition: 'top' },
        ],
      }));
    });

    it('import json - error - pattern - msg is not defined', function () {
      assert.ok(this.isInvalid({
        version: 2,
        pattern: [
          { url: 'sample1', msg: 'sample1', backgroundColor: '111111', displayPosition: 'bottom' },
          { url: 'sample2',                 backgroundColor: '222222', displayPosition: 'top' },
        ],
      }));

      assert.ok(this.isInvalid({
        version: 2,
        pattern: [
          { url: 'sample1',                 backgroundColor: '111111', displayPosition: 'bottom' },
          { url: 'sample2', msg: 'sample2', backgroundColor: '222222', displayPosition: 'top' },
        ],
      }));
    });

    it('import json - error - pattern - msg is null', function () {
      assert.ok(this.isInvalid({
        version: 2,
        pattern: [
          { url: 'sample1', msg: 'sample1', backgroundColor: '111111', displayPosition: 'bottom' },
          { url: 'sample2', msg: null,      backgroundColor: '222222', displayPosition: 'top' },
        ],
      }));

      assert.ok(this.isInvalid({
        version: 2,
        pattern: [
          { url: 'sample1', msg: null,      backgroundColor: '111111', displayPosition: 'bottom' },
          { url: 'sample2', msg: 'sample2', backgroundColor: '222222', displayPosition: 'top' },
        ],
      }));
    });

    it('import json - error - pattern - msg is true', function () {
      assert.ok(this.isInvalid({
        version: 2,
        pattern: [
          { url: 'sample1', msg: 'sample1', backgroundColor: '111111', displayPosition: 'bottom' },
          { url: 'sample2', msg: true,      backgroundColor: '222222', displayPosition: 'top' },
        ],
      }));

      assert.ok(this.isInvalid({
        version: 2,
        pattern: [
          { url: 'sample1', msg: true,      backgroundColor: '111111', displayPosition: 'bottom' },
          { url: 'sample2', msg: 'sample2', backgroundColor: '222222', displayPosition: 'top' },
        ],
      }));
    });

    it('import json - error - pattern - msg is false', function () {
      assert.ok(this.isInvalid({
        version: 2,
        pattern: [
          { url: 'sample1', msg: 'sample1', backgroundColor: '111111', displayPosition: 'bottom' },
          { url: 'sample2', msg: false,     backgroundColor: '222222', displayPosition: 'top' },
        ],
      }));

      assert.ok(this.isInvalid({
        version: 2,
        pattern: [
          { url: 'sample1', msg: false,     backgroundColor: '111111', displayPosition: 'bottom' },
          { url: 'sample2', msg: 'sample2', backgroundColor: '222222', displayPosition: 'top' },
        ],
      }));
    });

    it('import json - error - pattern - msg is number', function () {
      assert.ok(this.isInvalid({
        version: 2,
        pattern: [
          { url: 'sample1', msg: 'sample1', backgroundColor: '111111', displayPosition: 'bottom' },
          { url: 'sample2', msg: 100,       backgroundColor: '222222', displayPosition: 'top' },
        ],
      }));

      assert.ok(this.isInvalid({
        version: 2,
        pattern: [
          { url: 'sample1', msg: 100,       backgroundColor: '111111', displayPosition: 'bottom' },
          { url: 'sample2', msg: 'sample2', backgroundColor: '222222', displayPosition: 'top' },
        ],
      }));
    });

    it('import json - error - pattern - msg is empty string', function () {
      assert.ok(this.isInvalid({
        version: 2,
        pattern: [
          { url: 'sample1', msg: 'sample1', backgroundColor: '111111', displayPosition: 'bottom' },
          { url: 'sample2', msg: '',        backgroundColor: '222222', displayPosition: 'top' },
        ],
      }));

      assert.ok(this.isInvalid({
        version: 2,
        pattern: [
          { url: 'sample1', msg: '',        backgroundColor: '111111', displayPosition: 'bottom' },
          { url: 'sample2', msg: 'sample2', backgroundColor: '222222', displayPosition: 'top' },
        ],
      }));
    });

    it('import json - error - pattern - backgroundColor is not defined', function () {
      assert.ok(this.isInvalid({
        version: 2,
        pattern: [
          { url: 'sample1', msg: 'sample1', backgroundColor: '111111', displayPosition: 'bottom' },
          { url: 'sample2', msg: 'sample2',                            displayPosition: 'top' },
        ],
      }));

      assert.ok(this.isInvalid({
        version: 2,
        pattern: [
          { url: 'sample1', msg: 'sample1',                            displayPosition: 'bottom' },
          { url: 'sample2', msg: 'sample2', backgroundColor: '222222', displayPosition: 'top' },
        ],
      }));
    });

    it('import json - error - pattern - backgroundColor is null', function () {
      assert.ok(this.isInvalid({
        version: 2,
        pattern: [
          { url: 'sample1', msg: 'sample1', backgroundColor: '111111', displayPosition: 'bottom' },
          { url: 'sample2', msg: 'sample2', backgroundColor: null,     displayPosition: 'top' },
        ],
      }));

      assert.ok(this.isInvalid({
        version: 2,
        pattern: [
          { url: 'sample1', msg: 'sample1', backgroundColor: null,     displayPosition: 'bottom' },
          { url: 'sample2', msg: 'sample2', backgroundColor: '222222', displayPosition: 'top' },
        ],
      }));
    });

    it('import json - error - pattern - backgroundColor is true', function () {
      assert.ok(this.isInvalid({
        version: 2,
        pattern: [
          { url: 'sample1', msg: 'sample1', backgroundColor: '111111', displayPosition: 'bottom' },
          { url: 'sample2', msg: 'sample2', backgroundColor: true,     displayPosition: 'top' },
        ],
      }));

      assert.ok(this.isInvalid({
        version: 2,
        pattern: [
          { url: 'sample1', msg: 'sample1', backgroundColor: true,     displayPosition: 'bottom' },
          { url: 'sample2', msg: 'sample2', backgroundColor: '222222', displayPosition: 'top' },
        ],
      }));
    });

    it('import json - error - pattern - backgroundColor is false', function () {
      assert.ok(this.isInvalid({
        version: 2,
        pattern: [
          { url: 'sample1', msg: 'sample1', backgroundColor: '111111', displayPosition: 'bottom' },
          { url: 'sample2', msg: 'sample2', backgroundColor: false,    displayPosition: 'top' },
        ],
      }));

      assert.ok(this.isInvalid({
        version: 2,
        pattern: [
          { url: 'sample1', msg: 'sample1', backgroundColor: false,    displayPosition: 'bottom' },
          { url: 'sample2', msg: 'sample2', backgroundColor: '222222', displayPosition: 'top' },
        ],
      }));
    });

    it('import json - error - pattern - backgroundColor is empty string', function () {
      assert.ok(this.isInvalid({
        version: 2,
        pattern: [
          { url: 'sample1', msg: 'sample1', backgroundColor: '111111', displayPosition: 'bottom' },
          { url: 'sample2', msg: 'sample2', backgroundColor: '',       displayPosition: 'top' },
        ],
      }));

      assert.ok(this.isInvalid({
        version: 2,
        pattern: [
          { url: 'sample1', msg: 'sample1', backgroundColor: '',       displayPosition: 'bottom' },
          { url: 'sample2', msg: 'sample2', backgroundColor: '222222', displayPosition: 'top' },
        ],
      }));
    });

    it('import json - error - pattern - backgroundColor is not hex color', function () {
      assert.ok(this.isInvalid({
        version: 2,
        pattern: [
          { url: 'sample1', msg: 'sample1', backgroundColor: '111111', displayPosition: 'bottom' },
          { url: 'sample2', msg: 'sample2', backgroundColor: '12345z', displayPosition: 'top' },
        ],
      }));

      assert.ok(this.isInvalid({
        version: 2,
        pattern: [
          { url: 'sample1', msg: 'sample1', backgroundColor: '111111', displayPosition: 'bottom' },
          { url: 'sample2', msg: 'sample2', backgroundColor: 'black',  displayPosition: 'top' },
        ],
      }));

      assert.ok(this.isInvalid({
        version: 2,
        pattern: [
          { url: 'sample1', msg: 'sample1', backgroundColor: '12345z', displayPosition: 'bottom' },
          { url: 'sample2', msg: 'sample2', backgroundColor: '222222', displayPosition: 'top' },
        ],
      }));

      assert.ok(this.isInvalid({
        version: 2,
        pattern: [
          { url: 'sample1', msg: 'sample1', backgroundColor: 'black',  displayPosition: 'bottom' },
          { url: 'sample2', msg: 'sample2', backgroundColor: '222222', displayPosition: 'top' },
        ],
      }));
    });

    it('import json - error - pattern - displayPosition is not defined', function () {
      assert.ok(this.isInvalid({
        version: 2,
        pattern: [
          { url: 'sample1', msg: 'sample1', backgroundColor: '111111', displayPosition: 'top' },
          { url: 'sample2', msg: 'sample2', backgroundColor: '222222' },
        ],
      }));

      assert.ok(this.isInvalid({
        version: 2,
        pattern: [
          { url: 'sample1', msg: 'sample1', backgroundColor: '111111' },
          { url: 'sample2', msg: 'sample2', backgroundColor: '222222', displayPosition: 'bottom' },
        ],
      }));
    });

    it('import json - error - pattern - displayPosition is null', function () {
      assert.ok(this.isInvalid({
        version: 2,
        pattern: [
          { url: 'sample1', msg: 'sample1', backgroundColor: '111111', displayPosition: 'top' },
          { url: 'sample2', msg: 'sample2', backgroundColor: '222222', displayPosition: null },
        ],
      }));

      assert.ok(this.isInvalid({
        version: 2,
        pattern: [
          { url: 'sample1', msg: 'sample1', backgroundColor: '111111', displayPosition: null },
          { url: 'sample2', msg: 'sample2', backgroundColor: '222222', displayPosition: 'bottom' },
        ],
      }));
    });

    it('import json - error - pattern - displayPosition is bool', function () {
      assert.ok(this.isInvalid({
        version: 2,
        pattern: [
          { url: 'sample1', msg: 'sample1', backgroundColor: '111111', displayPosition: 'top' },
          { url: 'sample2', msg: 'sample2', backgroundColor: '222222', displayPosition: true },
        ],
      }));

      assert.ok(this.isInvalid({
        version: 2,
        pattern: [
          { url: 'sample1', msg: 'sample1', backgroundColor: '111111', displayPosition: false },
          { url: 'sample2', msg: 'sample2', backgroundColor: '222222', displayPosition: 'bottom' },
        ],
      }));
    });

    it('import json - error - pattern - displayPosition is number', function () {
      assert.ok(this.isInvalid({
        version: 2,
        pattern: [
          { url: 'sample1', msg: 'sample1', backgroundColor: '111111', displayPosition: 'top' },
          { url: 'sample2', msg: 'sample2', backgroundColor: '222222', displayPosition: 123 },
        ],
      }));

      assert.ok(this.isInvalid({
        version: 2,
        pattern: [
          { url: 'sample1', msg: 'sample1', backgroundColor: '111111', displayPosition: 123 },
          { url: 'sample2', msg: 'sample2', backgroundColor: '222222', displayPosition: 'bottom' },
        ],
      }));
    });

    it('import json - error - pattern - displayPosition is empty string', function () {
      assert.ok(this.isInvalid({
        version: 2,
        pattern: [
          { url: 'sample1', msg: 'sample1', backgroundColor: '111111', displayPosition: 'top' },
          { url: 'sample2', msg: 'sample2', backgroundColor: '222222', displayPosition: '' },
        ],
      }));

      assert.ok(this.isInvalid({
        version: 2,
        pattern: [
          { url: 'sample1', msg: 'sample1', backgroundColor: '111111', displayPosition: '' },
          { url: 'sample2', msg: 'sample2', backgroundColor: '222222', displayPosition: 'bottom' },
        ],
      }));
    });

    it('import json - error - pattern - displayPosition is invalid string', function () {
      assert.ok(this.isInvalid({
        version: 2,
        pattern: [
          { url: 'sample1', msg: 'sample1', backgroundColor: '111111', displayPosition: 'top' },
          { url: 'sample2', msg: 'sample2', backgroundColor: '222222', displayPosition: 'foo' },
        ],
      }));

      assert.ok(this.isInvalid({
        version: 2,
        pattern: [
          { url: 'sample1', msg: 'sample1', backgroundColor: '111111', displayPosition: 'top' },
          { url: 'sample2', msg: 'sample2', backgroundColor: '222222', displayPosition: 'Bottom' },
        ],
      }));

      assert.ok(this.isInvalid({
        version: 2,
        pattern: [
          { url: 'sample1', msg: 'sample1', backgroundColor: '111111', displayPosition: 'top' },
          { url: 'sample2', msg: 'sample2', backgroundColor: '222222', displayPosition: 'BOTTOM' },
        ],
      }));

      assert.ok(this.isInvalid({
        version: 2,
        pattern: [
          { url: 'sample1', msg: 'sample1', backgroundColor: '111111', displayPosition: 'bar' },
          { url: 'sample2', msg: 'sample2', backgroundColor: '222222', displayPosition: 'bottom' },
        ],
      }));

      assert.ok(this.isInvalid({
        version: 2,
        pattern: [
          { url: 'sample1', msg: 'sample1', backgroundColor: '111111', displayPosition: 'Top' },
          { url: 'sample2', msg: 'sample2', backgroundColor: '222222', displayPosition: 'bottom' },
        ],
      }));

      assert.ok(this.isInvalid({
        version: 2,
        pattern: [
          { url: 'sample1', msg: 'sample1', backgroundColor: '111111', displayPosition: 'TOP' },
          { url: 'sample2', msg: 'sample2', backgroundColor: '222222', displayPosition: 'bottom' },
        ],
      }));
    });

    it('import json - ok', function () {
      assert.ok(this.isValid({
        version: 2,
        pattern: [
          { url: 'sample1', msg: 'sample1', backgroundColor: '111111', displayPosition: 'top' },
          { url: 'sample2', msg: 'sample2', backgroundColor: '222222', displayPosition: 'bottom' },
        ],
      }));

      assert.ok(this.isValid({
        version: 2,
        pattern: [
          { url: 'sample1', msg: 'sample1', backgroundColor: '111111', displayPosition: 'bottom' },
          { url: 'sample2', msg: 'sample2', backgroundColor: '222222', displayPosition: 'top' },
        ],
      }));
    });

    it('import json - ok - no data', function () {
      assert.ok(this.isValid({
        version: 2,
        pattern: [],
      }));
    });
  });
});
