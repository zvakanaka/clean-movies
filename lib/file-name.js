function fileName(str) {
  const regexArr = str.match(/(^.*)\/(([\w-.:]+)(\.[\w]+$))/);
  if (!regexArr) {
    const plainFileRegexArr = str.match(/([\w-.:]+)(\.[\w]+$)/);
    if (!plainFileRegexArr) throw new Error(`Bad file name: ${str}`);
    const [ fileName, fileWithoutExtension, extension ] = plainFileRegexArr;
    return {
      fileName,
      fileWithoutExtension,
      extension,
      path: './'
    };
  }
  const [ , path, fileName, fileWithoutExtension, extension ] = regexArr;
  return {
    path,
    fileName,
    fileWithoutExtension,
    extension
  };
}

module.exports = fileName;
