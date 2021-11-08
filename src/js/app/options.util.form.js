/**
 * @param {jQuery} $
 * @param {string} containerElementId
 * @param {string} templateElementId
 */
const initForm = ($, containerElementId, templateElementId) => {
  $(containerElementId)
    .empty()
    .append($(templateElementId).html());
};

module.exports.initForm = initForm;
