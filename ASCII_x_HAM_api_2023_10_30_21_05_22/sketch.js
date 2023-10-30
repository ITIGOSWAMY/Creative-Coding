let apiKey = 'eec85815-ab2e-465c-acab-f168f2edfb1f';
let artworks = [];
const density = "abcdefghijklmnopqrstuvwxyz@#$?!9876543210;:+=-,._ ";
let img;
let selectedArtworkTitle = ''; 
let spacebarPressed = false;

function setup() {
  createCanvas(windowWidth, windowHeight);
  generateNewArtwork();
}

function draw() {}

function keyPressed() {
  if (key === ' ') {
    spacebarPressed = true;
    generateNewArtwork();
  }
}

function mousePressed() {
  generateNewArtwork();
}

async function generateNewArtwork() {
  if (!spacebarPressed) {
    spacebarPressed = false; 
  }

  let request = await fetch(`https://api.harvardartmuseums.org/object?apikey=${apiKey}&size=50`);
  let data = await request.json();

  artworks = data.records.filter(artwork => artwork.primaryimageurl);

  if (artworks.length > 0) {
    let randomIndex = Math.floor(random(artworks.length));
    let selectedArtwork = artworks[randomIndex];
    selectedArtworkTitle = selectedArtwork.title; 

    loadImage(selectedArtwork.primaryimageurl, function(loadedImg) {
      img = loadedImg;
      background(0);
      img.loadPixels();
      let w = img.width;
      let h = img.height;

      for (let j = 0; j < h; j++) {
        for (let i = 0; i < w; i++) {
          const pixelIndex = (i + j * w) * 4;
          const r = img.pixels[pixelIndex + 0];
          const g = img.pixels[pixelIndex + 1];
          const b = img.pixels[pixelIndex + 2];

          const avg = (r + g + b) / 3;

          const charIndex = floor(map(avg, 0, 255, density.length, 0));
          const c = density.charAt(charIndex);

          if (c != " ") {
            fill(255);
            textSize(8); 
            text(c, i * 8, j * 8); 
          }
        }
      }

      console.log("Title:", selectedArtworkTitle);
    });
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}