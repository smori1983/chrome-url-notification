/**
 * JSON schema version.
 *
 * @type {number}
 */
const version = 4;

/**
 * Bar height for bar type message
 *
 * @type {number}
 */
const defaultBarHeight = 50;

/**
 * Circle diameter for corner type message
 *
 * @type {number}
 */
const defaultCircleDiameter = 50;

/**
 * Corner space for corner type message
 *
 * @type {number}
 */
const defaultCornerSpace = 10;

/**
 * @type {string}
 */
const defaultFontColor = 'ffffff';

/**
 * Used for migration from 0 to 1
 *
 * @type {string}
 */
const defaultBackgroundColor = '000000';

/**
 * Used for migration from 1 to 2
 *
 * @type {string}
 */
const defaultDisplayPosition = 'top';

/**
 * Used for migration from 2 to 3
 *
 * @type {number}
 */
const defaultStatus = 1;

/**
 * @returns {number}
 */
module.exports.version = () => {
  return version;
};

/**
 * @returns {number}
 */
module.exports.defaultBarHeight = () => {
  return defaultBarHeight;
};

/**
 * @returns {number}
 */
module.exports.defaultCircleDiameter = () => {
  return defaultCircleDiameter;
};

/**
 * @returns {number}
 */
module.exports.defaultCornerSpace = () => {
  return defaultCornerSpace;
};

/**
 * @returns {string}
 */
module.exports.defaultFontColor = () => {
  return defaultFontColor;
};

/**
 * @returns {string}
 */
module.exports.defaultBackgroundColor = () => {
  return defaultBackgroundColor;
};

/**
 * @returns {string}
 */
module.exports.defaultDisplayPosition = () => {
  return defaultDisplayPosition;
};

/**
 * @returns {number}
 */
module.exports.defaultStatus = () => {
  return defaultStatus;
};
