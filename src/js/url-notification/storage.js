/**
 * @typedef {object} PatternItem
 * @property {string} url Added schema version: 0
 * @property {string} msg Added schema version: 0
 * @property {string} [backgroundColor] Added schema version: 1
 * @property {string} [displayPosition] Added schema version: 2
 * @property {number} [status] Added schema version: 3
 */

const key = {
  version: 'version',
  pattern: 'pattern',
};

/**
 * @param {*} value
 * @returns {boolean}
 */
const isValidStringAsVersion = (value) => {
  return (typeof value === 'string') && (/^\d+$/.test(value));
};

/**
 * @returns {boolean}
 */
const hasVersion = () => {
  return isValidStringAsVersion(getVersion());
};

/**
 * Gets the version stored in storage.
 *
 * @returns {number}
 */
const currentVersion = () => {
  const version = getVersion();

  if (isValidStringAsVersion(version)) {
    return parseInt(version, 10);
  }

  return 0;
};

const getVersion = () => {
  return localStorage.getItem(key.version);
};

/**
 * @param {number} version
 */
const saveVersion = (version) => {
  localStorage.setItem(key.version, version.toString());
};

/**
 * @param {PatternItem[]} data
 */
const savePattern = (data) => {
  localStorage.setItem(key.pattern, JSON.stringify(data));
};

/**
 * @returns {number}
 */
const getCount = () => {
  return getAll().length;
};

/**
 * @returns {PatternItem[]}
 */
const getAll = () => {
  const data = localStorage.getItem(key.pattern);

  if (data === null) {
    return [];
  }

  return JSON.parse(data);
};

/**
 * Finds pattern item by exact match of URL pattern.
 *
 * @param {string} url
 * @returns {(PatternItem|null)}
 */
const findByUrl = (url) => {
  const patterns = getAll();
  let i, len;

  for (i = 0, len = patterns.length; i < len; i++) {
    if (patterns[i].url === url) {
      return patterns[i];
    }
  }

  return null;
};

/**
 * @param {PatternItem} pattern
 */
const addPattern = (pattern) => {
  if (findByUrl(pattern.url)) {
    return;
  }

  savePattern(getAll().concat(pattern));
};

/**
 * @param {string} originalUrl
 * @param {PatternItem} pattern
 */
const updatePattern = (originalUrl, pattern) => {
  if (findByUrl(originalUrl)) {
    deletePattern(originalUrl);
    addPattern(pattern);
  }
};

/**
 * @param {string} url
 */
const deletePattern = (url) => {
  const filtered = getAll().filter((pattern) => {
    return pattern.url !== url;
  });

  savePattern(filtered);
};

const deleteAll = () => {
  savePattern([]);
};

/**
 * @param {number} version
 * @param {PatternItem[]} patterns
 */
const replace = (version, patterns) => {
  saveVersion(version);
  savePattern(patterns);
};

module.exports.hasVersion = hasVersion;
module.exports.currentVersion = currentVersion;
module.exports.getCount = getCount;
module.exports.getAll = getAll;
module.exports.findByUrl = findByUrl;
module.exports.addPattern = addPattern;
module.exports.updatePattern = updatePattern;
module.exports.deletePattern = deletePattern;
module.exports.deleteAll = deleteAll;
module.exports.replace = replace;
