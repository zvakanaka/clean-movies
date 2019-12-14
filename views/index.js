const html = require('../lib/html');
const file = require('../lib/file');

const DEFAULT_TITLE = 'Clean Movie Server';

module.exports = {
  head,
  header,
  editor
};

function head (options = {}) {
  const styleFile = options.styleFileName ? options.styleFileName : 'views/style/main.css';
  const style = styleFile ? `<style>${file.read(styleFile)}</style>` : '';

  return html`<!DOCTYPE html>
<html lang="en">
  <head>
    <meta content="width=device-width,initial-scale=1.0" name="viewport">
    <meta charset="utf-8" />
    <title>${options.title || DEFAULT_TITLE}</title>
    ${style}
  </head>
  <body>`;
}

function header (options = {}) {
  return html`
<header>
  <div class="row">
    <span class="title">${options.title || DEFAULT_TITLE}</span>
    <!-- <span class="burger"></span> --><span></span>
  </div>
</header>
`;
}

function editor () {
  return html`
    <style>
      .side-by-side {
        display: flex;
        justify-content: space-around;
      }
      .center {
        justify-content: center;
      }
      .side-by-side_side {
        display: flex;
        flex-direction: column;
      }
      .fields {
        display: flex;
        flex-direction: column;
        align-self: center;
      }
    </style>
    <article>
      <div class="side-by-side center">
        <button class="seek-button seek-back-30">30</button>
        <button class="seek-button seek-back-10">10</button>
        <button class="seek-button seek-back-5">5</button>
        <button class="seek-button seek-back-2">2</button>
        <button class="seek-button seek-back-1">1</button>
        <button class="seek-button seek-back-point-5">.5</button>
        <button class="seek-button seek-back-point-25">.25</button>
        <span><<</span>
        •
        <span>>></span>
        <button class="seek-button seek-point-25">.25</button>
        <button class="seek-button seek-point-5">.5</button>
        <button class="seek-button seek-1">1</button>
        <button class="seek-button seek-2">2</button>
        <button class="seek-button seek-5">5</button>
        <button class="seek-button seek-30">30</button>
      </div>
      <div class="side-by-side">
        <div>
          <h2 title="Mark a part of the video to be skipped">Cut Tool</h2>
          <div class="side-by-side">
            <div class="side-by-side_side">
              <button class="mark-start">Mark Start</button>
              <button class="mark-goto-start">Go to Mark</button>
            </div>
            <div class="side-by-side_side">
              <button class="mark-end">Mark End</button>
              <button class="mark-goto-end">Go to Mark</button>
            </div>
          </div>
          <div class="fields">
            <label>Category <select class="category">
              <option value="">Select One</option>
              <option value="l">L</option>
              <option value="v">V</option>
              <option value="s">S</option>
              <option value="d">D</option>
            </select>
          </label>
            <label>Rating <select class="rating">
              <option value="">Select One</option>
              <option value="g">G</option>
              <option value="pg">PG</option>
              <option value="pg-13">PG-13</option>
              <option value="r">R</option>
            </select>
          </label>
            <label>Note <textarea class="note"></textarea></label>
          </div>
          <button class="add">Add</button>
        </div>

        <div class="fields">
        <textarea class="json" cols="30" rows="10"></textarea>
          <button class="apply">Apply</button>
        </div>
      </div>
      <hr>
      <div class="side-by-side center">
        <button class="grab-current" title="update the input with the current time">Grab Current Time</button>
        <input type="number" class="time-input">
        <button class="set-current" title="set the video with the current time">Set Current Time</button>
      </div>
    </article>
    `;
}
