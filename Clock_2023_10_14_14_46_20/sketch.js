let circle1X, circle2X;

const circleRadius = 300;
const circleSpeed = 2;

function setup() {
  createCanvas(windowWidth, windowHeight);
  circle1X = 0;
  circle2X = 0;
}

function draw() {
  background(0);

  circle1X += circleSpeed * deltaTime / 12;
  circle2X += circleSpeed * deltaTime / 360;

  if (circle1X > width + circleRadius) {
    circle1X = -circleRadius;
  }

  if (circle2X > width + circleRadius) {
    circle2X = -circleRadius;
  }

  fill(255, 0, 0);
  stroke(255, 0, 0);
  ellipse(circle1X, windowHeight / 2, circleRadius * 2, circleRadius * 2);

  noFill(0);
  strokeWeight(200);
  stroke(0, 0, 255);
  ellipse(circle2X, windowHeight / 2, circleRadius * 2, circleRadius * 2);
}

  
