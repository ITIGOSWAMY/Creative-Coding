let particles = [];
let numParticles = 10;
let lastRectangleTime = 0;
let rectangleInterval = 6000; 
let clickedParticles = [];
let stopGenerating = false; 

function setup() {
  createCanvas(windowWidth, windowHeight);
  for (let i = 0; i < numParticles; i++) {
    let x = random(width);
    let y = random(height);
    let particle = new Particle(x, y, 5); 
    particles.push(particle);
  }
}

function draw() {
  background(0);

  for (let particle of particles) {
    if (!particle.frozen) {
      particle.move();
      particle.bounce();
    }
    particle.display();
  }

  for (let clickedParticle of clickedParticles) {
    stroke(220);
    line(mouseX, mouseY, clickedParticle.position.x, clickedParticle.position.y);
  }

  if (!stopGenerating && particles.length < numParticles) {
    if (millis() - lastRectangleTime > rectangleInterval) {
      let x = random(width);
      let y = random(height);
      let particle = new Particle(x, y, 5); 
      particles.push(particle);
      lastRectangleTime = millis();
    }
  }
}

function mousePressed() {
  for (let particle of particles) {
    if (particle.contains(mouseX, mouseY) && !particle.clicked) {
      particle.clicked = true;
      clickedParticles.push(particle);
      particle.frozen = true; 
    }
  }

  if (clickedParticles.length === particles.length) {
    stopGenerating = true; 
  }
}

class Particle {
  constructor(x, y, velocityMagnitude) {
    this.position = createVector(x, y);
    this.velocity = p5.Vector.random2D().mult(velocityMagnitude); 
    this.size = 30;
    this.colors = [color(255, 0, 0), color(0, 0, 255), color(255, 255, 0)];
    this.color = random(this.colors);
    this.clicked = false;
    this.frozen = false;
  }

  move() {
    this.position.add(this.velocity);
  }

  bounce() {
    if (this.position.x < 0 || this.position.x > width) {
      this.velocity.x *= -1;
    }
    if (this.position.y < 0 || this.position.y > height) {
      this.velocity.y *= -1;
    }
  }

  display() {
    fill(this.color);
    noStroke();
    rectMode(CENTER);
    rect(this.position.x, this.position.y, this.size, this.size);
  }

  contains(x, y) {
    let d = dist(x, y, this.position.x, this.position.y);
    return d < this.size / 2;
  }
}
