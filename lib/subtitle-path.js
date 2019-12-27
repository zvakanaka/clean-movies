const path = require('path');
const file = require('./file');
const VIDEO_PATH = require('./video-path');

module.exports = subtitlePath();

function subtitlePath () {
  const SUBTITLE_PATH = process.env.SUBTITLE_PATH ? process.env.SUBTITLE_PATH : path.join(VIDEO_PATH, 'subtitles');

  if (!file.exists(SUBTITLE_PATH)) {
    throw new Error(`SUBTITLE_PATH of '${SUBTITLE_PATH}' does not exist`);
  } else {
    console.log(`Subtitle directory set to ${SUBTITLE_PATH}`);
  }

  return SUBTITLE_PATH;
}
