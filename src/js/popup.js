$(function () {
  const optionsPath = chrome.runtime.getURL('html/options.html');

  $('<a>')
    .attr('href', optionsPath)
    .attr('target', '_blank')
    .text('Options')
    .appendTo($('#link_options'));
});
