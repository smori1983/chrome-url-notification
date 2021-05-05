const { describe, it } = require('mocha');
const assert = require('assert');
const deepMerge = require('deepmerge');

describe('vendor.deepmerge', () => {
  it('deepmerge - string', () => {
    const data1 = {
      'key': 'value1',
    };

    const data2 = {
      'key': 'value2',
    };

    const result = deepMerge(data1, data2);

    assert.deepStrictEqual(data1, {
      'key': 'value1',
    });

    assert.deepStrictEqual(data2, {
      'key': 'value2',
    });

    assert.deepStrictEqual(result, {
      'key': 'value2',
    });
  });

  it('deepmerge - string array', () => {
    const data1 = {
      'key': ['a', 'b'],
    };

    const data2 = {
      'key': ['c'],
    };

    const result = deepMerge(data1, data2);

    assert.deepStrictEqual(data1, {
      'key': ['a', 'b'],
    });

    assert.deepStrictEqual(data2, {
      'key': ['c'],
    });

    assert.deepStrictEqual(result, {
      'key': ['a', 'b', 'c'],
    });
  });

  it('deepmerge - object', () => {
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

    const result = deepMerge(data1, data2);

    assert.deepStrictEqual(data1, {
      'key1': {
        'prop1': 'value1',
      },
      'key2': {
        'prop1': 'value1',
      },
    });

    assert.deepStrictEqual(data2, {
      'key1': {
        'prop2': 'value2',
      },
      'key2': {
        'prop1': 'value2',
        'prop2': 'value2',
      },
    });

    assert.deepStrictEqual(result, {
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
});
