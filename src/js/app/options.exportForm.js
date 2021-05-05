const ClipboardJS = require('clipboard');
const config = require('../urlNotification/config');
const data = require('../urlNotification/data');
const storage = require('../urlNotification/storage');
const i18n = require('./i18n');
const messageFactory = require('./options.util.message');
const modalFactory = require('./options.util.modal');

const show = () => {
  const $ = require('jquery');

  $('#js_modal_export_container')
    .empty()
    .append($('#js_modal_export_html').html());

  const clipboard = new ClipboardJS('#js_export_copy');
  const message = messageFactory.init('#js_export_message');

  /* istanbul ignore next jsdom does not support document.execCommand() */
  clipboard.on('success', (e) => {
    e.clearSelection();
    message.show(i18n.get('message_copy_done'));
  });

  const exportData = {
    version: config.version(),
    pattern: data.sortByMessage(storage.getAll()),
  };
  const json = JSON.stringify(exportData, null, 4);

  $('#js_export_display').html(json);

  i18n.apply('#js_modal_export_container');

  modalFactory
    .init('#js_modal_export')
    .show();
};

module.exports.show = show;
