let apiKey = 'eec85815-ab2e-465c-acab-f168f2edfb1f'; 
let artworks = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  generateNewArtwork();
}

function draw() {

}

function mousePressed() {
  generateNewArtwork(); 
}

async function generateNewArtwork() {
  let request = await fetch(`https://api.harvardartmuseums.org/object?apikey=${apiKey}&size=50`); 
  let data = await request.json();

  artworks = data.records.filter(artwork => artwork.primaryimageurl);

  if (artworks.length > 0) {
    let randomIndex = Math.floor(random(artworks.length));
    let selectedArtwork = artworks[randomIndex];

    createImg(selectedArtwork.primaryimageurl, "artwork").position(0, 0);
    console.log("Title:", selectedArtwork.title);
    
  }
}
