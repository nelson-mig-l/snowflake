var CANVAS_SIZE = 200;
var ARMS = 6;

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
        this.from = new Point(0, CANVAS_SIZE /2);
        this.to = new Point(0, CANVAS_SIZE /2);
    }
    update() {
        this.from = new Point(this.to.x, this.to.y);
        var x = nextRandom(-3, 3);
        this.to = this.from.add(x, -1);
    }
}

function nextRandom(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

var c = document.getElementById("canvas");
var ctx = c.getContext("2d");
ctx.translate(CANVAS_SIZE/2, CANVAS_SIZE/2);
ctx.lineWidth = 3;

var COLORS = [
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

for (p = 0; p < 20; p++) {
    ctx.strokeStyle = COLORS[p % 10];
    ctx.beginPath();
    var particle = new Particle();
    for (i = 0; i < CANVAS_SIZE / 2; i++) {
        particle.update();
        for (r = 0; r < ARMS; r++) {
            ctx.moveTo(particle.from.x, particle.from.y);
            ctx.lineTo(particle.to.x, particle.to.y);

            ctx.moveTo(-particle.from.x, particle.from.y);
            ctx.lineTo(-particle.to.x, particle.to.y);

            ctx.rotate((360/ARMS) * Math.PI / 180);
        }
    }
    ctx.stroke();
}

