/**
 * Assumes passed value is fetched from local storage.
 *
 * @returns {boolean}
 */
const isValidStringAsVersion = (value) => {
  return (typeof value === 'string') && (/^\d+$/.test(value));
};

module.exports.isValidStringAsVersion = isValidStringAsVersion;
