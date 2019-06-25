'use strict';

const urlNotification = {
  background: require('./background'),
  config: require('./config'),
  data: require('./data'),
  finder: require('./finder'),
  importer: require('./importer'),
  migration: require('./migration'),
  migrationExecutor: require('./migrationExecutor'),
  storage: require('./storage'),
  validator: require('./validator'),
};

module.exports = urlNotification;
