const filesInDir = require('files-in-dir');
const fileParts = require('./file-name');
const fs = require('fs');

try {
  const THUMBS_PATH = require('./thumb-path');
  const thumbFiles = filesInDir(THUMBS_PATH, ['jpg']);

  module.exports = thumbFiles.map((thumbFile) => {
    const path = `${THUMBS_PATH}/${thumbFile}`;
    const base64 = fs.readFileSync(path, {encoding: 'base64'});
    return {
      name: fileParts(thumbFile).fileWithoutExtension,
      path,
      base64
    }
  });
} catch (e) {
  console.error(e);
  module.exports = [];
}
