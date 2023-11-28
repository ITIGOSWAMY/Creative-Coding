let serial;
let portName = "/dev/tty.usbmodem101";

let activeSensor = "";

let potValue = 0;
let photoValue = 0;

var num = 2000;
var noiseScale = 500,
  noiseStrength = 1;
var particles = [];

function setup() {
  createCanvas(windowWidth, windowHeight);

  serial = new p5.SerialPort();

  serial.onList(gotList);
  serial.list();

  serial.onOpen(gotOpen);
  serial.openPort(portName);

  serial.onData(gotData);

  noStroke();
  for (let i = 0; i < num; i++) {
    var loc = createVector(random(width * 1.2), random(height), 2);
    var angle = 0;
    var dir = createVector(cos(angle), sin(angle));
    var speed = random(0.5, 2);
    particles[i] = new Particle(loc, dir, speed);
  }
}

function draw() {
  // The background color is now adjusted based on the photocell value
  background(photoValue, 30, 45);

  for (let i = 0; i < particles.length; i++) {
    particles[i].run();
  }
}

class Particle {
  constructor(_loc, _dir, _speed) {
    this.loc = _loc;
    this.dir = _dir;
    this.speed = _speed;
  }

  run() {
    this.move();
    this.checkEdges();
    this.update();
  }

  move() {
    let angle =
      noise(this.loc.x / noiseScale, this.loc.y / noiseScale, frameCount / noiseScale) *
      TWO_PI *
      noiseStrength;
    this.dir.x = cos(angle);
    this.dir.y = sin(angle);
    var vel = this.dir.copy();
    var d = 1;
    vel.mult(this.speed * d);
    this.loc.add(vel);
  }

  checkEdges() {
    if (this.loc.x < 0 || this.loc.x > width || this.loc.y < 0 || this.loc.y > height) {
      this.loc.x = random(width * 1.2);
      this.loc.y = random(height);
    }
  }

  update() {
    fill(255);
    ellipse(this.loc.x, this.loc.y, this.loc.z);
  }
}

function gotList(ports) {
  for (let i = 0; i < ports.length; i++) {
    console.log(ports[i]);
  }
}

function gotOpen() {
  console.log("port Open");
}

function gotData() {
  let newData = serial.readLine();
  if (newData.length <= 0) return;

  if (newData === "potentiometer" || newData === "photocell") {
    activeSensor = newData;
  } else {
    if (activeSensor === "photocell") {
      photoValue = newData / 4;
    }

    if (activeSensor === "potentiometer") {
      potValue = newData;

      for (let i = 0; i < particles.length; i++) {
        particles[i].speed = map(potValue, 0, 1023, 0.5, 2);
      }
    }
  }
}