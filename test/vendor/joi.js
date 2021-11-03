const { describe, it } = require('mocha');
const assert = require('assert');
const Joi = require('joi');

describe('vendor.joi', () => {
  describe('extend', () => {
    it('string.hexColor', () => {
      /**
       * @type {Joi.Root}
       */
      const custom = Joi.extend({
        type: 'string',
        rules: {
          hexColor: {
            method() {
              return this.$_addRule({
                name: 'hexColor',
              });
            },
            validate(value, helpers) {
              if (/^#[0-9a-f]{6}$/i.test(value) === false) {
                return helpers.error('string.hexColor');
              }
            },
          },
        },
        messages: {
          'string.hexColor': 'The error message of string.hexColor',
        },
      });

      const schema = custom.object({
        value1: custom.string().required().hexColor(),
        value2: custom.string().required().hexColor(),
        value3: custom.string().required().hexColor(),
      });

      const input = {
        value1: '#000000',
        value2: '#ffffff',
        value3: '#zzzzzz',
      };

      const result = schema.validate(input, {
        abortEarly: false,
      });

      assert.deepStrictEqual(result.error.details.length, 1);
      assert.deepStrictEqual(result.error.details[0].message, 'The error message of string.hexColor');
      assert.deepStrictEqual(result.error.details[0].path, ['value3']);
      assert.deepStrictEqual(result.error.details[0].type, 'string.hexColor');
    });

    it('string.in', () => {
      /**
       * @type {Joi.Root}
       */
      const custom = Joi.extend({
        type: 'string',
        rules: {
          in: {
            args: ['list'],
            method(list) {
              return this.$_addRule({
                name: 'in',
                args: {list},
              });
            },
            validate(value, helpers, { list }, options) {
              if (list.indexOf(value) < 0) {
                return helpers.error('string.in');
              }
            },
          },
        },
        messages: {
          'string.in': 'The error message of string.in',
        },
      });

      const schema = custom.object({
        value1: custom.string().required().in(['a', 'b', 'c']),
        value2: custom.string().required().in(['a', 'b', 'c']),
        value3: custom.string().required().in(['a', 'b', 'c']),
      });

      const input = {
        value1: 'x',
        value2: 'b',
        value3: 'z',
      };

      const result = schema.validate(input, {
        abortEarly: false,
      });

      assert.deepStrictEqual(result.error.details.length, 2);
      assert.deepStrictEqual(result.error.details[0].message, 'The error message of string.in');
      assert.deepStrictEqual(result.error.details[0].path, ['value1']);
      assert.deepStrictEqual(result.error.details[0].type, 'string.in');
      assert.deepStrictEqual(result.error.details[1].message, 'The error message of string.in');
      assert.deepStrictEqual(result.error.details[1].path, ['value3']);
      assert.deepStrictEqual(result.error.details[1].type, 'string.in');
    });
  });
});