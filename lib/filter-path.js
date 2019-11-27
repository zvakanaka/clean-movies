const path = require('path');
const file = require('./file');
const VIDEO_PATH = require('./video-path');

module.exports = filterPath();

function filterPath () {
  const FILTER_PATH = process.env.FILTER_PATH ? process.env.FILTER_PATH : path.join(VIDEO_PATH, 'filters');

  if (!file.exists(FILTER_PATH)) {
    throw new Error(`FILTER_PATH of '${FILTER_PATH}' does not exist`);
  }

  return FILTER_PATH;
}
