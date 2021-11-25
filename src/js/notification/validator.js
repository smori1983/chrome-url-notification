const deepMerge = require('deepmerge');
const JsonschemaValidator = require('jsonschema').Validator;
const Config = require('./config');

class Validator {
  constructor() {
    /**
     * @type {Config}
     * @private
     */
    this._config = new Config();

    /**
     * @type {PatternGeneration[]}
     * @private
     */
    this._generations = [];
    this._generations.push(new PatternV1());
    this._generations.push(new PatternV2());
    this._generations.push(new PatternV3());
    this._generations.push(new PatternV4());
  }

  /**
   * @param {object} json
   * @returns {boolean}
   */
  forImportJson(json) {
    return this._validateEssentialPart(json) && this._validatePatternPart(json);
  }

  /**
   * @param {PatternItem} pattern
   * @returns {boolean}
   */
  forUpdatePattern(pattern) {
    const dataForValidation = {
      version: this._config.version(),
      pattern: [pattern],
    };

    return this.forImportJson(dataForValidation);
  }

  /**
   * @param {object} json
   * @returns {boolean}
   * @private
   */
  _validateEssentialPart(json) {
    const validator = new JsonschemaValidator();

    return validator.validate(json, this._schemaForEssentialPart()).valid;
  }

  _schemaForEssentialPart() {
    return {
      'type': 'object',
      'properties': {
        'version': {
          'type': 'integer',
          'minimum': 1,
          'maximum': this._config.version(),
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
  }

  /**
   * @param {object} json
   * @returns {boolean}
   * @private
   */
  _validatePatternPart(json) {
    const validator = new JsonschemaValidator();

    validator.addSchema(this._patternFor(json.version), '/item');

    return validator.validate(json.pattern, this._patternBase()).valid;
  }

  /**
   * @param {number} version
   * @returns {Object}
   * @throws {Error}
   * @private
   */
  _patternFor(version) {
    for (let i = 0, len = this._generations.length; i < len; i++) {
      if (this._generations[i].supports(version)) {
        return this._generations[i].get();
      }
    }

    throw new Error('Validator not defined for version: ' + version);
  }

  /**
   * @private
   */
  _patternBase() {
    return {
      'type': 'array',
      'items': { '$ref': '/item' },
    };
  }
}

class PatternGeneration {
  /**
   * @param {number} version
   * @returns {boolean}
   */
  supports(version) {
  }

  /**
   * @returns {Object}
   */
  get() {
  }

  /**
   * @returns {Object}
   * @protected
   */
  _patternTemplate() {
    return {
      'id': '/item',
      'properties': {},
      'additionalProperties': false,
    };
  }
}

class PatternV1 extends PatternGeneration {
  supports(version) {
    return version === 1;
  }

  get() {
    return deepMerge(this._patternTemplate(), {
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
  }
}

class PatternV2 extends PatternGeneration {
  supports(version) {
    return version === 2;
  }

  get() {
    const v1 = new PatternV1();

    return deepMerge(v1.get(), {
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
  }
}

class PatternV3 extends PatternGeneration {
  supports(version) {
    return version === 3;
  }

  get() {
    const v2 = new PatternV2();

    return deepMerge(v2.get(), {
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
  }
}

class PatternV4 extends PatternGeneration {
  supports(version) {
    return version === 4;
  }

  get() {
    const v3 = new PatternV3();

    return deepMerge(v3.get(), {
      'properties': {
        'displayPosition': {
          'pattern': '^(bottom|bottom_left|bottom_right|top|top_left|top_right)$',
        },
      },
    });
  }
}

module.exports = Validator;
