const main = function () {
  const $ = require('jquery');
  const $body = $('body');

  /** @type {PageInfo} */
  const pageInfo = {
    body: {
      marginTop: $body.css('marginTop'),
      marginBottom: $body.css('marginBottom'),
    },
  };

  return {
    get: function () {
      return pageInfo;
    },
  };
};

module.exports.init = main;
