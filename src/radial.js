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

const PURPLE = [
  "#4A148C",
  "#6A1B9A",
  "#7B1FA2",
  "#8E24AA",
  "#9C27B0",
  "#AB47BC",
  "#BA68C8",
  "#CE93D8",
  "#E1BEE7",
  "#F3E5F5"
]

const ALL = [
  LIGHT_BLUE, YELLOW, RED, GREEN, PURPLE
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
  constructor(step, length) {
    this.step = step;
    this.from = new Point(0, -length);
    this.to = new Point(0, -length);
  }
  update() {
    this.from = new Point(this.to.x, this.to.y);
    const x = randomInRange(-this.step, this.step);
    this.to = this.from.add(x, 1);
  }
}

class Radial {
  constructor(canvas) {
    this.size = Math.min(canvas.width, canvas.height);
    this.ctx = canvas.getContext('2d');
  }

  /**
   * Generate a "snowflake".
   * @param {*} passes number of particles for the arm
   * @param {*} arms number of arms (vertices)
   * @param {*} colors color palette
   * @param {*} thickness pen width
   * @param {*} step random walk step
   */
  generate(passes, arms, colors, thickness, step) {
    this.ctx.translate(this.size / 2, this.size / 2);
    const length = this.size / 2 - (thickness + 5);
    this.ctx.lineWidth = thickness;
    this.ctx.clearRect(-this.size / 2, -this.size / 2, this.size, this.size);
    for (var p = 0; p < passes; p++) {
      this.ctx.strokeStyle = colors[p % colors.length];
      this.ctx.beginPath();
      var particle = new Particle(step, length);
      for (var i = 0; i < length; i++) {
        particle.update();
        for (var r = 0; r < arms; r++) {
          this.ctx.moveTo(particle.from.x, particle.from.y);
          this.ctx.lineTo(particle.to.x, particle.to.y);

          this.ctx.moveTo(-particle.from.x, particle.from.y);
          this.ctx.lineTo(-particle.to.x, particle.to.y);

          this.ctx.rotate(toRadians(360 / arms));
        }
      }
      this.ctx.stroke();
    }
    this.ctx.translate(-this.size / 2, -this.size / 2);
  }
}

function randomInRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

function toRadians(degrees) {
  return degrees * Math.PI / 180;
}

function snowflake(canvas, thickness, step) {
  new Radial(canvas).generate(20, 6, LIGHT_BLUE, thickness, step);
}

function star(canvas, thickness, step) {
  new Radial(canvas).generate(20, 5, YELLOW, thickness, step);
}

function flower(canvas, thickness, step) {
  new Radial(canvas).generate(15, 12, RED, thickness, step);
}

function triangle(canvas, thickness, step) {
  new Radial(canvas).generate(25, 3, PURPLE, thickness, step);
}

function random(canvas) {
  const passes = randomInRange(5, 20);
  const arms = randomInRange(3, 12);
  const colors = ALL[randomInRange(0, ALL.length - 1)];
  const thickness = randomInRange(1, 5);
  const step = randomInRange(1, 5);
  console.log([passes, arms, colors, thickness, step])
  new Radial(canvas).generate(passes, arms, colors, thickness, step);
}

module.exports = { snowflake, star, flower, triangle, random };
