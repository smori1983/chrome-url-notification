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

  it('import json - error - array', function () {
    assert.ok(this.isInvalid([]));
  });

  it('import json - error - no keys', function () {
    assert.ok(this.isInvalid({}));
  });

  it('import json - error - version not defined', function () {
    assert.ok(this.isInvalid({
      pattern: [
        {url: 'sample1', msg: 'sample1', backgroundColor: '111111'},
        {url: 'sample2', msg: 'sample2', backgroundColor: '222222'},
      ],
    }));
  });

  it('import json - error - pattern not defined', function () {
    assert.ok(this.isInvalid({
      version: 1,
    }));
  });

  it('import json - error - version is null', function () {
    assert.ok(this.isInvalid({
      version: null,
      pattern: [
        {url: 'sample1', msg: 'sample1', backgroundColor: '111111'},
        {url: 'sample2', msg: 'sample2', backgroundColor: '222222'},
      ],
    }));
  });

  it('import json - error - version is true', function () {
    assert.ok(this.isInvalid({
      version: true,
      pattern: [
        {url: 'sample1', msg: 'sample1', backgroundColor: '111111'},
        {url: 'sample2', msg: 'sample2', backgroundColor: '222222'},
      ],
    }));
  });

  it('import json - error - version is false', function () {
    assert.ok(this.isInvalid({
      version: false,
      pattern: [
        {url: 'sample1', msg: 'sample1', backgroundColor: '111111'},
        {url: 'sample2', msg: 'sample2', backgroundColor: '222222'},
      ],
    }));
  });

  it('import json - error - version is string of integer', function () {
    assert.ok(this.isInvalid({
      version: '1',
      pattern: [
        {url: 'sample1', msg: 'sample1', backgroundColor: '111111'},
        {url: 'sample2', msg: 'sample2', backgroundColor: '222222'},
      ],
    }));
  });

  it('import json - error - version is float', function () {
    assert.ok(this.isInvalid({
      version: 1.1,
      pattern: [
        {url: 'sample1', msg: 'sample1', backgroundColor: '111111'},
        {url: 'sample2', msg: 'sample2', backgroundColor: '222222'},
      ],
    }));
  });

  it('import json - error - version is out of range', function () {
    assert.ok(this.isInvalid({
      version: 0,
      pattern: [
        {url: 'sample1', msg: 'sample1', backgroundColor: '111111'},
        {url: 'sample2', msg: 'sample2', backgroundColor: '222222'},
      ],
    }));

    assert.ok(this.isInvalid({
      version: 2,
      pattern: [
        {url: 'sample1', msg: 'sample1', backgroundColor: '111111'},
        {url: 'sample2', msg: 'sample2', backgroundColor: '222222'},
      ],
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
      pattern: 'hoge',
    }));
  });

  it('import json - error - pattern is object', function () {
    assert.ok(this.isInvalid({
      version: 1,
      pattern: {url: 'sample1', msg: 'sample1', backgroundColor: '111111'},
    }));
  });

  it('import json - error - pattern - url is not defined', function () {
    assert.ok(this.isInvalid({
      version: 1,
      pattern: [
        {url: 'sample1', msg: 'sample1', backgroundColor: '111111'},
        {msg: 'sample2', backgroundColor: '222222'},
      ],
    }));
  });

  it('import json - error - pattern - url is null', function () {
    assert.ok(this.isInvalid({
      version: 1,
      pattern: [
        {url: 'sample1', msg: 'sample1', backgroundColor: '111111'},
        {url: null, msg: 'sample2', backgroundColor: '222222'},
      ],
    }));
  });

  it('import json - error - pattern - url is true', function () {
    assert.ok(this.isInvalid({
      version: 1,
      pattern: [
        {url: 'sample1', msg: 'sample1', backgroundColor: '111111'},
        {url: true, msg: 'sample2', backgroundColor: '222222'},
      ],
    }));
  });

  it('import json - error - pattern - url is false', function () {
    assert.ok(this.isInvalid({
      version: 1,
      pattern: [
        {url: 'sample1', msg: 'sample1', backgroundColor: '111111'},
        {url: false, msg: 'sample2', backgroundColor: '222222'},
      ],
    }));
  });

  it('import json - error - pattern - url is number', function () {
    assert.ok(this.isInvalid({
      version: 1,
      pattern: [
        {url: 'sample1', msg: 'sample1', backgroundColor: '111111'},
        {url: 100, msg: 'sample2', backgroundColor: '222222'},
      ],
    }));
  });

  it('import json - error - pattern - url is empty string', function () {
    assert.ok(this.isInvalid({
      version: 1,
      pattern: [
        {url: 'sample1', msg: 'sample1', backgroundColor: '111111'},
        {url: '', msg: 'sample2', backgroundColor: '222222'},
      ],
    }));
  });

  it('import json - error - pattern - msg is not defined', function () {
    assert.ok(this.isInvalid({
      version: 1,
      pattern: [
        {url: 'sample1', msg: 'sample1', backgroundColor: '111111'},
        {url: 'sample2', backgroundColor: '222222'},
      ],
    }));
  });

  it('import json - error - pattern - msg is null', function () {
    assert.ok(this.isInvalid({
      version: 1,
      pattern: [
        {url: 'sample1', msg: 'sample1', backgroundColor: '111111'},
        {url: 'sample2', msg: null, backgroundColor: '222222'},
      ],
    }));
  });

  it('import json - error - pattern - msg is true', function () {
    assert.ok(this.isInvalid({
      version: 1,
      pattern: [
        {url: 'sample1', msg: 'sample1', backgroundColor: '111111'},
        {url: 'sample2', msg: true, backgroundColor: '222222'},
      ],
    }));
  });

  it('import json - error - pattern - msg is false', function () {
    assert.ok(this.isInvalid({
      version: 1,
      pattern: [
        {url: 'sample1', msg: 'sample1', backgroundColor: '111111'},
        {url: 'sample2', msg: false, backgroundColor: '222222'},
      ],
    }));
  });

  it('import json - error - pattern - msg is number', function () {
    assert.ok(this.isInvalid({
      version: 1,
      pattern: [
        {url: 'sample1', msg: 'sample1', backgroundColor: '111111'},
        {url: 'sample2', msg: 100, backgroundColor: '222222'},
      ],
    }));
  });

  it('import json - error - pattern - msg is empty string', function () {
    assert.ok(this.isInvalid({
      version: 1,
      pattern: [
        {url: 'sample1', msg: 'sample1', backgroundColor: '111111'},
        {url: 'sample2', msg: '', backgroundColor: '222222'},
      ],
    }));
  });

  it('import json - error - pattern - backgroundColor is not defined', function () {
    assert.ok(this.isInvalid({
      version: 1,
      pattern: [
        {url: 'sample1', msg: 'sample1', backgroundColor: '111111'},
        {url: 'sample2', msg: 'sample2'},
      ],
    }));
  });

  it('import json - error - pattern - backgroundColor is null', function () {
    assert.ok(this.isInvalid({
      version: 1,
      pattern: [
        {url: 'sample1', msg: 'sample1', backgroundColor: '111111'},
        {url: 'sample2', msg: 'sample2', backgroundColor: null},
      ],
    }));
  });

  it('import json - error - pattern - backgroundColor is true', function () {
    assert.ok(this.isInvalid({
      version: 1,
      pattern: [
        {url: 'sample1', msg: 'sample1', backgroundColor: '111111'},
        {url: 'sample2', msg: 'sample2', backgroundColor: true},
      ],
    }));
  });

  it('import json - error - pattern - backgroundColor is false', function () {
    assert.ok(this.isInvalid({
      version: 1,
      pattern: [
        {url: 'sample1', msg: 'sample1', backgroundColor: '111111'},
        {url: 'sample2', msg: 'sample2', backgroundColor: false},
      ],
    }));
  });

  it('import json - error - pattern - backgroundColor is empty string', function () {
    assert.ok(this.isInvalid({
      version: 1,
      pattern: [
        {url: 'sample1', msg: 'sample1', backgroundColor: '111111'},
        {url: 'sample2', msg: 'sample2', backgroundColor: ''},
      ],
    }));
  });

  it('import json - error - pattern - backgroundColor is not hex color', function () {
    assert.ok(this.isInvalid({
      version: 1,
      pattern: [
        {url: 'sample1', msg: 'sample1', backgroundColor: '111111'},
        {url: 'sample2', msg: 'sample2', backgroundColor: '12345z'},
      ],
    }));

    assert.ok(this.isInvalid({
      version: 1,
      pattern: [
        {url: 'sample1', msg: 'sample1', backgroundColor: '111111'},
        {url: 'sample2', msg: 'sample2', backgroundColor: 'black'},
      ],
    }));
  });
});
