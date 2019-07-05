'use strict';

const _ = require('lodash');
const config = require('./config');
const migrationExecutor = require('./migrationExecutor');
const storage = require('./storage');

/**
 * @param {PatternItem} item
 * @returns {PatternItem}
 */
const prepareFor1 = function(item) {
  return {
    url: item.url,
    msg: item.msg,
    backgroundColor: item.backgroundColor,
  };
};

/**
 * @param {PatternItem} item
 * @returns {PatternItem}
 */
const prepareFor2 = function(item) {
  return {
    url: item.url,
    msg: item.msg,
    backgroundColor: item.backgroundColor,
    displayPosition: item.displayPosition,
  };
};

/**
 * @param {PatternItem} item
 * @returns {PatternItem}
 */
const prepareFor3 = function(item) {
  return {
    url: item.url,
    msg: item.msg,
    backgroundColor: item.backgroundColor,
    displayPosition: item.displayPosition,
    status: item.status,
  };
};

const prepares = {
  1: prepareFor1,
  2: prepareFor2,
  3: prepareFor3,
};

/**
 * @param {PatternItem[]} pattern
 * @param {number} version
 * @returns {PatternItem[]}
 */
const migrate = function(pattern, version) {
  let result = [];

  pattern.forEach(function(item) {
    result.push(migrationExecutor.from(version, item));
  });

  return result;
};

/**
 * @param {PatternItem} data
 */
const addOrUpdate = function(data) {
  if (storage.findByUrl(data.url)) {
    storage.updatePattern(data.url, data);
  } else {
    storage.addPattern(data);
  }
};

/**
 * Assumes that json is validated.
 *
 * @param {object} initialJson
 */
const importJson = function(initialJson) {
  let json = _.cloneDeep(initialJson);

  console.info('Import start.');

  while (config.version() > json.version) {
    console.info('Migrate from scheme version ' + json.version);

    json.pattern = migrate(json.pattern, json.version);
    json.version += 1;
  }

  json.pattern.forEach(function(item) {
    addOrUpdate(prepares[json.version](item));
  });

  console.info('Import done.');
};

module.exports.importJson = importJson;
