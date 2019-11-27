const html = (arr, ...parts) => {
  return arr.reduce((acc, cur, i) => {
    return `${acc}${cur}${parts[i] ? parts[i] : ''}`;
  }, '');
};

module.exports = html;
