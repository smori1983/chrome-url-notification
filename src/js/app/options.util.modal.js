/**
 * @param {string} selector
 * @param {Object} [events]
 */
const main = (selector, events) => {
  const $ = global.jQuery = require('jquery');
  require('bootstrap');

  /**
   * @param {string} eventName
   * @param {function} callback
   */
  const handler = (eventName, callback) => {
    $(selector).on(eventName, callback);
  };

  $.each($.extend({}, events), handler);

  return {
    show: () => {
      $(selector).modal('show');
    },
    hide: () => {
      $(selector).modal('hide');
    },
  };
};

module.exports.init = main;
