let sound;
let planes = [];
let dark = true;
let isPaused = false; 
let speedChange = 1; 
const api_key = 'eec85815-ab2e-465c-acab-f168f2edfb1f';
const api_url = 'https://api.harvardartmuseums.org/image';

function preload() {
  sound = loadSound('Shigeo Sekito - the word II.mp3');
}

function setup() {
  createCanvas(192 * 10, 108 * 10, WEBGL);
  const unitS = width / 20;
  createPlanes(unitS, 10);
  sound.setVolume(0.5); 
  sound.loop(); 
}

function createPlanes(unitS, num) {
  for (let i = 0; i < num; i++) {
    loadImageFromAPI(color(255, 200));
  }

  for (let x = -width / 2; x < width / 2; x += unitS) {
    for (let y = -width * 2; y < width / 2; y += unitS) {
      let col = color(255, 200);
      if (random(10) < 1) {
        let v = random(100, 0);
        col = random() < 0.5 ? color(255, v, v, 255) : color(v, v, 255, 255);
      }
      loadImageFromAPI(col);
    }
  }
}

async function loadImageFromAPI(col) {
  const params = {
    apikey: api_key,
    sort: 'random',
  };

  const response = await fetch(api_url + '?' + new URLSearchParams(params));
  const data = await response.json();

  if (data.records && data.records.length > 0) {
    const imgUrl = data.records[0].baseimageurl;

    loadImage(imgUrl, (img) => {
      planes.push(new Plane(
        img.width / 8,
        createVector(random(-width / 2, width / 2), random(-height / 2, height / 2), random(-width * 2, width / 2)),
        col,
        img
      ));
    });
  }
}

function draw() {
  background(dark ? 20 : 220);

  planes.forEach(plane => {
    if (!isPaused) { 
      plane.update();
    }
    plane.show();
  });
}

function keyPressed() {
  if (key === ' ') { // Spacebar pressed
    isPaused = !isPaused; // Toggle pause/play
  } else if (key === 'ArrowUp') {
    increaseSpeed(); // Increase speed
  } else if (key === 'ArrowDown') {
    decreaseSpeed(); // Decrease speed
  }
}

function increaseSpeed() {
  planes.forEach(plane => {
    plane.speed += speedChange; 
  });
}

function decreaseSpeed() {
  planes.forEach(plane => {
    plane.speed = max(0, plane.speed - speedChange); 
  });
}

class Plane {
  constructor(size, pos, col, img) {
    this.size = size;
    this.pos = pos;
    this.off = createVector(0, 0, 0);
    this.col = col;
    this.img = img;
    this.speed = 3;
  }

  update() {
    this.pos.z += this.speed;
    if (this.pos.z > width / 2) {
      this.off.set((mouseX - width / 2) * 0.7, (mouseY - height / 2) * 0.7, 0);
      this.pos.z = -width * 2;
    }
  }

  show() {
    push();
    noStroke();

    let zoff = noise(this.pos.x / width, this.pos.z / width, frameCount / 100.0) * height / 4 - height / 8;

    let x = this.pos.x + this.off.x;
    let y = this.pos.y + this.off.y + zoff;
    let z = this.pos.z;

    translate(x, y, z);
    texture(this.img);
    plane(this.size, this.size);
    pop();
  }
}
