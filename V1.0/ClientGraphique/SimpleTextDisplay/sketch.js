var myFont;

function preload() {
  myFont = loadFont('assets/Abel-Regular.ttf');
}

function setup() {
  
}

function draw() {
  fill('#ED225D');
  textFont(myFont);
  textSize(36);
  text('p5*js', 10, 50);
}