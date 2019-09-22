const background = require('../urlNotification/background');

const listener = function () {
  background.migrate();
};

module.exports.listener = listener;
