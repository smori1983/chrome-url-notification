QUnit.module('urlNotification.validator.importJson.v1', {
  beforeEach: function() {
    this.urlNotification = require('url-notification');

    this.isValid = function(json) {
      return this.urlNotification.validator.forImportJson(json);
    };
  },
  afterEach: function() {
  },
});

QUnit.test('import json - error - pattern - url is not defined', function(assert) {
  assert.notOk(this.isValid({
    version: 1,
    pattern: [
      { url: 'sample1', msg: 'sample1', backgroundColor: '111111' },
      {                 msg: 'sample2', backgroundColor: '222222' },
    ],
  }));

  assert.notOk(this.isValid({
    version: 1,
    pattern: [
      {                 msg: 'sample1', backgroundColor: '111111' },
      { url: 'sample2', msg: 'sample2', backgroundColor: '222222' },
    ],
  }));
});

QUnit.test('import json - error - pattern - url is null', function(assert) {
  assert.notOk(this.isValid({
    version: 1,
    pattern: [
      { url: 'sample1', msg: 'sample1', backgroundColor: '111111' },
      { url: null,      msg: 'sample2', backgroundColor: '222222' },
    ],
  }));

  assert.notOk(this.isValid({
    version: 1,
    pattern: [
      { url: null,      msg: 'sample1', backgroundColor: '111111' },
      { url: 'sample2', msg: 'sample2', backgroundColor: '222222' },
    ],
  }));
});

QUnit.test('import json - error - pattern - url is true', function(assert) {
  assert.notOk(this.isValid({
    version: 1,
    pattern: [
      { url: 'sample1', msg: 'sample1', backgroundColor: '111111' },
      { url: true,      msg: 'sample2', backgroundColor: '222222' },
    ],
  }));

  assert.notOk(this.isValid({
    version: 1,
    pattern: [
      { url: true,      msg: 'sample1', backgroundColor: '111111' },
      { url: 'sample2', msg: 'sample2', backgroundColor: '222222' },
    ],
  }));
});

QUnit.test('import json - error - pattern - url is false', function(assert) {
  assert.notOk(this.isValid({
    version: 1,
    pattern: [
      { url: 'sample1', msg: 'sample1', backgroundColor: '111111' },
      { url: false,     msg: 'sample2', backgroundColor: '222222' },
    ],
  }));

  assert.notOk(this.isValid({
    version: 1,
    pattern: [
      { url: false,     msg: 'sample1', backgroundColor: '111111' },
      { url: 'sample2', msg: 'sample2', backgroundColor: '222222' },
    ],
  }));
});

QUnit.test('import json - error - pattern - url is number', function(assert) {
  assert.notOk(this.isValid({
    version: 1,
    pattern: [
      { url: 'sample1', msg: 'sample1', backgroundColor: '111111' },
      { url: 100,       msg: 'sample2', backgroundColor: '222222' },
    ],
  }));

  assert.notOk(this.isValid({
    version: 1,
    pattern: [
      { url: 100,       msg: 'sample1', backgroundColor: '111111' },
      { url: 'sample2', msg: 'sample2', backgroundColor: '222222' },
    ],
  }));
});

QUnit.test('import json - error - pattern - url is empty string', function(assert) {
  assert.notOk(this.isValid({
    version: 1,
    pattern: [
      { url: 'sample1', msg: 'sample1', backgroundColor: '111111' },
      { url: '',        msg: 'sample2', backgroundColor: '222222' },
    ],
  }));

  assert.notOk(this.isValid({
    version: 1,
    pattern: [
      { url: '',        msg: 'sample1', backgroundColor: '111111' },
      { url: 'sample2', msg: 'sample2', backgroundColor: '222222' },
    ],
  }));
});

QUnit.test('import json - error - pattern - msg is not defined', function(assert) {
  assert.notOk(this.isValid({
    version: 1,
    pattern: [
      { url: 'sample1', msg: 'sample1', backgroundColor: '111111' },
      { url: 'sample2',                 backgroundColor: '222222' },
    ],
  }));

  assert.notOk(this.isValid({
    version: 1,
    pattern: [
      { url: 'sample1',                 backgroundColor: '111111' },
      { url: 'sample2', msg: 'sample2', backgroundColor: '222222' },
    ],
  }));
});

QUnit.test('import json - error - pattern - msg is null', function(assert) {
  assert.notOk(this.isValid({
    version: 1,
    pattern: [
      { url: 'sample1', msg: 'sample1', backgroundColor: '111111' },
      { url: 'sample2', msg: null,      backgroundColor: '222222' },
    ],
  }));

  assert.notOk(this.isValid({
    version: 1,
    pattern: [
      { url: 'sample1', msg: null,      backgroundColor: '111111' },
      { url: 'sample2', msg: 'sample2', backgroundColor: '222222' },
    ],
  }));
});

QUnit.test('import json - error - pattern - msg is true', function(assert) {
  assert.notOk(this.isValid({
    version: 1,
    pattern: [
      { url: 'sample1', msg: 'sample1', backgroundColor: '111111' },
      { url: 'sample2', msg: true,      backgroundColor: '222222' },
    ],
  }));

  assert.notOk(this.isValid({
    version: 1,
    pattern: [
      { url: 'sample1', msg: true,      backgroundColor: '111111' },
      { url: 'sample2', msg: 'sample2', backgroundColor: '222222' },
    ],
  }));
});

QUnit.test('import json - error - pattern - msg is false', function(assert) {
  assert.notOk(this.isValid({
    version: 1,
    pattern: [
      { url: 'sample1', msg: 'sample1', backgroundColor: '111111' },
      { url: 'sample2', msg: false,     backgroundColor: '222222' },
    ],
  }));

  assert.notOk(this.isValid({
    version: 1,
    pattern: [
      { url: 'sample1', msg: false,     backgroundColor: '111111' },
      { url: 'sample2', msg: 'sample2', backgroundColor: '222222' },
    ],
  }));
});

QUnit.test('import json - error - pattern - msg is number', function(assert) {
  assert.notOk(this.isValid({
    version: 1,
    pattern: [
      { url: 'sample1', msg: 'sample1', backgroundColor: '111111' },
      { url: 'sample2', msg: 100,       backgroundColor: '222222' },
    ],
  }));

  assert.notOk(this.isValid({
    version: 1,
    pattern: [
      { url: 'sample1', msg: 100,       backgroundColor: '111111' },
      { url: 'sample2', msg: 'sample2', backgroundColor: '222222' },
    ],
  }));
});

QUnit.test('import json - error - pattern - msg is empty string', function(assert) {
  assert.notOk(this.isValid({
    version: 1,
    pattern: [
      { url: 'sample1', msg: 'sample1', backgroundColor: '111111' },
      { url: 'sample2', msg: '',        backgroundColor: '222222' },
    ],
  }));

  assert.notOk(this.isValid({
    version: 1,
    pattern: [
      { url: 'sample1', msg: '',        backgroundColor: '111111' },
      { url: 'sample2', msg: 'sample2', backgroundColor: '222222' },
    ],
  }));
});

QUnit.test('import json - error - pattern - backgroundColor is not defined', function(assert) {
  assert.notOk(this.isValid({
    version: 1,
    pattern: [
      { url: 'sample1', msg: 'sample1', backgroundColor: '111111' },
      { url: 'sample2', msg: 'sample2'                            },
    ],
  }));

  assert.notOk(this.isValid({
    version: 1,
    pattern: [
      { url: 'sample1', msg: 'sample1'                            },
      { url: 'sample2', msg: 'sample2', backgroundColor: '222222' },
    ],
  }));
});

QUnit.test('import json - error - pattern - backgroundColor is null', function(assert) {
  assert.notOk(this.isValid({
    version: 1,
    pattern: [
      { url: 'sample1', msg: 'sample1', backgroundColor: '111111' },
      { url: 'sample2', msg: 'sample2', backgroundColor: null     },
    ],
  }));

  assert.notOk(this.isValid({
    version: 1,
    pattern: [
      { url: 'sample1', msg: 'sample1', backgroundColor: null     },
      { url: 'sample2', msg: 'sample2', backgroundColor: '222222' },
    ],
  }));
});

QUnit.test('import json - error - pattern - backgroundColor is true', function(assert) {
  assert.notOk(this.isValid({
    version: 1,
    pattern: [
      { url: 'sample1', msg: 'sample1', backgroundColor: '111111' },
      { url: 'sample2', msg: 'sample2', backgroundColor: true     },
    ],
  }));

  assert.notOk(this.isValid({
    version: 1,
    pattern: [
      { url: 'sample1', msg: 'sample1', backgroundColor: true     },
      { url: 'sample2', msg: 'sample2', backgroundColor: '222222' },
    ],
  }));
});

QUnit.test('import json - error - pattern - backgroundColor is false', function(assert) {
  assert.notOk(this.isValid({
    version: 1,
    pattern: [
      { url: 'sample1', msg: 'sample1', backgroundColor: '111111' },
      { url: 'sample2', msg: 'sample2', backgroundColor: false    },
    ],
  }));

  assert.notOk(this.isValid({
    version: 1,
    pattern: [
      { url: 'sample1', msg: 'sample1', backgroundColor: false    },
      { url: 'sample2', msg: 'sample2', backgroundColor: '222222' },
    ],
  }));
});

QUnit.test('import json - error - pattern - backgroundColor is empty string', function(assert) {
  assert.notOk(this.isValid({
    version: 1,
    pattern: [
      { url: 'sample1', msg: 'sample1', backgroundColor: '111111' },
      { url: 'sample2', msg: 'sample2', backgroundColor: ''       },
    ],
  }));

  assert.notOk(this.isValid({
    version: 1,
    pattern: [
      { url: 'sample1', msg: 'sample1', backgroundColor: ''       },
      { url: 'sample2', msg: 'sample2', backgroundColor: '222222' },
    ],
  }));
});

QUnit.test('import json - error - pattern - backgroundColor is not hex color', function(assert) {
  assert.notOk(this.isValid({
    version: 1,
    pattern: [
      { url: 'sample1', msg: 'sample1', backgroundColor: '111111' },
      { url: 'sample2', msg: 'sample2', backgroundColor: '12345z' },
    ],
  }));

  assert.notOk(this.isValid({
    version: 1,
    pattern: [
      { url: 'sample1', msg: 'sample1', backgroundColor: '111111' },
      { url: 'sample2', msg: 'sample2', backgroundColor: 'black'  },
    ],
  }));

  assert.notOk(this.isValid({
    version: 1,
    pattern: [
      { url: 'sample1', msg: 'sample1', backgroundColor: '12345z' },
      { url: 'sample2', msg: 'sample2', backgroundColor: '222222' },
    ],
  }));

  assert.notOk(this.isValid({
    version: 1,
    pattern: [
      { url: 'sample1', msg: 'sample1', backgroundColor: 'black'  },
      { url: 'sample2', msg: 'sample2', backgroundColor: '222222' },
    ],
  }));
});

QUnit.test('import json - ok', function(assert) {
  assert.ok(this.isValid({
    version: 1,
    pattern: [
      { url: 'sample1', msg: 'sample1', backgroundColor: '111111' },
      { url: 'sample2', msg: 'sample2', backgroundColor: '000000' },
    ],
  }));

  assert.ok(this.isValid({
    version: 1,
    pattern: [
      { url: 'sample1', msg: 'sample1', backgroundColor: '111111' },
      { url: 'sample2', msg: 'sample2', backgroundColor: 'ffffff' },
    ],
  }));
});
