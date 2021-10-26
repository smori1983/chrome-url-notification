const finder = require('./finder');
const migration = require('./migration');
const storage = require('./storage');

/**
 * @typedef {object} FindResult
 * @property {boolean} matched
 * @property {(FoundItem|null)} data Depends on the value of matched
 */

const migrate = () => {
  migration.execute();
};

/**
 * @param {string} url
 * @param {FindOption} [option]
 * @return {FindResult}
 */
const find = (url, option) => {
  const item = finder.findFor(url, option);

  return {
    matched: item !== null,
    data: item,
  };
};

/**
 * @param {string} url
 * @returns {PatternItem}
 */
const findByUrl = (url) => {
  return storage.findByUrl(url);
};

module.exports.migrate = migrate;
module.exports.find = find;
module.exports.findByUrl = findByUrl;
