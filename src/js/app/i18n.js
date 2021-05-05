/**
 * @param {string} selector
 */
const apply = (selector) => {
  const $ = require('jquery');
  const $element = $(selector);

  $element.find('*[data-i18n]').each(function () {
    $(this).text(get($(this).data('i18n')));
  });

  $element.find('*[data-i18n-val]').each(function () {
    $(this).val(get($(this).data('i18n-val')));
  });

  $element.find('*[data-i18n-ph]').each(function () {
    $(this).attr('placeholder', get($(this).data('i18n-ph')));
  });
};

/**
 * @param {string} key
 * @returns {string}
 */
const get = (key) => {
  return chrome.i18n.getMessage(key);
};

module.exports.apply = apply;
module.exports.get = get;
