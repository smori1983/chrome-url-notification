'use strict';

const finder = require('./finder');
const migration = require('./migration');

/**
 * @typedef {object} FindResult
 * @property {boolean} matched
 * @property {(FoundItem|null)} data Depends on the value of matched
 */

const migrate = function() {
  migration.execute();
};

/**
 * @param {string} url
 * @return {FindResult}
 */
const find = function(url) {
  const item = finder.findFor(url);

  return {
    matched: item !== null,
    data: item,
  };
};

module.exports.migrate = migrate;
module.exports.find = find;
