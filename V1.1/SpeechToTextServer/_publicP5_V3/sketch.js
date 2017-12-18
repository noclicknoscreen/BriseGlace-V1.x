
var socket;
var myEnigmas;
var wordTyped;

function preload() {

  // Enigmas
  myEnigmas = new enigmas();
  myEnigmas.preload();

  // Answers ----------------------------------------------------------
  startAnswers();

  // Gallery ----------------------------------------------------------
  startGallery();

  // Gallery ----------------------------------------------------------
  startFlapper("L'ARBRESLE");

}

function setup() {

  angleMode(DEGREES);
  createCanvas(displayWidth, displayHeight);

  // Load sockets waiting some words----------------------------------
  socket = io.connect('http://localhost:3000');
  socket.on('words', newTranscription);

  wordTyped = '';

}

function draw() {

  background('#fff');

  // Answers ----------------------------------------------------------
  // myAnswers.draw();
  // image(imgBackground, answerPosX, answerPosY);

  // ---------------------------------------------------
  textSize(32);
  textAlign(CENTER);
  text(wordTyped, 0.5 * width, 0.9 * height);

}

function keyReleased(){

  console.log("Key !!!! : " + key);

  if (keyCode == ENTER || keyCode == RETURN) {
    addOneAnswer(wordTyped);
    wordTyped = '';
  }else{
    wordTyped += key;
  }
  return false; // prevent default
}

/* ---------------------------------------------
Socket events
----------------------------------------------- */
function newTranscription(transcrData){

  console.log('[Trancription recue] : ' + transcrData);

  if(transcrData !== ''){
    addOneAnswer(transcrData);
  }

}
