const { it } = require('mocha');
const assert = require('assert');
const _ = require('lodash');
const deepMerge = require('deepmerge');
const testUtil = require('../../../test_lib/util');

/**
 * @param {number} version
 * @param {PatternItem} validPattern
 */
module.exports.runUrl = function (version, validPattern) {
  it('error - url is not defined', function () {
    const cloned = _.cloneDeep(validPattern);
    delete cloned.url;

    assert.ok(testUtil.isNotValidJson({
      version: version,
      pattern: [cloned],
    }));
  });

  it('error - url is null', function () {
    assert.ok(testUtil.isNotValidJson({
      version: version,
      pattern: [deepMerge(validPattern, {url: null})],
    }));
  });

  it('error - url is true', function () {
    assert.ok(testUtil.isNotValidJson({
      version: version,
      pattern: [deepMerge(validPattern, {url: true})],
    }));
  });

  it('error - url is false', function () {
    assert.ok(testUtil.isNotValidJson({
      version: version,
      pattern: [deepMerge(validPattern, {url: false})],
    }));
  });

  it('error - url is number', function () {
    assert.ok(testUtil.isNotValidJson({
      version: version,
      pattern: [deepMerge(validPattern, {url: 100})],
    }));
  });

  it('error - url is empty string', function () {
    assert.ok(testUtil.isNotValidJson({
      version: version,
      pattern: [deepMerge(validPattern, {url: ''})],
    }));
  });
};

/**
 * @param {number} version
 * @param {PatternItem} validPattern
 */
module.exports.runMsg = function (version, validPattern) {
  it('error - msg is not defined', function () {
    const cloned = _.cloneDeep(validPattern);
    delete cloned.msg;

    assert.ok(testUtil.isNotValidJson({
      version: version,
      pattern: [cloned],
    }));
  });

  it('error - msg is null', function () {
    assert.ok(testUtil.isNotValidJson({
      version: version,
      pattern: [deepMerge(validPattern, {msg: null})],
    }));
  });

  it('error - msg is true', function () {
    assert.ok(testUtil.isNotValidJson({
      version: version,
      pattern: [deepMerge(validPattern, {msg: true})],
    }));
  });

  it('error - msg is false', function () {
    assert.ok(testUtil.isNotValidJson({
      version: version,
      pattern: [deepMerge(validPattern, {msg: false})],
    }));
  });

  it('error - msg is number', function () {
    assert.ok(testUtil.isNotValidJson({
      version: version,
      pattern: [deepMerge(validPattern, {msg: 100})],
    }));
  });

  it('error - msg is empty string', function () {
    assert.ok(testUtil.isNotValidJson({
      version: version,
      pattern: [deepMerge(validPattern, {msg: ''})],
    }));
  });
};

/**
 * @param {number} version
 * @param {PatternItem} validPattern
 */
module.exports.runBackgroundColor = function (version, validPattern) {
  it('error - backgroundColor is not defined', function () {
    const cloned = _.cloneDeep(validPattern);
    delete cloned.backgroundColor;

    assert.ok(testUtil.isNotValidJson({
      version: version,
      pattern: [cloned],
    }));
  });

  it('error - backgroundColor is null', function () {
    assert.ok(testUtil.isNotValidJson({
      version: version,
      pattern: [deepMerge(validPattern, {backgroundColor: null})],
    }));
  });

  it('error - backgroundColor is true', function () {
    assert.ok(testUtil.isNotValidJson({
      version: version,
      pattern: [deepMerge(validPattern, {backgroundColor: true})],
    }));
  });

  it('error - backgroundColor is false', function () {
    assert.ok(testUtil.isNotValidJson({
      version: version,
      pattern: [deepMerge(validPattern, {backgroundColor: false})],
    }));
  });

  it('error - backgroundColor is empty string', function () {
    assert.ok(testUtil.isNotValidJson({
      version: version,
      pattern: [deepMerge(validPattern, {backgroundColor: ''})],
    }));
  });

  it('error - backgroundColor is not hex color', function () {
    assert.ok(testUtil.isNotValidJson({
      version: version,
      pattern: [deepMerge(validPattern, {backgroundColor: '12345z'})],
    }));

    assert.ok(testUtil.isNotValidJson({
      version: version,
      pattern: [deepMerge(validPattern, {backgroundColor: 'black'})],
    }));
  });
};

/**
 * @param {number} version
 * @param {PatternItem} validPattern
 */
module.exports.runDisplayPosition = function (version, validPattern) {
  it('error - displayPosition is not defined', function () {
    const cloned = _.cloneDeep(validPattern);
    delete cloned.displayPosition;

    assert.ok(testUtil.isNotValidJson({
      version: version,
      pattern: [cloned],
    }));
  });

  it('error - displayPosition is null', function () {
    assert.ok(testUtil.isNotValidJson({
      version: version,
      pattern: [deepMerge(validPattern, {displayPosition: null})],
    }));
  });

  it('error - displayPosition is true', function () {
    assert.ok(testUtil.isNotValidJson({
      version: version,
      pattern: [deepMerge(validPattern, {displayPosition: true})],
    }));
  });

  it('error - displayPosition is false', function () {
    assert.ok(testUtil.isNotValidJson({
      version: version,
      pattern: [deepMerge(validPattern, {displayPosition: false})],
    }));
  });

  it('error - displayPosition is number', function () {
    assert.ok(testUtil.isNotValidJson({
      version: version,
      pattern: [deepMerge(validPattern, {displayPosition: 100})],
    }));
  });

  it('error - displayPosition is empty string', function () {
    assert.ok(testUtil.isNotValidJson({
      version: version,
      pattern: [deepMerge(validPattern, {displayPosition: ''})],
    }));
  });

  it('error - displayPosition is invalid string', function () {
    assert.ok(testUtil.isNotValidJson({
      version: version,
      pattern: [deepMerge(validPattern, {displayPosition: 'foo'})],
    }));

    assert.ok(testUtil.isNotValidJson({
      version: version,
      pattern: [deepMerge(validPattern, {displayPosition: 'Top'})],
    }));

    assert.ok(testUtil.isNotValidJson({
      version: version,
      pattern: [deepMerge(validPattern, {displayPosition: 'TOP'})],
    }));
  });
};

/**
 * @param {number} version
 * @param {PatternItem} validPattern
 */
module.exports.runDisplayPositionV2andV3 = function (version, validPattern) {
  it('error - displayPosition values supported since v4 are invalid in v2 and v3', function () {
    assert.ok(testUtil.isNotValidJson({
      version: version,
      pattern: [deepMerge(validPattern, {displayPosition: 'top_left'})],
    }));

    assert.ok(testUtil.isNotValidJson({
      version: version,
      pattern: [deepMerge(validPattern, {displayPosition: 'top_right'})],
    }));

    assert.ok(testUtil.isNotValidJson({
      version: version,
      pattern: [deepMerge(validPattern, {displayPosition: 'bottom_left'})],
    }));

    assert.ok(testUtil.isNotValidJson({
      version: version,
      pattern: [deepMerge(validPattern, {displayPosition: 'bottom_right'})],
    }));
  });
};

/**
 * @param {number} version
 * @param {PatternItem} validPattern
 */
module.exports.runStatus = function (version, validPattern) {
  it('error - status is not defined', function () {
    const cloned = _.cloneDeep(validPattern);
    delete cloned.status;

    assert.ok(testUtil.isNotValidJson({
      version: version,
      pattern: [cloned],
    }));
  });

  it('error - status is null', function () {
    assert.ok(testUtil.isNotValidJson({
      version: version,
      pattern: [deepMerge(validPattern, {status: null})],
    }));
  });

  it('error - status is true', function () {
    assert.ok(testUtil.isNotValidJson({
      version: version,
      pattern: [deepMerge(validPattern, {status: true})],
    }));
  });

  it('error - status is false', function () {
    assert.ok(testUtil.isNotValidJson({
      version: version,
      pattern: [deepMerge(validPattern, {status: false})],
    }));
  });

  it('error - status is empty string', function () {
    assert.ok(testUtil.isNotValidJson({
      version: version,
      pattern: [deepMerge(validPattern, {status: ''})],
    }));
  });

  it('error - status is string of integer', function () {
    assert.ok(testUtil.isNotValidJson({
      version: version,
      pattern: [deepMerge(validPattern, {status: '1'})],
    }));
  });

  it('error - status is float', function () {
    assert.ok(testUtil.isNotValidJson({
      version: version,
      pattern: [deepMerge(validPattern, {status: 1.1})],
    }));
  });

  it('error - status is invalid integer', function () {
    assert.ok(testUtil.isNotValidJson({
      version: version,
      pattern: [deepMerge(validPattern, {status: 2})],
    }));

    assert.ok(testUtil.isNotValidJson({
      version: version,
      pattern: [deepMerge(validPattern, {status: -1})],
    }));
  });
};

/**
 * @param {number} version
 */
module.exports.runOk = function (version) {
  it('ok - no data', function () {
    assert.ok(testUtil.isValidJson({
      version: version,
      pattern: [],
    }))
  });
};
