QUnit.module('urlNotification.validator.forImportJsonEssential', {
  beforeEach: function() {
    this.urlNotification = require('url-notification');

    this.isValid = function(json) {
      return this.urlNotification.validator.forImportJsonEssential(json);
    };
  },
  afterEach: function() {
  },
});

QUnit.test('import json - error - array', function(assert) {
  assert.notOk(this.isValid([]));
});

QUnit.test('import json - error - no keys', function(assert) {
  assert.notOk(this.isValid({}));
});

QUnit.test('import json - error - version not defined', function(assert) {
  assert.notOk(this.isValid({
    pattern: [
      { url: 'sample1', msg: 'sample1', backgroundColor: '111111', displayPosition: 'top' },
      { url: 'sample2', msg: 'sample2', backgroundColor: '222222', displayPosition: 'top' },
    ],
  }));
});

QUnit.test('import json - error - pattern not defined', function(assert) {
  assert.notOk(this.isValid({
    version: 1,
  }));
});

QUnit.test('import json - error - version is null', function(assert) {
  assert.notOk(this.isValid({
    version: null,
    pattern: [
      { url: 'sample1', msg: 'sample1', backgroundColor: '111111', displayPosition: 'top' },
      { url: 'sample2', msg: 'sample2', backgroundColor: '222222', displayPosition: 'top' },
    ],
  }));
});

QUnit.test('import json - error - version is true', function(assert) {
  assert.notOk(this.isValid({
    version: true,
    pattern: [
      { url: 'sample1', msg: 'sample1', backgroundColor: '111111', displayPosition: 'top' },
      { url: 'sample2', msg: 'sample2', backgroundColor: '222222', displayPosition: 'top' },
    ],
  }));
});

QUnit.test('import json - error - version is false', function(assert) {
  assert.notOk(this.isValid({
    version: false,
    pattern: [
      { url: 'sample1', msg: 'sample1', backgroundColor: '111111', displayPosition: 'top' },
      { url: 'sample2', msg: 'sample2', backgroundColor: '222222', displayPosition: 'top' },
    ],
  }));
});

QUnit.test('import json - error - version is string of integer', function(assert) {
  assert.notOk(this.isValid({
    version: '1',
    pattern: [
      { url: 'sample1', msg: 'sample1', backgroundColor: '111111', displayPosition: 'top' },
      { url: 'sample2', msg: 'sample2', backgroundColor: '222222', displayPosition: 'top' },
    ],
  }));
});

QUnit.test('import json - error - version is float', function(assert) {
  assert.notOk(this.isValid({
    version: 1.1,
    pattern: [
      { url: 'sample1', msg: 'sample1', backgroundColor: '111111', displayPosition: 'top' },
      { url: 'sample2', msg: 'sample2', backgroundColor: '222222', displayPosition: 'top' },
    ],
  }));
});

QUnit.test('import json - error - version is out of range', function(assert) {
  assert.notOk(this.isValid({
    version: 0,
    pattern: [
      { url: 'sample1', msg: 'sample1', backgroundColor: '111111', displayPosition: 'top' },
      { url: 'sample2', msg: 'sample2', backgroundColor: '222222', displayPosition: 'top' },
    ],
  }));

  assert.notOk(this.isValid({
    version: 3,
    pattern: [
      { url: 'sample1', msg: 'sample1', backgroundColor: '111111', displayPosition: 'top' },
      { url: 'sample2', msg: 'sample2', backgroundColor: '222222', displayPosition: 'top' },
    ],
  }));
});

QUnit.test('import json - error - pattern is null', function(assert) {
  assert.notOk(this.isValid({
    version: 1,
    pattern: null,
  }));
});

QUnit.test('import json - error - pattern is true', function(assert) {
  assert.notOk(this.isValid({
    version: 1,
    pattern: true,
  }));
});

QUnit.test('import json - error - pattern is false', function(assert) {
  assert.notOk(this.isValid({
    version: 1,
    pattern: false,
  }));
});

QUnit.test('import json - error - pattern is string', function(assert) {
  assert.notOk(this.isValid({
    version: 1,
    pattern: 'hoge',
  }));
});

QUnit.test('import json - error - pattern is object', function(assert) {
  assert.notOk(this.isValid({
    version: 1,
    pattern: { url: 'sample1', msg: 'sample1', backgroundColor: '111111', displayPosition: 'top' },
  }));
});

QUnit.test('import json - ok', function(assert) {
  assert.ok(this.isValid({
    version: 1,
    pattern: [],
  }));
});
