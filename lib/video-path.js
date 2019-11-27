const path = require('path');
const os = require('os');
const file = require('./file');

module.exports = videoPath();

function videoPath () {
  const VIDEO_PATH = process.env.VIDEO_PATH ? process.env.VIDEO_PATH : path.join(os.homedir(), 'Videos');

  if (!file.exists(VIDEO_PATH)) {
    throw new Error(`VIDEO_PATH of '${VIDEO_PATH}' does not exist`);
  }

  return VIDEO_PATH;
}
