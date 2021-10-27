const blockMatched = require('./popup.block.matched');

const showCommonMenu = () => {
  const $ = require('jquery');

  $('<a>')
    .attr('href', '#')
    .text(chrome.i18n.getMessage('label_options'))
    .on('click', (e) => {
      e.preventDefault();
      chrome.tabs.create({
        url: chrome.runtime.getURL('html/options.html'),
      });
    })
    .appendTo($('#link_options'));
};

const init = () => {
  showCommonMenu();
  blockMatched.showMatchedMenu();
};

module.exports.init = init;
