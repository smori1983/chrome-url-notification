const describe = require('mocha').describe;
const it = require('mocha').it;
const assert = require('assert');
const Validator = require('jsonschema').Validator;

describe('vendor.jsonschema', function() {
  it('object - permit additional properties', function() {
    const schema = {
      'type': 'object',
      'properties': {
        'key1': {
          'type': 'string',
        },
      },
      'required': [
        'key1',
      ],
    };

    const input = {
      'key1': 'value1',
      'key2': 'value2',
    };

    const validator = new Validator();

    const result = validator.validate(input, schema).valid;

    assert.strictEqual(result, true);
  });

  it('object - prohibit additional properties', function() {
    const schema = {
      'type': 'object',
      'properties': {
        'key1': {
          'type': 'string',
        },
      },
      'required': [
        'key1',
      ],
      'additionalProperties': false,
    };

    const input = {
      'key1': 'value1',
      'key2': 'value2',
    };

    const validator = new Validator();

    const result = validator.validate(input, schema).valid;

    assert.strictEqual(result, false);
  });
});
