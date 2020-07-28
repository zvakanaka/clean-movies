const fs = require('fs');
const fileParts = require('./file-name');

const filePath = './views/img/no-image.jpg';
const base64 = fs.readFileSync(filePath, {encoding: 'base64'});
const name = fileParts(filePath).fileWithoutExtension;

module.exports = {
  name,
  path: filePath,
  base64
};
