const clear = () => {
  localStorage.clear();
};

/**
 * Set up localStorage.
 *
 * @param {string} version
 * @param {PatternItem[]} patterns
 */
const setUp = (version, patterns) => {
  localStorage.clear();
  localStorage.setItem('version', version);
  localStorage.setItem('pattern', JSON.stringify(patterns));
};

module.exports.clear = clear;
module.exports.setUp = setUp;
