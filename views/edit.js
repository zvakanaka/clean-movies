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
  timeInput.value = video.currentTime.toFixed(2);
});
const setCurrent = document.querySelector('.set-current');
setCurrent.addEventListener('click', () => {
  video.currentTime = Number(timeInput.value);
});

const seekButtons = document.querySelectorAll('.seek-button');
seekButtons.forEach(button => {
  const regExpArr = button.classList[1].match(/seek-(back-)?(point-)?(\d+)/);
  if (regExpArr) {
    const [, back, point, value] = regExpArr;
    const seekAmount = Number(`${back ? '-' : ''}${point ? '0.' : ''}${value}`);
    button.addEventListener('click', () => {
      video.currentTime += seekAmount;
    })
  }
});
