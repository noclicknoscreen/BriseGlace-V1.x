var scribble = new Scribble();              // global mode

var x1, y1, x2, y2, x3, y3, x4, y4, w, h, radius;

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
    
  background(200);
  stroke( 255, 0, 0 );
  strokeWeight( 5 );

  scribble.bowing = 0;          // changes the bowing of lines
  scribble.roughness = 2;       // changes the roughness of lines
  scribble.maxOffset = 1;       // coordinates will get an offset, here you define the max offset
  scribble.numEllipseSteps = 1; // defines how much curves will be used to draw an ellipse
  
  // ------------------------------
  x1 = 0.25 * width;
  y1 = 0.5 * height;
  x2 = 0.75 * width;
  y2 = 0.5 * height;
  x3 = 0.15 * width;
  y3 = 0.65 * height;
  x4 = 0.45 * width;
  y4 = 0.85 * height;
  w = 100;
  h = 100 ;
  radius = 50;
  var gap = 10;
  var angle = 20;

  scribble.scribbleLine( x1, y1, x2, y2 );
  scribble.scribbleCurve( x1, y1, x2, y2, x3, y3, x4, y4 );
  scribble.scribbleRect( x1, y1, w, h );
  scribble.scribbleRoundedRect( x1, y1, w, h, radius );
  scribble.scribbleEllipse( x1, y1, w, h );
  scribble.scribbleFilling( {x1, x2, x3, x4}, {y1,y2, y3, y4}, gap, angle );
  

}