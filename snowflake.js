const CANVAS_SIZE = 200;
const ARM_WIDTH = 3;
//https://m2.material.io/design/color/the-color-system.html#tools-for-picking-colors
const LIGHT_BLUE = [
  "#01579B",
  "#0277BD",
  "#0288D1",
  "#039BE5",
  "#03A9F4",
  "#29B6F6",
  "#4FC3F7",
  "#81D4FA",
  "#B3E5FC",
  "#E1F5FE"
];

const YELLOW = [
  "#F57F17",
  "#F9A825",
  "#FBC02D",
  "#FDD835",
  "#FFEB3B",
  "#FFEE58",
  "#FFF176",
  "#FFF59D",
  "#FFF9C4",
  "#FFFDE7"
];

const RED = [
  "#B71C1C",
  "#C62828",
  "#D32F2F",
  "#E53935",
  "#F44336",
  "#EF5350",
  "#E57373",
  "#EF9A9A",
  "#FFCDD2",
  "#FFEBEE"
]

const GREEN = [
  "#1B5E20",
  "#2E7D32",
  "#388E3C",
  "#43A047",
  "#4CAF50",
  "#66BB6A",
  "#81C784",
  "#A5D6A7",
  "#C8E6C9",
  "#E8F5E9"
]

class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  add(dx, dy) {
    return new Point(this.x + dx, this.y + dy);
  }
}

class Particle {
  constructor() {
    this.from = new Point(0, -CANVAS_SIZE / 2);
    this.to = new Point(0, -CANVAS_SIZE / 2);
  }
  update() {
    this.from = new Point(this.to.x, this.to.y);
    const x = nextRandom(-ARM_WIDTH, ARM_WIDTH);
    this.to = this.from.add(x, 1);
  }
}

function nextRandom(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

function toRadians(degrees) {
  return degrees * Math.PI / 180;
}


const c = document.getElementById("canvas");
const ctx = c.getContext("2d");
ctx.translate(CANVAS_SIZE / 2, CANVAS_SIZE / 2);
ctx.lineWidth = 3;

function generate(passes, arms, colors) {
  ctx.clearRect(-CANVAS_SIZE/2, -CANVAS_SIZE/2, CANVAS_SIZE, CANVAS_SIZE);
  for (p = 0; p < passes; p++) {
    ctx.strokeStyle = colors[p % colors.length];
    ctx.beginPath();
    var particle = new Particle();
    for (i = 0; i < CANVAS_SIZE / 2; i++) {
      particle.update();
      for (r = 0; r < arms; r++) {
        ctx.moveTo(particle.from.x, particle.from.y);
        ctx.lineTo(particle.to.x, particle.to.y);

        ctx.moveTo(-particle.from.x, particle.from.y);
        ctx.lineTo(-particle.to.x, particle.to.y);

        ctx.rotate(toRadians(360 / arms));
      }
    }
    ctx.stroke();
  }
}


function snowflake() {
  generate(20, 6, LIGHT_BLUE);
}

function star() {
  generate(20, 5, YELLOW);
}

function random() {
  generate(nextRandom(5, 20), nextRandom(3, 8), Math.random() < 0.5 ? RED : GREEN);
}

snowflake();