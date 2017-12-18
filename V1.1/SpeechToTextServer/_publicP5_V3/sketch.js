
var socket;
var wordTyped;
var finalAnswer;

function preload() {


  // Answers ----------------------------------------------------------
  startAnswers();

  // Gallery ----------------------------------------------------------
  //startGallery();

  // Gallery ----------------------------------------------------------
  startFlapper("NOT STARTED");

}

function setup() {

  loadEnigmas('assets/Enigmas/fullBunchEnigmas.json', enigmaLoaded);

  angleMode(DEGREES);
  createCanvas(displayWidth, displayHeight);

  // Load sockets waiting some words----------------------------------
  socket = io.connect('http://localhost:3000');
  socket.on('words', newTranscription);

  wordTyped = '';

  // Gallery ----------------------------------------------------------
  // startFlapper(myEnigmas.finalAnswer());

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

  if (keyCode == ' ') {
    var fs = fullscreen();
    fullscreen(!fs);
  }

  return false; // prevent default
}

/* ---------------------------------------------
Socket events
----------------------------------------------- */
function newTranscription(transcrData){

  console.log('[Trancription recue] : ' + transcrData);

  if(transcrData !== ''){


    var upTranscrData = transcrData.toUpperCase();
    var upFinalAnswer = myFinalAnswer.toUpperCase();
    var pos = upTranscrData.search(upFinalAnswer);

    console.log('Compare data=' + upTranscrData + '; answer=' + upFinalAnswer);

    if(pos > 0){
      // ---------------------------------------------------
      textSize(32);
      textAlign(CENTER);
      fill('#F00');
      text('GAGNE !!!!!!!!!!!!', 0.5 * width, 0.5 * height);
      console.log('GAGNE !!!!!!!!!!!!!!!!!!!!!');

      startFlapper(displayAnswer());

    }else{
      addOneAnswer(transcrData);

    }
  }

}

function enigmaLoaded(){
  //console.log('Enigma callback called !!!!! answer is : ' + finalAnswer());

  myFinalAnswer = finalAnswer();

  // Load fake word -------------------------------------
  startFlapper(emptyWord());

  // Load answer -------------------------------------
  startGallery(clues());


}
