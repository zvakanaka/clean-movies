require('dotenv').config();
const mereServer = require('mere-server');
const protocol = process.env.protocol || 'http';
const port = process.env.PORT || 8888;
const host = process.env.HOST || 'localhost';
const videoStreamer = require('./lib/video-streamer');
const filesInDir = require('files-in-dir');
const normalize = require('./lib/normalize');
const html = require('./lib/html');
const htmlParts = require('./views');
const filters = require('./lib/filters');
const fileParts = require('./lib/file-name');
const file = require('./lib/file');
const VIDEO_PATH = require('./lib/video-path');

const SUPPORTED_VIDEO_TYPES = process.env.SUPPORTED_VIDEO_TYPES ? process.env.SUPPORTED_VIDEO_TYPES.split(',') : [
  'avi',
  'm4v',
  'mov',
  'mp4'
];

const urlPort = protocol === 'http'
  ? port !== '80' ? `:${port}` : ''
  : port !== '443' ? `:${port}` : '';
const baseUrl = `${protocol}://${host}${urlPort}`;

const routes = [
  {
    route: '/',
    bodyCb: (url, req) => {
      const movies = filesInDir(VIDEO_PATH, SUPPORTED_VIDEO_TYPES);
      const title = 'Movie List';

      return `${htmlParts.head({ title: `${title} | Clean Movie Server` })}
      ${htmlParts.header({ title })}
      <article>
        <ul class="movie-list">
        ${movies.map(movie => `
          <li class="movie-link">
            <a href="play?movie=${movie}">${normalize(movie)}</a>
          </li>
          `).join('')}
        </ul>
      </article>
      `;
    },
    method: 'GET'
  },
  {
    route: '/play',
    bodyCb: (url, req) => {
      const fileName = decodeURIComponent(req.url.split('?movie=')[1].split('&')[0]);
      const normalizedFileName = normalize(fileName);
      const editMode = req.url.includes('&edit');

      const foundFilter = filters
        .find(filter => filter.name === fileParts(fileName).fileWithoutExtension);

      return html`
${htmlParts.head({ title: `${normalizedFileName} | Clean Movie Server` })}
${htmlParts.header({ title: normalizedFileName })}
  <video controls src="../video-stream?movie=${fileName}"></video>
  ${editMode ? htmlParts.editor() : ''}
<script>
let editArr = ${foundFilter ? JSON.stringify(foundFilter.filter, null, 2) : '[]'};
let edit = {};

const sel = selector => document.querySelector(selector);
const video = sel('video');
${editMode ? file.read('./views/edit.js') : ''}
${file.read('./views/watch.js')}
</script>
`;
    },
    method: 'GET'
  },
  { route: '/video-stream', method: 'GET', responseType: 'video/mp4' }
];

mereServer.init(routes, {
  port,
  routeHandlers: [
    { method: 'GET', responseType: 'video/mp4', func: videoStreamer }
  ]
});

console.log(`Server running at ${baseUrl}`);
