const { describe, it } = require('mocha');
const assert = require('assert');
const _ = require('lodash');

describe('vendor.lodash', function() {
  it('cloneDeep - array', function() {
    const source = [1, 2, 3];

    const cloned = _.cloneDeep(source);

    source[1] = 222;

    cloned[0] = 999;

    assert.deepStrictEqual(source, [1, 222, 3]);

    assert.deepStrictEqual(cloned, [999, 2, 3]);
  });

  it('cloneDeep - flat object', function() {
    const source = {
      'key1': 'value1',
      'key2': 'value2',
    };

    const cloned = _.cloneDeep(source);

    source.key2 = 'value2-edit-in-source';

    cloned.key1 = 'value1-edit-in-cloned';

    assert.deepStrictEqual(source, {
      'key1': 'value1',
      'key2': 'value2-edit-in-source',
    });

    assert.deepStrictEqual(cloned, {
      'key1': 'value1-edit-in-cloned',
      'key2': 'value2',
    });
  });

  it('cloneDeep - nested object', function() {
    const source = {
      'key1': 'value1',
      'key2': {
        'key21': 'value21',
        'key22': 'value22',
      },
    };

    const cloned = _.cloneDeep(source);

    source.key2.key22 = 'value22-edit-in-source';

    cloned.key2.key21 = 'value21-edit-in-cloned';

    assert.deepStrictEqual(source, {
      'key1': 'value1',
      'key2': {
        'key21': 'value21',
        'key22': 'value22-edit-in-source',
      },
    });

    assert.deepStrictEqual(cloned, {
      'key1': 'value1',
      'key2': {
        'key21': 'value21-edit-in-cloned',
        'key22': 'value22',
      },
    });
  });
});
