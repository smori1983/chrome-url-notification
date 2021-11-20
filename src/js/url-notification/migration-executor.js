const _ = require('lodash');
const Config = require('./config');

class MigrationExecutor {
  constructor() {
    /**
     * @type {Config}
     * @private
     */
    this._config = new Config();

    /**
     * @type {Executor[]}
     * @private
     */
    this._executors = [];
    this._executors.push(new For0());
    this._executors.push(new For1());
    this._executors.push(new For2());
    this._executors.push(new For3());
  }

  /**
   * Migrate passed patterns to the latest generation.
   *
   * @param {PatternItem[]} patterns
   * @param {number} fromVersion
   * @returns {PatternItem[]}
   */
  toLatest(patterns, fromVersion) {
    let version;
    let migrated = _.cloneDeep(patterns);

    for (version = fromVersion; version < this._config.version(); version++) {
      migrated = this._execute(migrated, version);
    }

    return migrated;
  }

  /**
   * Execute migration of next 1 generation for passed patterns.
   *
   * @param {PatternItem[]} patterns
   * @param {number} fromVersion
   * @returns {PatternItem[]}
   * @private
   */
  _execute(patterns, fromVersion) {
    let result = [];

    patterns.forEach((pattern) => {
      result.push(this._executeOne(pattern, fromVersion));
    });

    return result;
  }

  /**
   * @param {PatternItem} pattern
   * @param {number} fromVersion
   * @returns {PatternItem}
   * @private
   */
  _executeOne(pattern, fromVersion) {
    return this._find(fromVersion).execute(pattern);
  }

  /**
   * @param fromVersion
   * @returns {Executor}
   * @throws {Error}
   * @private
   */
  _find(fromVersion) {
    for (let i = 0, len = this._executors.length; i < len; i++) {
      if (this._executors[i].supports(fromVersion)) {
        return this._executors[i];
      }
    }

    throw new Error('Migration not defined for version: ' + fromVersion);
  }
}

class Executor {
  constructor() {
    /**
     * @type {Config}
     * @protected
     */
    this._config = new Config();
  }

  /**
   * @param {number} version
   * @returns {boolean}
   */
  supports(version) {
  }

  /**
   * @param {PatternItem} item
   * @returns {PatternItem}
   */
  execute(item) {
  }
}

/**
 * Migration from 0 to 1
 *
 * - Set default background color with no condition.
 */
class For0 extends Executor {
  supports(version) {
    return version === 0;
  }

  execute(item) {
    item.backgroundColor = this._config.defaultBackgroundColor();

    return item;
  }
}

/**
 * Migration from 1 to 2
 *
 * - Set default display position with no condition.
 */
class For1 extends Executor {
  supports(version) {
    return version === 1;
  }

  execute(item) {
    item.displayPosition = this._config.defaultDisplayPosition();

    return item;
  }
}

/**
 * Migration from 2 to 3
 *
 * - Set default status with no condition.
 */
class For2 extends Executor {
  supports(version) {
    return version === 2;
  }

  execute(item) {
    item.status = this._config.defaultStatus();

    return item;
  }
}

/**
 * Migration from 3 to 4
 *
 * - No need to set default value.
 */
class For3 extends Executor {
  supports(version) {
    return version === 3;
  }

  execute(item) {
    return item;
  }
}

module.exports = MigrationExecutor;
