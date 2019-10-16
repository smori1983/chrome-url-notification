const show = function () {
  const $ = require('jquery');

  $('<a>')
    .attr('href', '#')
    .text(chrome.i18n.getMessage('label_options'))
    .on('click', function(e) {
      e.preventDefault();
      chrome.tabs.create({
        url: chrome.runtime.getURL('html/options.html'),
      });
    })
    .appendTo($('#link_options'));
};

module.exports.show = show;
