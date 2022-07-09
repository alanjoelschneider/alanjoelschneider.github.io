const stick = document.getElementById('stick');

// Hide stick for desktop browsers
if (!navigator.userAgent.toLowerCase().match(/mobile/i)) {
  stick.hidden = true;
}

const left = stick.children[0];
const up = stick.children[1];
const right = stick.children[2];
const down = stick.children[3];

const stickPressing = {
  left: false,
  up: false,
  right: false,
  down: false,
};

left.addEventListener(
  'touchstart',
  function () {
    stickPressing['left'] = true;
  },
  false
);

left.addEventListener(
  'touchend',
  function () {
    stickPressing['left'] = false;
  },
  false
);

up.addEventListener(
  'touchstart',
  function () {
    stickPressing['up'] = true;
  },
  false
);

up.addEventListener(
  'touchend',
  function () {
    stickPressing['up'] = false;
  },
  false
);

right.addEventListener(
  'touchstart',
  function () {
    stickPressing['right'] = true;
  },
  false
);

right.addEventListener(
  'touchend',
  function () {
    stickPressing['right'] = false;
  },
  false
);

down.addEventListener(
  'touchstart',
  function () {
    stickPressing['down'] = true;
  },
  false
);

down.addEventListener(
  'touchend',
  function () {
    stickPressing['down'] = false;
  },
  false
);
