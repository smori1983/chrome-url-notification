const Validator = require('jsonschema').Validator;
const deepMerge = require('deepmerge');
const config = require('./config');

const schemaForEssentialPart = () => {
  return {
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
};

const patternBase = () => {
  return {
    'type': 'array',
    'items': { '$ref': '/item' },
  };
};

const patternTemplate = () => {
  return {
    'id': '/item',
    'properties': {},
    'additionalProperties': false,
  };
};

const patternV1 = () => {
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
        'pattern': '^[0-9a-fA-F]{6}$',
      },
    },
    'required': [
      'url',
      'msg',
      'backgroundColor',
    ],
  });
};

const patternV2 = () => {
  return deepMerge(patternV1(), {
    'properties': {
      'displayPosition': {
        'type': 'string',
        'pattern': '^(bottom|top)$',
      },
    },
    'required': [
      'displayPosition',
    ],
  });
};

const patternV3 = () => {
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

const patternV4 = () => {
  return deepMerge(patternV3(), {
    'properties': {
      'displayPosition': {
        'pattern': '^(bottom|bottom_left|bottom_right|top|top_left|top_right)$',
      },
    },
  });
};

const patterns = {
  1: patternV1,
  2: patternV2,
  3: patternV3,
  4: patternV4,
};

const patternFor = (version) => {
  return patterns[version]();
};

/**
 * @param {object} json
 * @returns {boolean}
 */
const validateEssentialPart = (json) => {
  const validator = new Validator();

  return validator.validate(json, schemaForEssentialPart()).valid;
};

/**
 * @param {object} json
 * @returns {boolean}
 */
const validatePatternPart = (json) => {
  const validator = new Validator();

  validator.addSchema(patternFor(json.version), '/item');

  return validator.validate(json.pattern, patternBase()).valid;
};

/**
 * @param {object} json
 * @returns {boolean}
 */
const importJson = (json) => {
  return validateEssentialPart(json) && validatePatternPart(json);
};

module.exports.forImportJson = importJson;
