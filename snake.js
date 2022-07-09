const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const buffer = document.createElement('canvas');
const bufferCtx = buffer.getContext('2d');

let width, height, offsetX, offsetY;

resize();

let gameOver = false;
let foodCount = 0;

let dirSelected = false;

const CELL_SIZE = 10;
const CELL_GAP = 1;

const bg = new Rect(0, 0, buffer.width, buffer.height);

const foodText = new Text(1, 1, foodCount);
foodText.setFont = 'VT323';
const gameOverText = new Text(
  buffer.width / 2,
  buffer.height / 2,
  'GAME OVER',
  'center',
  'center'
);
gameOverText.setFont = 'VT323';
const pauseText = new Text(
  buffer.width / 2,
  buffer.height / 2 + 14,
  'press enter',
  'center',
  'center'
);
foodText.setFont = 'VT323';

let snake = [
  new Rect(
    30 + CELL_GAP,
    10 + CELL_GAP,
    CELL_SIZE - CELL_GAP * 2,
    CELL_SIZE - CELL_GAP * 2
  ),
  new Rect(
    20 + CELL_GAP,
    10 + CELL_GAP,
    CELL_SIZE - CELL_GAP * 2,
    CELL_SIZE - CELL_GAP * 2
  ),
  new Rect(
    10 + CELL_GAP,
    10 + CELL_GAP,
    CELL_SIZE - CELL_GAP * 2,
    CELL_SIZE - CELL_GAP * 2
  ),
];
const HEAD = 0;
const LEFT = 0;
const RIGHT = 1;
const UP = 2;
const DOWN = 3;

const dirDebug = ['LEFT', 'RIGHT', 'UP', 'DOWN'];

const food = new Rect(
  random(buffer.width, CELL_SIZE) + CELL_GAP,
  random(buffer.height, CELL_SIZE) + CELL_GAP,
  CELL_SIZE - CELL_GAP * 2,
  CELL_SIZE - CELL_GAP * 2
);

let dir = RIGHT;
let time = 0;
let ms = 150;

function update() {
  if (!dirSelected) {
    if ((pressing['ArrowLeft'] || stickPressing['left']) && dir != RIGHT) {
      dir = LEFT;
      dirSelected = true;
    } else if (
      (pressing['ArrowRight'] || stickPressing['right']) &&
      dir != LEFT
    ) {
      dir = RIGHT;
      dirSelected = true;
    } else if ((pressing['ArrowUp'] || stickPressing['up']) && dir != DOWN) {
      dir = UP;
      dirSelected = true;
    } else if ((pressing['ArrowDown'] || stickPressing['down']) && dir != UP) {
      dir = DOWN;
      dirSelected = true;
    }
  }

  if (time >= ms) {
    for (let i = snake.length - 1; i > 0; i--) {
      snake[i].x = snake[i - 1].x;
      snake[i].y = snake[i - 1].y;
    }

    if (dir === LEFT) {
      snake[HEAD].x -= CELL_SIZE;
    } else if (dir === RIGHT) {
      snake[HEAD].x += CELL_SIZE;
    } else if (dir === UP) {
      snake[HEAD].y -= CELL_SIZE;
    } else if (dir === DOWN) {
      snake[HEAD].y += CELL_SIZE;
    }

    if (snake[HEAD].x < 0) snake[HEAD].x = buffer.width - CELL_SIZE + 1;
    else if (snake[HEAD].x > buffer.width) snake[HEAD].x = 1;
    else if (snake[HEAD].y < 0) snake[HEAD].y = buffer.height - CELL_SIZE + 1;
    else if (snake[HEAD].y > buffer.height) snake[HEAD].y = 1;

    time -= ms;
    dirSelected = false;
  }

  if (snake[HEAD].intersects(food)) {
    foodCount++;
    foodText.text = foodCount;
    if (foodCount % 5 === 0 && ms >= 60) {
      ms -= 10;
    }
    food.x = random(buffer.width, CELL_SIZE) + CELL_GAP;
    food.y = random(buffer.height, CELL_SIZE) + CELL_GAP;
    snake.push(
      new Rect(
        snake[snake.length - 1].x,
        snake[snake.length - 1].y,
        CELL_SIZE - CELL_GAP * 2,
        CELL_SIZE - CELL_GAP * 2
      )
    );
  }

  for (let i = snake.length - 1; i > 1; i--) {
    if (snake[HEAD].intersects(snake[i])) {
      gameOver = true;
    }
  }

  time += 1000 / 60;
}

function render(ctx) {
  bg.render(ctx, '#000');

  for (let i = snake.length - 1; i > -1; i--) {
    snake[i].render(ctx, '#EEE');
  }

  food.render(ctx, '#999');
  foodText.render(ctx, '#EEE');

  if (gameOver) {
    gameOverText.render(ctx, '#DDD');
    pauseText.render(ctx, '#DDD');
  }
}

function restart() {
  ms = 150;
  snake = [
    new Rect(
      30 + CELL_GAP,
      10 + CELL_GAP,
      CELL_SIZE - CELL_GAP * 2,
      CELL_SIZE - CELL_GAP * 2
    ),
    new Rect(
      20 + CELL_GAP,
      10 + CELL_GAP,
      CELL_SIZE - CELL_GAP * 2,
      CELL_SIZE - CELL_GAP * 2
    ),
    new Rect(
      10 + CELL_GAP,
      10 + CELL_GAP,
      CELL_SIZE - CELL_GAP * 2,
      CELL_SIZE - CELL_GAP * 2
    ),
  ];
  food.x = random(buffer.width, CELL_SIZE) + CELL_GAP;
  food.y = random(buffer.height, CELL_SIZE) + CELL_GAP;
  dir = RIGHT;
  foodCount = 0;
  foodText.text = foodCount;
}

function resize() {
  canvas.width = innerWidth;
  canvas.height = innerHeight;
  const scale = Math.min(
    canvas.width / buffer.width,
    canvas.height / buffer.height
  );
  width = scale * buffer.width;
  height = scale * buffer.height;
  offsetX = (canvas.width - width) / 2;
  offsetY = (canvas.height - height) / 2;
}

window.addEventListener('resize', resize, false);
window.addEventListener('deviceorientation', resize, false);

function loop() {
  if (!gameOver) {
    update();
  } else {
    if (pressing['Enter']) {
      gameOver = false;
      restart();
      pressing['Enter'] = false;
    }
  }
  render(bufferCtx);
  ctx.imageSmoothingEnabled = false;
  ctx.drawImage(buffer, offsetX, offsetY, width, height);
  window.requestAnimationFrame(loop);
}

loop();
