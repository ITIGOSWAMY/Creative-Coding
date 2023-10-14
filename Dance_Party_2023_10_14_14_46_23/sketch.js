let song;
let amp;
let volhistory = [];
let circle;
let spiral;
let lines = []; 

function preload() {
  song = loadSound('AtAll.mp3');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);
  song.play();
  amp = new p5.Amplitude();
  
  circle = new GrowingCircle(width / 12, height / 12); 
  
  spiral = new SpiralDots(width / 2, height / 2); 
  
  let newline = new LineDrawing(random(width), 0);
  lines.push(newline);
  setInterval(createNewLine, 1000);
  
}

function draw() {
  background(0);
  
  circle.display(); 

  for (let line of lines) {
    line.display();
    line.move();
  }
   
  drawWaveform(); 
  
  spiral.display();
  



  // 120 Seconds
  if (frameCount % (60 * 0.5) === 0) {
    circle.grow();
  }

  // Reset 
  if (circle.radius > 200) {
    circle.reset();
  }
  if (spiral.radius > 200) {
    spiral.reset();
  }

}

function drawWaveform() {
  var vol = amp.getLevel();
  volhistory.push(vol);
  noStroke(); 
  fill(0,0,255); 
  push();

  var currentY = map(vol, 0, 1, height, 0);
  translate(0, height / 2 - currentY);
  beginShape();
  vertex(0, height); 
  for (var i = 0; i < volhistory.length; i++) {
    var y = map(volhistory[i], 0, 1, height, 0);
    vertex(i, y);
  }
  vertex(volhistory.length - 1, height); 
  endShape(CLOSE); 

  pop();

  if (volhistory.length > width - 50) {
    volhistory.splice(0, 1);
  }

  stroke(255, 204, 0);
  line(volhistory.length, 0, volhistory.length, height);
}



function createNewLine() {
  let line = new LineDrawing(random(width), 0);
  lines.push(line);
}

class GrowingCircle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.radius = 50; 
  }

  display() {
    fill(255, 0, 0);
    stroke(255, 0, 0); // Red 
    ellipse(this.x, this.y, this.radius * 2);
  }

  grow() {
    this.radius += 10; 
  }

  reset() {
    this.radius = 50; 
  }
}

class SpiralDots {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.angle = 0;
    this.radius = 1;
    this.dotSpacing = 0.10;
    this.direction = 1; 
  }

  display() {
    translate(this.x, this.y);
    fill(220);
    stroke(220); // White

    let x = this.radius * cos(this.angle);
    let y = this.radius * sin(this.angle);
    ellipse(x, y, 5, 5);

    this.angle += 0.55 * this.direction;
    this.radius += this.dotSpacing * this.direction;

    if (this.angle >= 360 && this.direction === 1) {
      this.direction = -1;
    } else if (this.angle <= 0 && this.direction === -1) {
      this.direction = 1;
    }
  }

  reset() {
    this.angle = 0;
    this.radius = 10;
    this.direction = 1;
  }
}

class LineDrawing {
  constructor(x, y) {
    this.x1 = x;
    this.y1 = y;
    this.x2 = x;
    this.y2 = y;
  }

  display() {
    stroke(255, 204, 0); 
    line(this.x1, this.y1, this.x2, this.y2);
  }

  move() {
  
    this.y1 += 1;
    this.y2 += 1;

    if (this.y1 > height) {
    
      this.y1 = 0;
      this.y2 = 0;
      this.x1 = random(width); 
      this.x2 = random(width); 
    }
  }
}