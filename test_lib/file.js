const fs = require('fs');

/**
 * @param {string} path Relative path from project root.
 * @returns {string}
 */
const read = (path) => {
  const absPath = __dirname + '/../' + path;
  const option = {
    encoding: 'utf-8',
  };

  return fs.readFileSync(absPath, option).toString();
};

module.exports.read = read;
