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
            validate(value, helpers, { list }) {
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

    it('string.existingUrl', () => {
      /**
       * @type {Joi.Root}
       */
      const custom = Joi.extend({
        type: 'string',
        rules: {
          existingUrl: {
            args: ['mode', 'originalUrl'],
            method(mode, originalUrl) {
              return this.$_addRule({
                name: 'existingUrl',
                args: {mode, originalUrl},
              });
            },
            validate(value, helpers, { mode, originalUrl }) {
              // example code for testing.
              const registered = ['a.example.com', 'z.example.com'];

              if (mode === 'add') {
                if (registered.indexOf(value) >= 0) {
                  return helpers.error('string.existingUrl');
                }
              }

              if (mode === 'edit') {
                if (value !== originalUrl && registered.indexOf(value) >= 0) {
                  return helpers.error('string.existingUrl');
                }
              }
            },
          },
        },
        messages: {
          'string.existingUrl': 'The error message of string.existingUrl',
        },
      });

      const schema = custom.object({
        value1: custom.string().required().existingUrl('add'),
        value2: custom.string().required().existingUrl('add'),
        value3: custom.string().required().existingUrl('edit', 'z.example.com'),
        value4: custom.string().required().existingUrl('edit', 'z.example.com'),
        value5: custom.string().required().existingUrl('edit', 'z.example.com'),
      });

      const input = {
        value1: 'a.example.com',
        value2: 'b.example.com',
        value3: 'a.example.com',
        value4: 'b.example.com',
        value5: 'z.example.com',
      };

      const result = schema.validate(input, {
        abortEarly: false,
      });

      assert.deepStrictEqual(result.error.details.length, 2);
      assert.deepStrictEqual(result.error.details[0].message, 'The error message of string.existingUrl');
      assert.deepStrictEqual(result.error.details[0].path, ['value1']);
      assert.deepStrictEqual(result.error.details[0].type, 'string.existingUrl');
      assert.deepStrictEqual(result.error.details[1].message, 'The error message of string.existingUrl');
      assert.deepStrictEqual(result.error.details[1].path, ['value3']);
      assert.deepStrictEqual(result.error.details[1].type, 'string.existingUrl');
    });
  });
});
