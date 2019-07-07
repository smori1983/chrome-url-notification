'use strict';

const Validator = require('jsonschema').Validator;
const deepMerge = require('deepmerge');
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
        'type': 'integer',
        'minimum': 1,
        'maximum': config.version(),
      },
      'pattern': {
        'type': 'array',
      },
    },
    'required': [
      'version',
      'pattern',
    ],
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
  return deepMerge(patternTemplate(), {
    'type': 'object',
    'properties': {
      'url': {
        'type': 'string',
        'minLength': 1,
      },
      'msg': {
        'type': 'string',
        'minLength': 1,
      },
      'backgroundColor': {
        'type': 'string',
        'pattern': /^[0-9a-f]{6}$/i,
      },
    },
    'required': [
      'url',
      'msg',
      'backgroundColor',
    ],
  });
};

const patternV2 = function() {
  return deepMerge(patternV1(), {
    'properties': {
      'displayPosition': {
        'type': 'string',
        'pattern': /^(bottom|top)$/,
      },
    },
    'required': [
      'displayPosition',
    ],
  });
};

const patternV3 = function() {
  return deepMerge(patternV2(), {
    'properties': {
      'status': {
        'type': 'integer',
        'minimum': 0,
        'maximum': 1,
      },
    },
    'required': [
      'status',
    ],
  });
};

const patterns = {
  1: patternV1,
  2: patternV2,
  3: patternV3,
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
