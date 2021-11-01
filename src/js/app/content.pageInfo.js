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
