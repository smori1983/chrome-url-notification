const { it } = require('mocha');
const { given } = require('mocha-testdata');
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

  given([
    {desc: 'null', value: null},
    {desc: 'bool', value: true},
    {desc: 'bool', value: false},
    {desc: 'int', value: 100},
    {desc: 'float', value: 100.123},
    {desc: 'empty string', value: ''},
  ]).it('error - url', function (arg) {
    assert.ok(testUtil.isNotValidJson({
      version: version,
      pattern: [deepMerge(validPattern, {url: arg.value})],
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

  given([
    {desc: 'null', value: null},
    {desc: 'bool', value: true},
    {desc: 'bool', value: false},
    {desc: 'int', value: 100},
    {desc: 'float', value: 100.123},
    {desc: 'empty string', value: ''},
  ]).it('error - msg', function (arg) {
    assert.ok(testUtil.isNotValidJson({
      version: version,
      pattern: [deepMerge(validPattern, {msg: arg.value})],
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

  given([
    {desc: 'null', value: null},
    {desc: 'bool', value: true},
    {desc: 'bool', value: false},
    {desc: 'int', value: 100},
    {desc: 'float', value: 100.123},
    {desc: 'empty string', value: ''},
    {desc: 'not hex color', value: '12345z'},
    {desc: 'not hex color', value: 'black'},
  ]).it('error - backgroundColor', function (arg) {
    assert.ok(testUtil.isNotValidJson({
      version: version,
      pattern: [deepMerge(validPattern, {backgroundColor: arg.value})],
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

  given([
    {desc: 'null', value: null},
    {desc: 'bool', value: true},
    {desc: 'bool', value: false},
    {desc: 'int', value: 100},
    {desc: 'float', value: 100.123},
    {desc: 'empty string', value: ''},
    {desc: 'invalid string', value: 'foo'},
    {desc: 'invalid string', value: 'Top'},
    {desc: 'invalid string', value: 'TOP'},
  ]).it('error - displayPosition', function (arg) {
    assert.ok(testUtil.isNotValidJson({
      version: version,
      pattern: [deepMerge(validPattern, {displayPosition: arg.value})],
    }));
  });
};

/**
 * @param {number} version
 * @param {PatternItem} validPattern
 */
module.exports.runDisplayPositionV2andV3 = function (version, validPattern) {
  given([
    {value: 'top_left'},
    {value: 'top_right'},
    {value: 'bottom_left'},
    {value: 'bottom_right'},
  ]).it('error - displayPosition values supported since v4 are invalid in v2 and v3', function (arg) {
    assert.ok(testUtil.isNotValidJson({
      version: version,
      pattern: [deepMerge(validPattern, {displayPosition: arg.value})],
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

  given([
    {desc: 'null', value: null},
    {desc: 'bool', value: true},
    {desc: 'bool', value: false},
    {desc: 'float', value: 1.1},
    {desc: 'empty string', value: ''},
    {desc: 'string of int', value: '1'},
    {desc: 'invalid int', value: -1},
    {desc: 'invalid int', value: 2},
  ]).it('error - status', function (arg) {
    assert.ok(testUtil.isNotValidJson({
      version: version,
      pattern: [deepMerge(validPattern, {status: arg.value})],
    }));
  });
};
