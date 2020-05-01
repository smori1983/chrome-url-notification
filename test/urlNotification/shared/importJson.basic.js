const { it } = require('mocha');
const { given } = require('mocha-testdata');
const assert = require('assert');
const testUtil = require('../../../test_lib/util');

/**
 * @param {number} version
 * @param {PatternItem} validPattern
 */
module.exports.run = function (version, validPattern) {
  given([
    {desc: 'null', value: null},
    {desc: 'array', value: []},
    {desc: 'object but no keys', value: {}},
  ]).it('error - argument', function (arg) {
    assert.ok(testUtil.isNotValidJson(arg.value));
  });

  it('error - version is not defined', function () {
    assert.ok(testUtil.isNotValidJson({
      pattern: [validPattern],
    }));
  });

  given([
    {desc: 'null', value: null},
    {desc: 'bool', value: true},
    {desc: 'bool', value: false},
    {desc: 'float', value: 1.1},
    {desc: 'string of int', value: '1'},
    {desc: 'out of range', value: 0},
    {desc: 'out of range', value: 5},
  ]).it('error - version', function (arg) {
    assert.ok(testUtil.isNotValidJson({
      version: arg.value,
      pattern: [validPattern],
    }));
  });

  it('error - pattern is not defined', function () {
    assert.ok(testUtil.isNotValidJson({
      version: version,
    }));
  });

  given([
    {desc: 'null', value: null},
    {desc: 'bool', value: true},
    {desc: 'bool', value: false},
    {desc: 'float', value: 1.1},
    {desc: 'string', value: 'dummy'},
    {desc: 'not an array of object(s)', value: validPattern},
  ]).it('error - pattern', function (arg) {
    assert.ok(testUtil.isNotValidJson({
      version: version,
      pattern: arg.value,
    }));
  });
};
