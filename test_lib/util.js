const Validator = require('../src/js/notification/validator');
const factory = require('./factory');
const Storage = require('./storage');

const clearStorage = () => {
  new Storage(localStorage).clear();
};

/**
 * Set up localStorage.
 *
 * @param {string} version
 * @param {PatternItem[]} patterns
 */
const initStorage = (version, patterns) => {
  new Storage(localStorage).init(version, patterns);
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
  return new Validator().forImportJson(json) === true;
};

/**
 * @param {object} json
 * @returns {boolean}
 */
const isNotValidJson = (json) => {
  return new Validator().forImportJson(json) === false;
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
