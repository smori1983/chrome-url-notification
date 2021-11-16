const validator = require('../src/js/urlNotification/validator');
const factory = require('./factory');

const clearStorage = () => {
  localStorage.clear();
};

/**
 * Set up localStorage.
 *
 * @param {string} version
 * @param {PatternItem[]} patterns
 */
const initStorage = (version, patterns) => {
  localStorage.clear();
  localStorage.setItem('version', version);
  localStorage.setItem('pattern', JSON.stringify(patterns));
};

/**
 * @returns {number}
 */
const currentVersion = () => {
  return 4;
};

/**
 * @param {object} json
 * @returns {boolean}
 */
const isValidJson = (json) => {
  return validator.forImportJson(json) === true;
};

/**
 * @param {object} json
 * @returns {boolean}
 */
const isNotValidJson = (json) => {
  return validator.forImportJson(json) === false;
};

/**
 * @param {PatternItemDiff} diff
 * @returns {PatternItem}
 */
const makePatternItem = (diff) => {
  return factory.makePatternItem(diff);
};

/**
 * @param {FoundItemDiff} diff
 * @returns {FoundItem}
 */
const makeFoundItem = (diff) => {
  return factory.makeFoundItem(diff);
};

module.exports.clearStorage = clearStorage;
module.exports.initStorage = initStorage;
module.exports.currentVersion = currentVersion;
module.exports.isValidJson = isValidJson;
module.exports.isNotValidJson = isNotValidJson;
module.exports.makePatternItem = makePatternItem;
module.exports.makeFoundItem = makeFoundItem;

module.exports.chrome = require('./chrome');
module.exports.chromeBackground = require('./chrome-background');
module.exports.dom = require('./dom');

module.exports.ChromeMock = require('./chrome-mock');
module.exports.Popup = require('./popup');
module.exports.Content = require('./content');
module.exports.Options = require('./options');
module.exports.Storage = require('./storage');
