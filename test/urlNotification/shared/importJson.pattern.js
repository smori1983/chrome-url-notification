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
module.exports.runUrl = (version, validPattern) => {
  it('error - url is not defined', () => {
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
  ]).it('error - url', (arg) => {
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
module.exports.runMsg = (version, validPattern) => {
  it('error - msg is not defined', () => {
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
  ]).it('error - msg', (arg) => {
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
module.exports.runBackgroundColor = (version, validPattern) => {
  it('error - backgroundColor is not defined', () => {
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
  ]).it('error - backgroundColor', (arg) => {
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
module.exports.runDisplayPosition = (version, validPattern) => {
  it('error - displayPosition is not defined', () => {
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
  ]).it('error - displayPosition', (arg) => {
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
module.exports.runDisplayPositionV2andV3 = (version, validPattern) => {
  given([
    {value: 'top_left'},
    {value: 'top_right'},
    {value: 'bottom_left'},
    {value: 'bottom_right'},
  ]).it('error - displayPosition values supported since v4 are invalid in v2 and v3', (arg) => {
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
module.exports.runStatus = (version, validPattern) => {
  it('error - status is not defined', () => {
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
  ]).it('error - status', (arg) => {
    assert.ok(testUtil.isNotValidJson({
      version: version,
      pattern: [deepMerge(validPattern, {status: arg.value})],
    }));
  });
};

/**
 * @param {number} version
 */
module.exports.runOk = (version) => {
  it('ok - no data', () => {
    assert.ok(testUtil.isValidJson({
      version: version,
      pattern: [],
    }))
  });
};
