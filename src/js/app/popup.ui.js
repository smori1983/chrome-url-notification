const blockAll = require('./popup.block.all');
const blockMatched = require('./popup.block.matched');

const init = () => {
  blockAll.showCommonMenu();
  blockMatched.showMatchedMenu();
};

module.exports.init = init;
