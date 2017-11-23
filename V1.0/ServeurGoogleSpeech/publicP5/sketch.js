
var myFont;
var myText;

var socket;

function preload() {
  myFont = loadFont('assets/Abel-Regular.ttf');
}

function setup() {

  createCanvas(600, 400);
  background(100);

  socket = io.connect('http://localhost:3000');
  socket.on('words', newTranscription);

  myText = 'P5.js';

}

function draw() {

  background(100, 100, 100, 150);

  fill('#ED225D');
  textFont(myFont);
  textSize(48);
  textAlign(CENTER);
  text(myText, width / 2, height / 2);
}

function mouseClicked(){
    whatsNewRequest();
}

/* ---------------------------------------------
Socket events
----------------------------------------------- */
function whatsNewRequest(){
  var mouseData = {
    x : mouseX,
    y : mouseY
  }

  console.log("Requesting What's new : \n" + mouseData.x + "," + mouseData.y);
  socket.emit('whatsNew', mouseData);

}

function newTranscription(transcrData){
  console.log("Acquiring new transcription : \n" + transcrData.results[0].alternatives[0].transcript);
  myText = transcrData.results[0].alternatives[0].transcript;
}
