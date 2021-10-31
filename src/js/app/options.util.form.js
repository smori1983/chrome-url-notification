/**
 * @param {string} containerElementId
 * @param {string} templateElementId
 */
const initForm = (containerElementId, templateElementId) => {
  const $ = require('jquery');

  $(containerElementId)
    .empty()
    .append($(templateElementId).html());
};

module.exports.initForm = initForm;
