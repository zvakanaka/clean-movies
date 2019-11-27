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
const VIDEO_PATH = require('./lib/video-path');

const SUPPORTED_VIDEO_TYPES = [
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
        <ul>
        ${movies.map(movie => `
          <li>
            <a href="${baseUrl}/play?movie=${movie}">${normalize(movie)}</a>
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
<article>
  <video controls src="${baseUrl}/video-stream?movie=${fileName}"></video>
  ${editMode ? htmlParts.editor() : ''}
</article>
<script>
  const sel = selector => document.querySelector(selector);
  const video = sel('video');

  let editArr = ${foundFilter ? JSON.stringify(foundFilter.filter, null, 2) : '[]'};
  let edit = {};
  ${editMode ? `
  const json = sel(".json");
  json.value = JSON.stringify(editArr, null, 2);
  const start = sel(".mark-start");
  const gotoMarkStart = sel(".mark-goto-start");
  const end = sel(".mark-end");
  const gotoMarkEnd = sel(".mark-goto-end");
  start.addEventListener("click", () => {
    edit.start = video.currentTime;
  });
  gotoMarkStart.addEventListener("click", () => {
    video.currentTime = edit.start || 0;
  });
  end.addEventListener("click", () => {
    edit.end = video.currentTime;
  });
  gotoMarkEnd.addEventListener("click", () => {
    video.currentTime = edit.end || 0;
  });

  const note = sel(".note");
  const category = sel(".category");
  const rating = sel(".rating");

  const add = sel(".add");

  add.addEventListener("click", () => {
    edit.start = edit.start || 0;
    edit.end = edit.end || 0;
    edit.category = category.value;
    edit.rating = rating.value;
    edit.note = note.value;
    editArr.push(edit);
    editArr.sort((a, b) => {
      return a.start > b.start;
    });
    edit = {};
    json.value = JSON.stringify(editArr, null, 2);
  });

  const apply = sel(".apply");
  apply.addEventListener("click", () => {
    try {
      editArr = JSON.parse(json.value);
    } catch (e) {
      console.error(e);
    }
  });

  const timeInput = document.querySelector('.time-input');
  const grabCurrent = document.querySelector('.grab-current');
  grabCurrent.addEventListener('click', () => {
    timeInput.value = video.currentTime;
  });
  const setCurrent = document.querySelector('.set-current');
  setCurrent.addEventListener('click', () => {
    video.currentTime = Number(timeInput.value);
  });

  const seekButtons = document.querySelectorAll('.seek-button');
  seekButtons.forEach(button => {
    const regExpArr = button.classList[1].match(/seek-(back-)?(point-)?(\\d+)/);
    if (regExpArr) {
      const [, back, point, value] = regExpArr;
      const seekAmount = Number(\`\${back ? '-' : ''}\${point ? '0.' : ''}\${value}\`);
      button.addEventListener('click', () => {
        video.currentTime += seekAmount;
      })
    }
  });
  ` : ''}

  if (\/&t=\\d+\/.test(location.search)) {
    video.currentTime = location.search.match(\/&t=(\\d+)\/)[1];
  }
  setInterval(() => {
    if (location.search.includes('&t=')) {
      history.replaceState(null, '', location.search.replace(\/&t=\\d*\/, \`&t=\${parseInt(video.currentTime, 10)}\`));
    } else {
      history.replaceState(null, '', \`\${location.search}&t=\${parseInt(video.currentTime, 10)}\`);
    }
  }, 2000);

  const GAP = 0.35;
  video.addEventListener('timeupdate', event => {
    if (editArr.length > 0) {
      const found = editArr.find(ed => video.currentTime >= ed.start - GAP && video.currentTime < ed.end);
      if (found) video.currentTime = found.end;
    }
  });
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
