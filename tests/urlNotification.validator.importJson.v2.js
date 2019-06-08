QUnit.module('urlNotification.validator.importJson.v2', {
  beforeEach: function() {
    this.isValid = function(json) {
      return urlNotification.validator.forImportJson(json);
    };
  },
  afterEach: function() {
  },
});

QUnit.test('import json - error - pattern - url is not defined', function(assert) {
  assert.notOk(this.isValid({
    version: 2,
    pattern: [
      { url: 'sample1', msg: 'sample1', backgroundColor: '111111', displayPosition: 'bottom' },
      {                 msg: 'sample2', backgroundColor: '222222', displayPosition: 'top'    },
    ],
  }));

  assert.notOk(this.isValid({
    version: 2,
    pattern: [
      {                 msg: 'sample1', backgroundColor: '111111', displayPosition: 'bottom' },
      { url: 'sample2', msg: 'sample2', backgroundColor: '222222', displayPosition: 'top'    },
    ],
  }));
});

QUnit.test('import json - error - pattern - url is null', function(assert) {
  assert.notOk(this.isValid({
    version: 2,
    pattern: [
      { url: 'sample1', msg: 'sample1', backgroundColor: '111111', displayPosition: 'bottom' },
      { url: null,      msg: 'sample2', backgroundColor: '222222', displayPosition: 'top'    },
    ],
  }));

  assert.notOk(this.isValid({
    version: 2,
    pattern: [
      { url: null,      msg: 'sample1', backgroundColor: '111111', displayPosition: 'bottom' },
      { url: 'sample2', msg: 'sample2', backgroundColor: '222222', displayPosition: 'top'    },
    ],
  }));
});

QUnit.test('import json - error - pattern - url is true', function(assert) {
  assert.notOk(this.isValid({
    version: 2,
    pattern: [
      { url: 'sample1', msg: 'sample1', backgroundColor: '111111', displayPosition: 'bottom' },
      { url: true,      msg: 'sample2', backgroundColor: '222222', displayPosition: 'top'    },
    ],
  }));

  assert.notOk(this.isValid({
    version: 2,
    pattern: [
      { url: true,      msg: 'sample1', backgroundColor: '111111', displayPosition: 'bottom' },
      { url: 'sample2', msg: 'sample2', backgroundColor: '222222', displayPosition: 'top'    },
    ],
  }));
});

QUnit.test('import json - error - pattern - url is false', function(assert) {
  assert.notOk(this.isValid({
    version: 2,
    pattern: [
      { url: 'sample1', msg: 'sample1', backgroundColor: '111111', displayPosition: 'bottom' },
      { url: false,     msg: 'sample2', backgroundColor: '222222', displayPosition: 'top'    },
    ],
  }));

  assert.notOk(this.isValid({
    version: 2,
    pattern: [
      { url: false,     msg: 'sample1', backgroundColor: '111111', displayPosition: 'bottom' },
      { url: 'sample2', msg: 'sample2', backgroundColor: '222222', displayPosition: 'top'    },
    ],
  }));
});

QUnit.test('import json - error - pattern - url is number', function(assert) {
  assert.notOk(this.isValid({
    version: 2,
    pattern: [
      { url: 'sample1', msg: 'sample1', backgroundColor: '111111', displayPosition: 'bottom' },
      { url: 100,       msg: 'sample2', backgroundColor: '222222', displayPosition: 'top'    },
    ],
  }));

  assert.notOk(this.isValid({
    version: 2,
    pattern: [
      { url: 100,       msg: 'sample1', backgroundColor: '111111', displayPosition: 'bottom' },
      { url: 'sample2', msg: 'sample2', backgroundColor: '222222', displayPosition: 'top'    },
    ],
  }));
});

QUnit.test('import json - error - pattern - url is empty string', function(assert) {
  assert.notOk(this.isValid({
    version: 2,
    pattern: [
      { url: 'sample1', msg: 'sample1', backgroundColor: '111111', displayPosition: 'bottom' },
      { url: '',        msg: 'sample2', backgroundColor: '222222', displayPosition: 'top'    },
    ],
  }));

  assert.notOk(this.isValid({
    version: 2,
    pattern: [
      { url: '',        msg: 'sample1', backgroundColor: '111111', displayPosition: 'bottom' },
      { url: 'sample2', msg: 'sample2', backgroundColor: '222222', displayPosition: 'top'    },
    ],
  }));
});

QUnit.test('import json - error - pattern - msg is not defined', function(assert) {
  assert.notOk(this.isValid({
    version: 2,
    pattern: [
      { url: 'sample1', msg: 'sample1', backgroundColor: '111111', displayPosition: 'bottom' },
      { url: 'sample2',                 backgroundColor: '222222', displayPosition: 'top'    },
    ],
  }));

  assert.notOk(this.isValid({
    version: 2,
    pattern: [
      { url: 'sample1',                 backgroundColor: '111111', displayPosition: 'bottom' },
      { url: 'sample2', msg: 'sample2', backgroundColor: '222222', displayPosition: 'top'    },
    ],
  }));
});

QUnit.test('import json - error - pattern - msg is null', function(assert) {
  assert.notOk(this.isValid({
    version: 2,
    pattern: [
      { url: 'sample1', msg: 'sample1', backgroundColor: '111111', displayPosition: 'bottom' },
      { url: 'sample2', msg: null,      backgroundColor: '222222', displayPosition: 'top'    },
    ],
  }));

  assert.notOk(this.isValid({
    version: 2,
    pattern: [
      { url: 'sample1', msg: null,      backgroundColor: '111111', displayPosition: 'bottom' },
      { url: 'sample2', msg: 'sample2', backgroundColor: '222222', displayPosition: 'top'    },
    ],
  }));
});

QUnit.test('import json - error - pattern - msg is true', function(assert) {
  assert.notOk(this.isValid({
    version: 2,
    pattern: [
      { url: 'sample1', msg: 'sample1', backgroundColor: '111111', displayPosition: 'bottom' },
      { url: 'sample2', msg: true,      backgroundColor: '222222', displayPosition: 'top'    },
    ],
  }));

  assert.notOk(this.isValid({
    version: 2,
    pattern: [
      { url: 'sample1', msg: true,      backgroundColor: '111111', displayPosition: 'bottom' },
      { url: 'sample2', msg: 'sample2', backgroundColor: '222222', displayPosition: 'top'    },
    ],
  }));
});

QUnit.test('import json - error - pattern - msg is false', function(assert) {
  assert.notOk(this.isValid({
    version: 2,
    pattern: [
      { url: 'sample1', msg: 'sample1', backgroundColor: '111111', displayPosition: 'bottom' },
      { url: 'sample2', msg: false,     backgroundColor: '222222', displayPosition: 'top'    },
    ],
  }));

  assert.notOk(this.isValid({
    version: 2,
    pattern: [
      { url: 'sample1', msg: false,     backgroundColor: '111111', displayPosition: 'bottom' },
      { url: 'sample2', msg: 'sample2', backgroundColor: '222222', displayPosition: 'top'    },
    ],
  }));
});

QUnit.test('import json - error - pattern - msg is number', function(assert) {
  assert.notOk(this.isValid({
    version: 2,
    pattern: [
      { url: 'sample1', msg: 'sample1', backgroundColor: '111111', displayPosition: 'bottom' },
      { url: 'sample2', msg: 100,       backgroundColor: '222222', displayPosition: 'top'    },
    ],
  }));

  assert.notOk(this.isValid({
    version: 2,
    pattern: [
      { url: 'sample1', msg: 100,       backgroundColor: '111111', displayPosition: 'bottom' },
      { url: 'sample2', msg: 'sample2', backgroundColor: '222222', displayPosition: 'top'    },
    ],
  }));
});

QUnit.test('import json - error - pattern - msg is empty string', function(assert) {
  assert.notOk(this.isValid({
    version: 2,
    pattern: [
      { url: 'sample1', msg: 'sample1', backgroundColor: '111111', displayPosition: 'bottom' },
      { url: 'sample2', msg: '',        backgroundColor: '222222', displayPosition: 'top'    },
    ],
  }));

  assert.notOk(this.isValid({
    version: 2,
    pattern: [
      { url: 'sample1', msg: '',        backgroundColor: '111111', displayPosition: 'bottom' },
      { url: 'sample2', msg: 'sample2', backgroundColor: '222222', displayPosition: 'top'    },
    ],
  }));
});

QUnit.test('import json - error - pattern - backgroundColor is not defined', function(assert) {
  assert.notOk(this.isValid({
    version: 2,
    pattern: [
      { url: 'sample1', msg: 'sample1', backgroundColor: '111111', displayPosition: 'bottom' },
      { url: 'sample2', msg: 'sample2',                            displayPosition: 'top'    },
    ],
  }));

  assert.notOk(this.isValid({
    version: 2,
    pattern: [
      { url: 'sample1', msg: 'sample1',                            displayPosition: 'bottom' },
      { url: 'sample2', msg: 'sample2', backgroundColor: '222222', displayPosition: 'top'    },
    ],
  }));
});

QUnit.test('import json - error - pattern - backgroundColor is null', function(assert) {
  assert.notOk(this.isValid({
    version: 2,
    pattern: [
      { url: 'sample1', msg: 'sample1', backgroundColor: '111111', displayPosition: 'bottom' },
      { url: 'sample2', msg: 'sample2', backgroundColor: null,     displayPosition: 'top'    },
    ],
  }));

  assert.notOk(this.isValid({
    version: 2,
    pattern: [
      { url: 'sample1', msg: 'sample1', backgroundColor: null,     displayPosition: 'bottom' },
      { url: 'sample2', msg: 'sample2', backgroundColor: '222222', displayPosition: 'top'    },
    ],
  }));
});

QUnit.test('import json - error - pattern - backgroundColor is true', function(assert) {
  assert.notOk(this.isValid({
    version: 2,
    pattern: [
      { url: 'sample1', msg: 'sample1', backgroundColor: '111111', displayPosition: 'bottom' },
      { url: 'sample2', msg: 'sample2', backgroundColor: true,     displayPosition: 'top'    },
    ],
  }));

  assert.notOk(this.isValid({
    version: 2,
    pattern: [
      { url: 'sample1', msg: 'sample1', backgroundColor: true,     displayPosition: 'bottom' },
      { url: 'sample2', msg: 'sample2', backgroundColor: '222222', displayPosition: 'top'    },
    ],
  }));
});

QUnit.test('import json - error - pattern - backgroundColor is false', function(assert) {
  assert.notOk(this.isValid({
    version: 2,
    pattern: [
      { url: 'sample1', msg: 'sample1', backgroundColor: '111111', displayPosition: 'bottom' },
      { url: 'sample2', msg: 'sample2', backgroundColor: false,    displayPosition: 'top'    },
    ],
  }));

  assert.notOk(this.isValid({
    version: 2,
    pattern: [
      { url: 'sample1', msg: 'sample1', backgroundColor: false,    displayPosition: 'bottom' },
      { url: 'sample2', msg: 'sample2', backgroundColor: '222222', displayPosition: 'top'    },
    ],
  }));
});

QUnit.test('import json - error - pattern - backgroundColor is empty string', function(assert) {
  assert.notOk(this.isValid({
    version: 2,
    pattern: [
      { url: 'sample1', msg: 'sample1', backgroundColor: '111111', displayPosition: 'bottom' },
      { url: 'sample2', msg: 'sample2', backgroundColor: '',       displayPosition: 'top'    },
    ],
  }));

  assert.notOk(this.isValid({
    version: 2,
    pattern: [
      { url: 'sample1', msg: 'sample1', backgroundColor: '',       displayPosition: 'bottom' },
      { url: 'sample2', msg: 'sample2', backgroundColor: '222222', displayPosition: 'top'    },
    ],
  }));
});

QUnit.test('import json - error - pattern - backgroundColor is not hex color', function(assert) {
  assert.notOk(this.isValid({
    version: 2,
    pattern: [
      { url: 'sample1', msg: 'sample1', backgroundColor: '111111', displayPosition: 'bottom' },
      { url: 'sample2', msg: 'sample2', backgroundColor: '12345z', displayPosition: 'top'    },
    ],
  }));

  assert.notOk(this.isValid({
    version: 2,
    pattern: [
      { url: 'sample1', msg: 'sample1', backgroundColor: '111111', displayPosition: 'bottom' },
      { url: 'sample2', msg: 'sample2', backgroundColor: 'black',  displayPosition: 'top'    },
    ],
  }));

  assert.notOk(this.isValid({
    version: 2,
    pattern: [
      { url: 'sample1', msg: 'sample1', backgroundColor: '12345z', displayPosition: 'bottom' },
      { url: 'sample2', msg: 'sample2', backgroundColor: '222222', displayPosition: 'top'    },
    ],
  }));

  assert.notOk(this.isValid({
    version: 2,
    pattern: [
      { url: 'sample1', msg: 'sample1', backgroundColor: 'black',  displayPosition: 'bottom' },
      { url: 'sample2', msg: 'sample2', backgroundColor: '222222', displayPosition: 'top'    },
    ],
  }));
});

QUnit.test('import json - error - pattern - displayPosition is not defined', function(assert) {
  assert.notOk(this.isValid({
    version: 2,
    pattern: [
      { url: 'sample1', msg: 'sample1', backgroundColor: '111111', displayPosition: 'top' },
      { url: 'sample2', msg: 'sample2', backgroundColor: '222222'                         },
    ],
  }));

  assert.notOk(this.isValid({
    version: 2,
    pattern: [
      { url: 'sample1', msg: 'sample1', backgroundColor: '111111'                            },
      { url: 'sample2', msg: 'sample2', backgroundColor: '222222', displayPosition: 'bottom' },
    ],
  }));
});

QUnit.test('import json - error - pattern - displayPosition is null', function(assert) {
  assert.notOk(this.isValid({
    version: 2,
    pattern: [
      { url: 'sample1', msg: 'sample1', backgroundColor: '111111', displayPosition: 'top' },
      { url: 'sample2', msg: 'sample2', backgroundColor: '222222', displayPosition: null  },
    ],
  }));

  assert.notOk(this.isValid({
    version: 2,
    pattern: [
      { url: 'sample1', msg: 'sample1', backgroundColor: '111111', displayPosition: null     },
      { url: 'sample2', msg: 'sample2', backgroundColor: '222222', displayPosition: 'bottom' },
    ],
  }));
});

QUnit.test('import json - error - pattern - displayPosition is bool', function(assert) {
  assert.notOk(this.isValid({
    version: 2,
    pattern: [
      { url: 'sample1', msg: 'sample1', backgroundColor: '111111', displayPosition: 'top' },
      { url: 'sample2', msg: 'sample2', backgroundColor: '222222', displayPosition: true  },
    ],
  }));

  assert.notOk(this.isValid({
    version: 2,
    pattern: [
      { url: 'sample1', msg: 'sample1', backgroundColor: '111111', displayPosition: false    },
      { url: 'sample2', msg: 'sample2', backgroundColor: '222222', displayPosition: 'bottom' },
    ],
  }));
});

QUnit.test('import json - error - pattern - displayPosition is number', function(assert) {
  assert.notOk(this.isValid({
    version: 2,
    pattern: [
      { url: 'sample1', msg: 'sample1', backgroundColor: '111111', displayPosition: 'top' },
      { url: 'sample2', msg: 'sample2', backgroundColor: '222222', displayPosition: 123   },
    ],
  }));

  assert.notOk(this.isValid({
    version: 2,
    pattern: [
      { url: 'sample1', msg: 'sample1', backgroundColor: '111111', displayPosition: 123      },
      { url: 'sample2', msg: 'sample2', backgroundColor: '222222', displayPosition: 'bottom' },
    ],
  }));
});

QUnit.test('import json - error - pattern - displayPosition is empty string', function(assert) {
  assert.notOk(this.isValid({
    version: 2,
    pattern: [
      { url: 'sample1', msg: 'sample1', backgroundColor: '111111', displayPosition: 'top' },
      { url: 'sample2', msg: 'sample2', backgroundColor: '222222', displayPosition: ''    },
    ],
  }));

  assert.notOk(this.isValid({
    version: 2,
    pattern: [
      { url: 'sample1', msg: 'sample1', backgroundColor: '111111', displayPosition: ''       },
      { url: 'sample2', msg: 'sample2', backgroundColor: '222222', displayPosition: 'bottom' },
    ],
  }));
});

QUnit.test('import json - error - pattern - displayPosition is invalid string', function(assert) {
  assert.notOk(this.isValid({
    version: 2,
    pattern: [
      { url: 'sample1', msg: 'sample1', backgroundColor: '111111', displayPosition: 'top' },
      { url: 'sample2', msg: 'sample2', backgroundColor: '222222', displayPosition: 'foo' },
    ],
  }));

  assert.notOk(this.isValid({
    version: 2,
    pattern: [
      { url: 'sample1', msg: 'sample1', backgroundColor: '111111', displayPosition: 'top' },
      { url: 'sample2', msg: 'sample2', backgroundColor: '222222', displayPosition: 'Bottom' },
    ],
  }));

  assert.notOk(this.isValid({
    version: 2,
    pattern: [
      { url: 'sample1', msg: 'sample1', backgroundColor: '111111', displayPosition: 'top' },
      { url: 'sample2', msg: 'sample2', backgroundColor: '222222', displayPosition: 'BOTTOM' },
    ],
  }));

  assert.notOk(this.isValid({
    version: 2,
    pattern: [
      { url: 'sample1', msg: 'sample1', backgroundColor: '111111', displayPosition: 'bar'    },
      { url: 'sample2', msg: 'sample2', backgroundColor: '222222', displayPosition: 'bottom' },
    ],
  }));

  assert.notOk(this.isValid({
    version: 2,
    pattern: [
      { url: 'sample1', msg: 'sample1', backgroundColor: '111111', displayPosition: 'Top'    },
      { url: 'sample2', msg: 'sample2', backgroundColor: '222222', displayPosition: 'bottom' },
    ],
  }));

  assert.notOk(this.isValid({
    version: 2,
    pattern: [
      { url: 'sample1', msg: 'sample1', backgroundColor: '111111', displayPosition: 'TOP'    },
      { url: 'sample2', msg: 'sample2', backgroundColor: '222222', displayPosition: 'bottom' },
    ],
  }));
});

QUnit.test('import json - ok', function(assert) {
  assert.ok(this.isValid({
    version: 2,
    pattern: [
      { url: 'sample1', msg: 'sample1', backgroundColor: '111111', displayPosition: 'top'    },
      { url: 'sample2', msg: 'sample2', backgroundColor: '222222', displayPosition: 'bottom' },
    ],
  }));

  assert.ok(this.isValid({
    version: 2,
    pattern: [
      { url: 'sample1', msg: 'sample1', backgroundColor: '111111', displayPosition: 'bottom' },
      { url: 'sample2', msg: 'sample2', backgroundColor: '222222', displayPosition: 'top'    },
    ],
  }));
});
