const i18n = require('./i18n');
const storage = require('../urlNotification/storage');
const modalFactory = require('./options.util.modal');

/**
 * @typedef {object} DeleteFormItem
 * @property {string} pattern
 * @property {string} message
 */

/**
 * @param {DeleteFormItem} item
 * @param {function} callback Called when delete form submitted
 */
const show = function(item, callback) {
  const $ = require('jquery');
  const $container = $('#js_modal_delete_container');

  const html = $('#js_modal_delete_html').html();

  $container.empty();
  $container.append(html);
  $container.find('#js_form_delete_pattern').text(item.pattern);
  $container.find('#js_form_delete_message').text(item.message);

  $container.find('#js_form_delete').on('submit', function(e) {
    e.preventDefault();
    storage.deletePattern(item.pattern);
    modal.hide();
    callback();
  });

  i18n.apply('#js_modal_delete_container');

  const modal = modalFactory.init('#js_modal_delete');

  modal.show();
};

module.exports.show = show;
