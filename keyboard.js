const pressing = {};
const DEBUG = false;

document.addEventListener(
  'keydown',
  function (e) {
    if (!e.repeat) {
      pressing[e.key] = true;
      if (DEBUG) {
        console.log(e.key);
      }
    }
  },
  false
);

document.addEventListener(
  'keyup',
  function (e) {
    pressing[e.key] = false;
  },
  false
);
