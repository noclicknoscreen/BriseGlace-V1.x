
var radius = 10;
var radiusMin, radiusMax;
var spotTexture;

function preload() {
  spotTexture = loadImage("assets/spot.jpg")
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(255);
  
  radiusMin = 10;
  radiusMax = 200;
  //radius = constrain(radius, radiusMin, radiusMax);
  
}

function draw() {
  
  noStroke();
  var realAlpha = map(radius, radiusMax, radiusMin, 0, 1);
  fill(150, 130, 200, 150 * sqrt(realAlpha));
  ellipse(mouseX, mouseY, radius);
  
  /*
  imageMode(CENTER);
  blendMode(DARKEST);
  //tint(150, 130, 200, map(radius, radiusMax, radiusMin, 0, 255));
  image(spotTexture, mouseX, mouseY, radius, radius);
  */
  
  radius++;
  radius = constrain(radius, radiusMin, radiusMax);
  
  console.log('Radius = ' + radius);
  
}

function mouseClicked(){
  background(255);
}

function mouseMoved(){
  radius = radiusMin;
  /*
  radius = radius - 2;
  radius = constrain(radius, radiusMin, radiusMax);
  */
}