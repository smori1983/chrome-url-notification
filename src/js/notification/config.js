class Config {
  /**
   * JSON schema version.
   *
   * @returns {number}
   */
  version() {
    return 4;
  }

  /**
   * Bar height for bar type message
   *
   * @returns {number}
   */
  defaultBarHeight() {
    return 50;
  }

  /**
   * Circle diameter for corner type message
   *
   * @returns {number}
   */
  defaultCircleDiameter() {
    return 50;
  }

  /**
   * Corner space for corner type message
   *
   * @returns {number}
   */
  defaultCornerSpace() {
    return 10;
  }

  /**
   * @returns {string}
   */
  defaultFontColor() {
    return 'ffffff';
  }

  /**
   * Used for migration from 0 to 1
   *
   * @returns {string}
   */
  defaultBackgroundColor() {
    return '000000';
  }

  /**
   * Used for migration from 1 to 2
   *
   * @returns {string}
   */
  defaultDisplayPosition() {
    return 'top';
  }

  /**
   * Used for migration from 2 to 3
   *
   * @returns {number}
   */
  defaultStatus() {
    return 1;
  }
}

module.exports = Config;
