const describe = require('mocha').describe;
const beforeEach = require('mocha').beforeEach;
const it = require('mocha').it;
const assert = require('assert');
const urlNotification = require('../src/js/urlNotification/main');

describe('vendor.jsonschema', function() {
  beforeEach(function () {
    this.isValid = function (json) {
      return urlNotification.validator.forImportJson(json) === true;
    };
    this.isInvalid = function (json) {
      return urlNotification.validator.forImportJson(json) === false;
    };
  });

  it('import json - error - argument is an array', function () {
    assert.ok(this.isInvalid([]));
  });

  it('import json - error - argument is an object but no keys', function () {
    assert.ok(this.isInvalid({}));
  });

  it('import json - error - version is not defined', function () {
    assert.ok(this.isInvalid({
      pattern: [
        { url: 'sample1', msg: 'sample1', backgroundColor: '111111' },
        { url: 'sample2', msg: 'sample2', backgroundColor: '222222' },
      ],
    }));
  });

  it('import json - error - version is null', function () {
    assert.ok(this.isInvalid({
      version: null,
      pattern: [
        { url: 'sample1', msg: 'sample1', backgroundColor: '111111' },
        { url: 'sample2', msg: 'sample2', backgroundColor: '222222' },
      ],
    }));
  });

  it('import json - error - version is true', function () {
    assert.ok(this.isInvalid({
      version: true,
      pattern: [
        { url: 'sample1', msg: 'sample1', backgroundColor: '111111' },
        { url: 'sample2', msg: 'sample2', backgroundColor: '222222' },
      ],
    }));
  });

  it('import json - error - version is false', function () {
    assert.ok(this.isInvalid({
      version: false,
      pattern: [
        { url: 'sample1', msg: 'sample1', backgroundColor: '111111' },
        { url: 'sample2', msg: 'sample2', backgroundColor: '222222' },
      ],
    }));
  });

  it('import json - error - version is string of integer', function () {
    assert.ok(this.isInvalid({
      version: '1',
      pattern: [
        { url: 'sample1', msg: 'sample1', backgroundColor: '111111' },
        { url: 'sample2', msg: 'sample2', backgroundColor: '222222' },
      ],
    }));
  });

  it('import json - error - version is float', function () {
    assert.ok(this.isInvalid({
      version: 1.1,
      pattern: [
        { url: 'sample1', msg: 'sample1', backgroundColor: '111111' },
        { url: 'sample2', msg: 'sample2', backgroundColor: '222222' },
      ],
    }));
  });

  it('import json - error - version is out of range', function () {
    assert.ok(this.isInvalid({
      version: 0,
      pattern: [
        { url: 'sample1', msg: 'sample1', backgroundColor: '111111' },
        { url: 'sample2', msg: 'sample2', backgroundColor: '222222' },
      ],
    }));

    assert.ok(this.isInvalid({
      version: 3,
      pattern: [
        { url: 'sample1', msg: 'sample1', backgroundColor: '111111', displayPosition: 'top' },
        { url: 'sample2', msg: 'sample2', backgroundColor: '222222', displayPosition: 'top' },
      ],
    }));
  });

  it('import json - error - pattern is not defined', function () {
    assert.ok(this.isInvalid({
      version: 1,
    }));
  });

  it('import json - error - pattern is null', function () {
    assert.ok(this.isInvalid({
      version: 1,
      pattern: null,
    }));
  });

  it('import json - error - pattern is true', function () {
    assert.ok(this.isInvalid({
      version: 1,
      pattern: true,
    }));
  });

  it('import json - error - pattern is false', function () {
    assert.ok(this.isInvalid({
      version: 1,
      pattern: false,
    }));
  });

  it('import json - error - pattern is string', function () {
    assert.ok(this.isInvalid({
      version: 1,
      pattern: 'dummy',
    }));
  });

  it('import json - error - pattern is not an array of object(s)', function () {
    assert.ok(this.isInvalid({
      version: 1,
      pattern: { url: 'sample1', msg: 'sample1', backgroundColor: '111111' },
    }));

    assert.ok(this.isInvalid({
      version: 2,
      pattern: { url: 'sample1', msg: 'sample1', backgroundColor: '111111', displayPosition: 'top' },
    }));
  });

});
