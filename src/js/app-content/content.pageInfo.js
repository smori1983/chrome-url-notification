/**
 * @typedef {Object} PageInfo
 * @property {Location} location
 * @property {PageBodyInfo} body
 */

/**
 * @typedef {Object} PageBodyInfo
 * @property {string} marginTop
 * @property {string} marginBottom
 */

/**
 * @param {Location} location
 * @param {jQuery} $
 */
const main = (location, $) => {
  const $body = $('body');

  /** @type {PageInfo} */
  const pageInfo = {
    location: location,
    body: {
      marginTop: $body.css('marginTop'),
      marginBottom: $body.css('marginBottom'),
    },
  };

  return {
    get: () => {
      return pageInfo;
    },
  };
};

module.exports.init = main;
