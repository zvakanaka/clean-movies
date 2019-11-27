const normalize = str => {
  return decodeURIComponent(str)
    .toLowerCase()
    .replace(/[_\-]/g, ' ')
    .replace(/\s\w/g, val => ` ${val[1].toUpperCase()}`)
    .replace(/^\w/, val => `${val[0].toUpperCase()}`)
    .split('.')[0];
};

module.exports = normalize;
