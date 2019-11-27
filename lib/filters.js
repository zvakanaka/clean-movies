const filesInDir = require('files-in-dir');
const fileParts = require('./file-name');

try {
  const FILTER_PATH = require('./filter-path');
  const filterFiles = filesInDir(FILTER_PATH, ['json']);
  const filters = filterFiles.map(filterFile => require(`${FILTER_PATH}/${filterFile}`));

  module.exports = filters.map((filter, i) => ({
    name: fileParts(filterFiles[i]).fileWithoutExtension,
    filter: filters[i]
  }));
} catch (e) {
  console.error(e);
  module.exports = [];
}
