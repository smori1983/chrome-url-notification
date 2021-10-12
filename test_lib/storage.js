const clear = () => {
  localStorage.clear();
};

/**
 * Initialize localStorage.
 *
 * @param {string} version
 * @param {PatternItem[]} patterns
 */
const init = (version, patterns) => {
  localStorage.clear();
  localStorage.setItem('version', version);
  localStorage.setItem('pattern', JSON.stringify(patterns));
};

module.exports.clear = clear;
module.exports.init = init;
