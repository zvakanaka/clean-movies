const fs = require('fs')

module.exports = {
  exists,
  read,
  write
};

function exists(path) {
  return fs.existsSync(path);
}

function read(fileName) {
  try {
    const content = fs.readFileSync(`${process.cwd()}/${fileName}`).toString();
    return content;
  } catch (e) {
    throw new Error(e);
  }
}

function write(fileName, content) {
  if (!fileName || !content) {
    throw new Error('Both file name and content must be provided in order to write to file');
  }

  try {
    fs.writeFileSync(fileName, content);
  } catch (e) {
    throw new Error(e);
  }
}
