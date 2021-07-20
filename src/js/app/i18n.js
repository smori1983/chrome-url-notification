/**
 * @param {string} selector
 */
const apply = (selector) => {
  const $ = require('jquery');
  const $element = $(selector);

  $element.find('*[data-i18n]').each((index, element) => {
    $(element).text(get($(element).data('i18n')));
  });

  $element.find('*[data-i18n-val]').each((index, element) => {
    $(element).val(get($(element).data('i18n-val')));
  });

  $element.find('*[data-i18n-ph]').each((index, element) => {
    $(element).attr('placeholder', get($(element).data('i18n-ph')));
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
