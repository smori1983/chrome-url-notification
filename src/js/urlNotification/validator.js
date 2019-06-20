'use strict';

const Validator = require('jsonschema').Validator;
const extend = require('extend');
const config = require('./config');

const create = function() {
  return new Validator();
};

/**
 * @param {object} json
 * @returns {boolean}
 */
const importJsonEssential = function(json) {
  const schema = {
    'type': 'object',
    'properties': {
      'version': {
        'required': true,
        'type': 'integer',
        'minimum': 1,
        'maximum': config.version(),
      },
      'pattern': {
        'required': true,
        'type': 'array',
      },
    },
  };

  const validator = create();

  return validator.validate(json, schema).valid;
};

const patternBase = function() {
  return {
    'type': 'array',
    'items': { '$ref': '/item' },
  };
};

const patternTemplate = function() {
  return {
    'id': '/item',
    'properties': {},
  };
};

const patternV1 = function() {
  return extend(true, patternTemplate(), {
    'properties': {
      'url': {
        'required': true,
        'type': 'string',
        'minLength': 1,
      },
      'msg': {
        'required': true,
        'type': 'string',
        'minLength': 1,
      },
      'backgroundColor': {
        'required': true,
        'type': 'string',
        'pattern': /^[0-9a-f]{6}$/i,
      },
    },
  });
};

const patternV2 = function() {
  return extend(true, patternV1(), {
    'properties': {
      'displayPosition': {
        'required': true,
        'type': 'string',
        'pattern': /^(bottom|top)$/,
      },
    },
  });
};

const patterns = {
  1: patternV1,
  2: patternV2,
};

const patternFor = function(version) {
  if (patterns.hasOwnProperty(version)) {
    return patterns[version]();
  }

  return {};
};

/**
 * @param {object} json
 * @returns {boolean}
 */
const importJson = function(json) {
  const validator = create();

  if (importJsonEssential(json) === false) {
    return false;
  }

  validator.addSchema(patternFor(json.version), '/item');

  return validator.validate(json.pattern, patternBase()).valid;
};

module.exports.forImportJsonEssential = importJsonEssential;
module.exports.forImportJson = importJson;
