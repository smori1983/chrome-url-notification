const ClipboardJS = require('clipboard');
const Storage = require('../notification/storage');
const i18n = require('../app/i18n');
const formFactory = require('./options.util.form');
const messageFactory = require('./options.util.message');
const modalFactory = require('./options.util.modal');

const storage = new Storage();

/**
 * @param {jQuery} $
 */
const show = async ($) => {
  formFactory.initForm($, '#js_modal_export_container', '#js_modal_export_html');

  const clipboard = new ClipboardJS('#js_export_copy', {
    container: $('body').get(0), // default value of the option.
  });
  const message = messageFactory.init($, '#js_export_message');

  /* istanbul ignore next jsdom does not support document.execCommand() */
  clipboard.on('success', (e) => {
    e.clearSelection();
    message.show(i18n.get('message_copy_done'));
  });

  const json = JSON.stringify(await storage.dump(), null, 4);

  $('#js_export_display').html(json);

  i18n.apply($, '#js_modal_export_container');

  modalFactory
    .init($, '#js_modal_export')
    .show();
};

module.exports.show = show;
