/**
 * Assumes passed value is fetched from local storage.
 *
 * @returns {boolean}
 */
const isValidStringAsVersion = function(value) {
  return (typeof value === 'string') && (/^\d+$/.test(value));
};

module.exports.isValidStringAsVersion = isValidStringAsVersion;
