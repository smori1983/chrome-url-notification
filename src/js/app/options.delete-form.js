const Storage = require('../notification/storage');
const i18n = require('./i18n');
const formFactory = require('./options.util.form');
const modalFactory = require('./options.util.modal');

const storage = new Storage();

/**
 * @param {jQuery} $
 * @param {PatternItem} item
 * @param {function} callback Called when delete form submitted
 */
const show = ($, item, callback) => {
  formFactory.initForm($, '#js_modal_delete_container', '#js_modal_delete_html');

  $('#js_form_delete_pattern').text(item.url);
  $('#js_form_delete_message').text(item.msg);

  $('#js_form_delete').on('submit', (e) => {
    e.preventDefault();
    storage.deletePattern(item.url);
    modal.hide();
    callback();
  });

  i18n.apply($, '#js_modal_delete_container');

  const modal = modalFactory.init($, '#js_modal_delete');
  modal.show();
};

module.exports.show = show;
