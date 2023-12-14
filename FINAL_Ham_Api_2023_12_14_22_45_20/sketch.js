const apiKey = "afff3084-bd9a-436f-839b-ac64474d9a30";
let Artwork;
let img;
let windowedCanvas = true;
let canvW = 1500;
let canvH = 2000;
let blurAmt = 5;
let pixVary = 20;
let posterAmt = 3;
let isBlurred = false;
let posterizeLevel = 3;
let isInverted = false;
let isGrayscale = false;
let isThresholded = false;
let originalImg;

let apiUrl = "https://api.harvardartmuseums.org/object?apikey=" + apiKey + "&size=50&sort=random";

function setup() {
  let cnv;
  if (windowedCanvas) {
    cnv = createCanvas(windowWidth - 10, windowHeight - 110);
  } else {
    cnv = createCanvas(canvW, canvH);
  }

  // Set canvas background to white
  background(255);

  pixelDensity(1);
  cnv.position(0, 100);
  createUI();
  newArt();
  stroke(0);
}

async function getHarvardArtwork() {
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    console.log("API Response:", data);
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
}

function gotArtwork(data) {
  const randomIndex = floor(random(data.records.length));
  currentArtwork = data.records[randomIndex];
  console.log(currentArtwork);

  loadAndDrawImage(currentArtwork.primaryimageurl);
}

function gotList(ports) {
  for (let i = 0; i < ports.length; i++) {
    console.log(ports[i]);
  }
}


function newArt() {
  loadJSON(apiUrl, gotArtwork);
}

function drawArtwork() {
  getHarvardArtwork().then((artworkData) => {
    const artworks = artworkData?.records;
    if (artworks && artworks.length > 0) {
      const randomArtwork = random(artworks);
      console.log("artwork is:", randomArtwork);
      loadAndDrawImage(randomArtwork?.primaryimageurl);
    } else {
      console.error("No valid artwork data found.");
    }
  });
}

function loadAndDrawImage(imageUrl) {
  if (imageUrl) {
    img = loadImage(imageUrl, () => {
      const aspectRatio = img.width / img.height;

      // Calculate the new width and height to fit within the canvas
      let newWidth = min(width, img.width);
      let newHeight = newWidth / aspectRatio;

      // Calculate the position to center the image
      let x = (width - newWidth) / 2;
      let y = (height - newHeight) / 2;

      fill(255); // Set fill color to white
      rect(0, 0, width, height); // Draw a white rectangle to cover the canvas
      image(img, x, y, newWidth, newHeight); // Center the image
      imageLoaded();
    });
  } else {
    console.log("didn't find an image, trying again");
    drawArtwork();
  }
}

function addGrain() {
  const timeLapse = millis();
  loadPixels();
  for (let i = 0; i < width; i++) {
    for (let j = 0; j < height; j++) {
      const pix = (i + j * width) * 4;
      pixels[pix] += random(-20, 20);
      pixels[pix + 1] += random(-20, 20);
      pixels[pix + 2] += random(-20, 20);
    }
  }
  updatePixels();
  print("seconds: " + round((millis() - timeLapse) / 100) / 10);
}

function addBlur() {
  isBlurred = !isBlurred;
  if (isBlurred) {
    filter(BLUR, 3, false);
  } else {
    resetToOriginal();
  }
}

function addPosterize() {
  posterizeLevel++;
  applyPosterize();
}

function applyPosterize() {
  if (img) {
    filter(POSTERIZE, posterizeLevel, false);
  }
}

function Invert() {
  isInverted = !isInverted;
  if (isInverted) {
    filter(INVERT);
  } else {
    resetToOriginal();
  }
}

function Grayscale() {
  isGrayscale = !isGrayscale;
  if (isGrayscale) {
    filter(GRAY);
  } else {
    resetToOriginal();
  }
}

function Threshold() {
  isThresholded = !isThresholded;
  if (isThresholded) {
    filter(THRESHOLD);
  } else {
    resetToOriginal();
  }
}


function resetToOriginal() {
  if (originalImg) {
    img = originalImg.get(); 
    image(img, 0, 0);
    imageLoaded();
  }
}

function saveArt() {
  save("myCanvas.jpg");
}


function saveArt() {
  save("myCanvas.jpg");
}