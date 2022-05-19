const ClipboardJS = require('clipboard');
const StorageLegacy = require('../notification/storage-legacy');
const i18n = require('../app/i18n');
const formFactory = require('./options.util.form');
const messageFactory = require('./options.util.message');
const modalFactory = require('./options.util.modal');

const storageLegacy = new StorageLegacy();

const show = ($) => {
  formFactory.initForm($, '#js_modal_old_data_container', '#js_modal_old_data_html');

  const clipboard = new ClipboardJS('#js_old_data_copy', {
    container: $('body').get(0), // default value of the option.
  });
  const message = messageFactory.init($, '#js_old_data_message');

  /* istanbul ignore next jsdom does not support document.execCommand() */
  clipboard.on('success', (e) => {
    e.clearSelection();
    message.show(i18n.get('message_copy_done'));
  });

  const json = JSON.stringify(storageLegacy.dump(), null, 4);

  $('#js_old_data_display').html(json);

  i18n.apply($, '#js_modal_old_data_container');

  modalFactory
    .init($, '#js_modal_old_data')
    .show();
};

module.exports.show = show;
