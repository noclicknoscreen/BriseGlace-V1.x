
var scribble = new Scribble();              // global mode

function setup() {
createCanvas(windowWidth, windowHeight);
}

function draw() {

  x1 = 85, x2 = 10, x3 = 90, x4 = 15;
  y1 = 20, y2 = 10, y3 = 90, y4 = 80;

  background(200);
  stroke( 255, 0, 0 );
  strokeWeight( 5 );
 
   
  /*
  scribble.bowing = 0;          // changes the bowing of lines
  scribble.roughness = 2;       // changes the roughness of lines
  scribble.maxOffset = 1;       // coordinates will get an offset, here you define the max offset
  scribble.numEllipseSteps = 1; // defines how much curves will be used to draw an ellipse
  */
  
  scribble.scribbleCurve( x1, y1, x2, y2, x3, y3, x4, y4 );
  //scribble.scribbleLine( x1, y1, x2, y2 );

  
  noFill();
  bezier(x1, y1, x2, y2, x3, y3, x4, y4);
  fill(255);

  steps = 10;
  for (i = 0; i <= steps; i++) {
    t = i / steps;
    x = bezierPoint(x1, x2, x3, x4, t);
    y = bezierPoint(y1, y2, y3, y4, t);
    ellipse(x, y, 5, 5);
  }
  

}