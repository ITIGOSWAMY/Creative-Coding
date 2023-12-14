function createUI() {
  let artButton = createButton("New Art");
  artButton.position(10, 5);
  artButton.mousePressed(newArt);

  let saveButton = createButton("Save Canvas");
  saveButton.position(10, 65);
  saveButton.mousePressed(saveArt);

  let grainButton = createButton("Add Grain");
  grainButton.position(1250, 5);
  grainButton.mousePressed(addGrain);

  let blurButton = createButton("Add Blur");
  blurButton.position(1250, 35);
  blurButton.mousePressed(addBlur);

  let posterizeButton = createButton("Add Posterize");
  posterizeButton.position(1250, 65);
  posterizeButton.mousePressed(addPosterize);

  let invertButton = createButton("Invert");
  invertButton.position(1400, 5);
  invertButton.mousePressed(Invert);

  let grayscaleButton = createButton("Grayscale");
  grayscaleButton.position(1400, 35);
  grayscaleButton.mousePressed(Grayscale);

  let thresholdButton = createButton("Threshold");
  thresholdButton.position(1400, 65);
  thresholdButton.mousePressed(Threshold);

  }