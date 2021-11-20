const deepMerge = require('deepmerge');
const Config = require('./config');
const storage = require('./storage');
const validator = require('./validator');

const config = new Config();

/**
 * @param {string} url
 * @param {object} data contains part of pattern item
 * @returns {boolean} true if successfully updated
 */
const updatePattern = (url, data) => {
  const item = storage.findByUrl(url);

  if (item === null) {
    return false;
  }

  const merged = deepMerge(item, data);

  const dataForValidation = {
    version: config.version(),
    pattern: [merged],
  };

  if (validator.forImportJson(dataForValidation) === false) {
    return false;
  }

  storage.updatePattern(url, merged);

  return true;
};

/**
 * @param {PatternItem[]} patterns
 * @returns {PatternItem[]}
 */
const sortByUrl = (patterns) => {
  return patterns.sort((a, b) => {
    return (a.url < b.url) ? -1 : 1;
  });
};

/**
 * @param {PatternItem[]} patterns
 * @returns {PatternItem[]}
 */
const sortByMessage = (patterns) => {
  return patterns.sort((a, b) => {
    if (a.msg === b.msg) {
      return (a.url < b.url) ? -1 : 1;
    }

    return (a.msg < b.msg) ? -1 : 1;
  });
};

module.exports.updatePattern = updatePattern;
module.exports.sortByUrl = sortByUrl;
module.exports.sortByMessage = sortByMessage;
