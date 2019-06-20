QUnit.module('vendor.extend', {
  beforeEach: function() {
    this.deepMerge = require('deepmerge');
  },
});

QUnit.test('deepmerge - string', function(assert) {
  const data1 = {
    'key': 'value1',
  };

  const data2 = {
    'key': 'value2',
  };

  const result = this.deepMerge(data1, data2);

  assert.propEqual(data1, {
    'key': 'value1',
  });

  assert.propEqual(data2, {
    'key': 'value2',
  });

  assert.propEqual(result, {
    'key': 'value2',
  });
});

QUnit.test('deepmerge - string array', function (assert) {
  const data1 = {
    'key': ['a', 'b'],
  };

  const data2 = {
    'key': ['c'],
  };

  const result = this.deepMerge(data1, data2);

  assert.propEqual(data1, {
    'key': ['a', 'b'],
  });

  assert.propEqual(data2, {
    'key': ['c'],
  });

  assert.propEqual(result, {
    'key': ['a', 'b', 'c'],
  });
});

QUnit.test('deepmerge - object', function (assert) {
  const data1 = {
    'key1': {
      'prop1': 'value1',
    },
    'key2': {
      'prop1': 'value1',
    },
  };

  const data2 = {
    'key1': {
      'prop2': 'value2',
    },
    'key2': {
      'prop1': 'value2',
      'prop2': 'value2',
    },
  };

  const result = this.deepMerge(data1, data2);

  assert.propEqual(data1, {
    'key1': {
      'prop1': 'value1',
    },
    'key2': {
      'prop1': 'value1',
    },
  });

  assert.propEqual(data2, {
    'key1': {
      'prop2': 'value2',
    },
    'key2': {
      'prop1': 'value2',
      'prop2': 'value2',
    },
  });

  assert.propEqual(result, {
    'key1': {
      'prop1': 'value1',
      'prop2': 'value2',
    },
    'key2': {
      'prop1': 'value2',
      'prop2': 'value2',
    },
  });
});
