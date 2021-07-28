const config = require('./config');
const storage = require('./storage');
const migrationExecutor = require('./migration-executor');

/**
 * @returns {boolean}
 */
const hasVersion = () => {
  return storage.hasVersion();
};

/**
 * @returns {number}
 */
const currentVersion = () => {
  return storage.currentVersion();
};

/**
 * Persistence phase using storage.
 *
 * Assumes that patterns are fully migrated.
 *
 * @param {PatternItem[]} patterns
 */
const persist = (patterns) => {
  storage.replace(config.version(), patterns);
};

const execute = () => {
  const version = currentVersion();
  const patterns = storage.getAll();

  persist(migrationExecutor.toLatest(patterns, version));
};

module.exports.hasVersion = hasVersion;
module.exports.currentVersion = currentVersion;
module.exports.execute = execute;
