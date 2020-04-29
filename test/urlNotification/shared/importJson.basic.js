const { it } = require('mocha');
const assert = require('assert');
const testUtil = require('../../../test_lib/util');

/**
 * @param {number} version
 * @param {PatternItem} validPattern
 */
module.exports.run = function (version, validPattern) {
  it('error - argument is an array', function () {
    assert.ok(testUtil.isNotValidJson([]));
  });

  it('error - argument is an object but no keys', function () {
    assert.ok(testUtil.isNotValidJson({}));
  });

  it('error - version is not defined', function () {
    assert.ok(testUtil.isNotValidJson({
      pattern: [validPattern],
    }));
  });

  it('error - version is null', function () {
    assert.ok(testUtil.isNotValidJson({
      version: null,
      pattern: [validPattern],
    }));
  });

  it('error - version is true', function () {
    assert.ok(testUtil.isNotValidJson({
      version: true,
      pattern: [validPattern],
    }));
  });

  it('error - version is false', function () {
    assert.ok(testUtil.isNotValidJson({
      version: false,
      pattern: [validPattern],
    }));
  });

  it('error - version is string of integer', function () {
    assert.ok(testUtil.isNotValidJson({
      version: '1',
      pattern: [validPattern],
    }));
  });

  it('error - version is float', function () {
    assert.ok(testUtil.isNotValidJson({
      version: 1.1,
      pattern: [validPattern],
    }));
  });

  it('error - version is out of range', function () {
    assert.ok(testUtil.isNotValidJson({
      version: 0,
      pattern: [validPattern],
    }));

    assert.ok(testUtil.isNotValidJson({
      version: 5,
      pattern: [validPattern],
    }));
  });

  it('error - pattern is not defined', function () {
    assert.ok(testUtil.isNotValidJson({
      version: version,
    }));
  });

  it('error - pattern is null', function () {
    assert.ok(testUtil.isNotValidJson({
      version: version,
      pattern: null,
    }));
  });

  it('error - pattern is true', function () {
    assert.ok(testUtil.isNotValidJson({
      version: version,
      pattern: true,
    }));
  });

  it('error - pattern is false', function () {
    assert.ok(testUtil.isNotValidJson({
      version: version,
      pattern: false,
    }));
  });

  it('error - pattern is string', function () {
    assert.ok(testUtil.isNotValidJson({
      version: version,
      pattern: 'dummy',
    }));
  });

  it('error - pattern is not an array of object(s)', function () {
    assert.ok(testUtil.isNotValidJson({
      version: version,
      pattern: validPattern,
    }));
  });
};
