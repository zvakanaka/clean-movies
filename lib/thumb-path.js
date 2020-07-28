const path = require('path');
const file = require('./file');
const VIDEO_PATH = require('./video-path');

module.exports = thumbPath();

function thumbPath () {
  const THUMBS_PATH = process.env.THUMBS_PATH ? process.env.THUMBS_PATH : path.join(VIDEO_PATH, 'thumbs');

  if (!file.exists(THUMBS_PATH)) {
    throw new Error(`THUMBS_PATH of '${THUMBS_PATH}' does not exist, please make the directory`);
  }

  return THUMBS_PATH;
}
