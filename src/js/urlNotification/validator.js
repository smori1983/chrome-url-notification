var urlNotification = urlNotification || {};

urlNotification.validator = (function() {
  var extend = require('extend');

  var create = function() {
    return new (require('jsonschema').Validator)();
  };

  /**
   * @param {object} json
   * @returns {boolean}
   */
  var importJsonEssential = function(json) {
    var schema = {
      'type': 'object',
      'properties': {
        'version': {
          'required': true,
          'type': 'integer',
          'minimum': 1,
          'maximum': urlNotification.config.version(),
        },
        'pattern': {
          'required': true,
          'type': 'array',
        },
      },
    };

    var validator = create();

    return validator.validate(json, schema).valid;
  };

  var patternBase = function() {
    return {
      'type': 'array',
      'items': { '$ref': '/item' },
    };
  };

  var patternTemplate = function() {
    return {
      'id': '/item',
      'properties': {},
    };
  };

  var patternV1 = function() {
    return extend(patternTemplate(), {
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

  var patternV2 = function() {
    return extend(patternV1(), {
      'properties': {
        'displayPosition': {
          'required': true,
          'type': 'string',
          'pattern': /^(bottom|top)$/,
        },
      },
    });
  };

  var patterns = {
    1: patternV1,
    2: patternV2,
  };

  var patternFor = function(version) {
    if (patterns.hasOwnProperty(version)) {
      return patterns[version]();
    }

    return {};
  };

  /**
   * @param {object} json
   * @returns {boolean}
   */
  var importJson = function(json) {
    var validator = create();

    if (importJsonEssential(json) === false) {
      return false;
    }

    validator.addSchema(patternFor(json.version), '/item');

    return validator.validate(json.pattern, patternBase()).valid;
  };

  return {
    forImportJsonEssential: importJsonEssential,
    forImportJson: importJson,
  };
})();
