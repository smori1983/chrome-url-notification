/**
 * Check user already has chrome.storage data.
 *
 * @return {Promise<any>}
 */
const hasData = async () => {
  const result = await chrome.storage.local.get(['version', 'pattern']);

  return result.version && result.pattern;
};

module.exports.hasData = hasData;
