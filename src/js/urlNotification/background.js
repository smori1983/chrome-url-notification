const finder = require('./finder');
const migration = require('./migration');

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

module.exports.migrate = migrate;
module.exports.find = find;
