const migration = require('./migration');

const migrate = () => {
  migration.execute();
};

module.exports.migrate = migrate;
