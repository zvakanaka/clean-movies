const fs = require('fs');
const path = require('path');
const VIDEO_PATH = require('./video-path');
const debug = require('./debug');

module.exports = videoStreamer;

function videoStreamer (server, route, bodyCb) {
  server.get(route, async (req, res) => {
    const fileName = req.url.split('?movie=')[1];
    const filePath = path.join(VIDEO_PATH, path.basename(decodeURIComponent(fileName)));
    const stat = fs.statSync(filePath);
    const total = stat.size;
    const range = req.headers.range || 'bytes=0-';
    const [partialstart, partialend] = range.replace(/bytes=/, '').split('-');
    const start = parseInt(partialstart, 10);
    const end = partialend ? parseInt(partialend, 10) : total - 1;
    const chunksize = (end - start) + 1;
    debug(`RANGE: ${start} - ${end} = ${chunksize}`);

    const file = fs.createReadStream(filePath, { start, end });
    res.writeHead(206, {
      'Content-Range': `bytes ${start}-${end}/${total}`,
      'Accept-Ranges': 'bytes',
      'Content-Length': chunksize,
      'Content-Type': 'video/mp4'
    });
    file.pipe(res);
  });
}
