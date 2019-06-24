const describe = require('mocha').describe;
const beforeEach = require('mocha').beforeEach;
const it = require('mocha').it;
const assert = require('assert');
const urlNotification = require('../src/js/urlNotification/main');

describe('urlNotification.validator.importJson.v1', function() {
  beforeEach(function () {
    this.isValid = function (json) {
      return urlNotification.validator.forImportJson(json) === true;
    };
    this.isInvalid = function (json) {
      return urlNotification.validator.forImportJson(json) === false;
    };
  });

  it('import json - error - pattern - url is not defined', function () {
    assert.ok(this.isInvalid({
      version: 1,
      pattern: [
        {url: 'sample1', msg: 'sample1', backgroundColor: '111111'},
        {msg: 'sample2', backgroundColor: '222222'},
      ],
    }));

    assert.ok(this.isInvalid({
      version: 1,
      pattern: [
        {msg: 'sample1', backgroundColor: '111111'},
        {url: 'sample2', msg: 'sample2', backgroundColor: '222222'},
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

    assert.ok(this.isInvalid({
      version: 1,
      pattern: [
        {url: null, msg: 'sample1', backgroundColor: '111111'},
        {url: 'sample2', msg: 'sample2', backgroundColor: '222222'},
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

    assert.ok(this.isInvalid({
      version: 1,
      pattern: [
        {url: true, msg: 'sample1', backgroundColor: '111111'},
        {url: 'sample2', msg: 'sample2', backgroundColor: '222222'},
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

    assert.ok(this.isInvalid({
      version: 1,
      pattern: [
        {url: false, msg: 'sample1', backgroundColor: '111111'},
        {url: 'sample2', msg: 'sample2', backgroundColor: '222222'},
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

    assert.ok(this.isInvalid({
      version: 1,
      pattern: [
        {url: 100, msg: 'sample1', backgroundColor: '111111'},
        {url: 'sample2', msg: 'sample2', backgroundColor: '222222'},
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

    assert.ok(this.isInvalid({
      version: 1,
      pattern: [
        {url: '', msg: 'sample1', backgroundColor: '111111'},
        {url: 'sample2', msg: 'sample2', backgroundColor: '222222'},
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

    assert.ok(this.isInvalid({
      version: 1,
      pattern: [
        {url: 'sample1', backgroundColor: '111111'},
        {url: 'sample2', msg: 'sample2', backgroundColor: '222222'},
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

    assert.ok(this.isInvalid({
      version: 1,
      pattern: [
        {url: 'sample1', msg: null, backgroundColor: '111111'},
        {url: 'sample2', msg: 'sample2', backgroundColor: '222222'},
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

    assert.ok(this.isInvalid({
      version: 1,
      pattern: [
        {url: 'sample1', msg: true, backgroundColor: '111111'},
        {url: 'sample2', msg: 'sample2', backgroundColor: '222222'},
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

    assert.ok(this.isInvalid({
      version: 1,
      pattern: [
        {url: 'sample1', msg: false, backgroundColor: '111111'},
        {url: 'sample2', msg: 'sample2', backgroundColor: '222222'},
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

    assert.ok(this.isInvalid({
      version: 1,
      pattern: [
        {url: 'sample1', msg: 100, backgroundColor: '111111'},
        {url: 'sample2', msg: 'sample2', backgroundColor: '222222'},
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

    assert.ok(this.isInvalid({
      version: 1,
      pattern: [
        {url: 'sample1', msg: '', backgroundColor: '111111'},
        {url: 'sample2', msg: 'sample2', backgroundColor: '222222'},
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

    assert.ok(this.isInvalid({
      version: 1,
      pattern: [
        {url: 'sample1', msg: 'sample1'},
        {url: 'sample2', msg: 'sample2', backgroundColor: '222222'},
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

    assert.ok(this.isInvalid({
      version: 1,
      pattern: [
        {url: 'sample1', msg: 'sample1', backgroundColor: null},
        {url: 'sample2', msg: 'sample2', backgroundColor: '222222'},
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

    assert.ok(this.isInvalid({
      version: 1,
      pattern: [
        {url: 'sample1', msg: 'sample1', backgroundColor: true},
        {url: 'sample2', msg: 'sample2', backgroundColor: '222222'},
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

    assert.ok(this.isInvalid({
      version: 1,
      pattern: [
        {url: 'sample1', msg: 'sample1', backgroundColor: false},
        {url: 'sample2', msg: 'sample2', backgroundColor: '222222'},
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

    assert.ok(this.isInvalid({
      version: 1,
      pattern: [
        {url: 'sample1', msg: 'sample1', backgroundColor: ''},
        {url: 'sample2', msg: 'sample2', backgroundColor: '222222'},
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

    assert.ok(this.isInvalid({
      version: 1,
      pattern: [
        {url: 'sample1', msg: 'sample1', backgroundColor: '12345z'},
        {url: 'sample2', msg: 'sample2', backgroundColor: '222222'},
      ],
    }));

    assert.ok(this.isInvalid({
      version: 1,
      pattern: [
        {url: 'sample1', msg: 'sample1', backgroundColor: 'black'},
        {url: 'sample2', msg: 'sample2', backgroundColor: '222222'},
      ],
    }));
  });

  it('import json - ok', function () {
    assert.ok(this.isValid({
      version: 1,
      pattern: [
        {url: 'sample1', msg: 'sample1', backgroundColor: '111111'},
        {url: 'sample2', msg: 'sample2', backgroundColor: '000000'},
      ],
    }));

    assert.ok(this.isValid({
      version: 1,
      pattern: [
        {url: 'sample1', msg: 'sample1', backgroundColor: '111111'},
        {url: 'sample2', msg: 'sample2', backgroundColor: 'ffffff'},
      ],
    }));
  });
});