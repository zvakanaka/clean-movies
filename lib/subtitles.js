const filesInDir = require('files-in-dir');
const fileParts = require('./file-name');
const file = require('./file');

try {
  const SUBTITLE_PATH = require('./subtitle-path');
  const subtitleFiles = filesInDir(SUBTITLE_PATH, ['vtt']);
  const subtitles = subtitleFiles.map(subtitleFile => file.read(`${SUBTITLE_PATH}/${subtitleFile}`));

  module.exports = subtitles.map((subtitle, i) => ({
    name: fileParts(subtitleFiles[i]).fileWithoutExtension,
    subtitle: subtitles[i]
  }));
} catch (e) {
  console.error(e);
  module.exports = [];
}
