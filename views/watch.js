if (/&t=\d+/.test(location.search)) {
  video.currentTime = location.search.match(/&t=(\d+)/)[1];
}
setInterval(() => {
  if (location.search.includes('&t=')) {
    history.replaceState(null, '', location.search.replace(/&t=\d*/, `&t=${parseInt(video.currentTime, 10)}`));
  } else {
    history.replaceState(null, '', `${location.search}&t=${parseInt(video.currentTime, 10)}`);
  }
}, 2000);

const GAP = 0.35;
video.addEventListener('timeupdate', event => {
  if (editArr.length > 0) {
    const found = editArr.find(ed => video.currentTime >= ed.start - GAP && video.currentTime < ed.end);
    if (found) video.currentTime = found.end;
  }
});
