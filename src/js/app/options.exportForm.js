const ClipboardJS = require('clipboard');
const i18n = require('./i18n');
const config = require('../urlNotification/config');
const data = require('../urlNotification/data');
const storage = require('../urlNotification/storage');
const messageFactory = require('./options.util.message');
const modalFactory = require('./options.util.modal');

const show = function () {
  const $ = require('jquery');
  const $container = $('#js_modal_export_container');

  const html = $('#js_modal_export_html').html();

  $container.empty();
  $container.append(html);

  const clipboard = new ClipboardJS('#js_export_copy');
  const message = messageFactory.init('#js_export_message');

  clipboard.on('success', function(e) {
    e.clearSelection();
    message.show(i18n.get('message_copy_done'));
  });

  const exportData = {
    version: config.version(),
    pattern: data.sortByMessage(storage.getAll()),
  };
  const json = JSON.stringify(exportData, null, 4);

  $container.find('#js_export_display').html(json);

  i18n.apply('#js_modal_export_container');

  const modal = modalFactory.init('#js_modal_export', {
    'shown.bs.modal': function() {
      $('#js_export_display').scrollTop(0);
    },
  });

  modal.show();
};

module.exports.show = show;
