/**
 * @param {PatternItem[]} patterns
 * @returns {PatternItem[]}
 */
const sortByUrl = (patterns) => {
  return patterns.sort((a, b) => {
    return (a.url < b.url) ? -1 : 1;
  });
};

/**
 * @param {PatternItem[]} patterns
 * @returns {PatternItem[]}
 */
const sortByMessage = (patterns) => {
  return patterns.sort((a, b) => {
    if (a.msg === b.msg) {
      return (a.url < b.url) ? -1 : 1;
    }

    return (a.msg < b.msg) ? -1 : 1;
  });
};

module.exports.sortByUrl = sortByUrl;
module.exports.sortByMessage = sortByMessage;
