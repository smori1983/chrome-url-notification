/**
 * @param {string} selector
 * @param {Object} [events]
 */
const main = function(selector, events) {
  const $ = global.jQuery = require('jquery');
  require('bootstrap');

  /**
   * @param {string} eventName
   * @param {function} callback
   */
  const handler = function(eventName, callback) {
    $(selector).on(eventName, callback);
  };

  $.each($.extend({}, events), handler);

  return {
    show: function() {
      $(selector).modal('show');
    },
    hide: function() {
      $(selector).modal('hide');
    },
  };
};

module.exports.init = main;
