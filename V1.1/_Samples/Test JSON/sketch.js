// Examples use USGS Earthquake API:
//   https://earthquake.usgs.gov/fdsnws/event/1/#methods
var earthquakes;

function preload() {
  // Get the most recent earthquake in the database
  var url = 'assets/Enigmas/index.json';
  earthquakes = loadJSON(url);
}

function setup() {
  noLoop();
}

function draw() {
  background(200);
  // Get the magnitude and name of the earthquake out of the loaded JSON
  var file1 = earthquakes.data[0];
  var file2 = earthquakes.data[1];
  
  textAlign(CENTER);
  text(file1, 0, height - 30, width, 30);
  
}