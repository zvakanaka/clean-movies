const debug = process.env.DEBUG && process.env.DEBUG.includes('clean-movie-server')
  ? console.info : () => {};

module.exports = debug;
