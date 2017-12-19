
var socket;
var wordTyped;
var finalAnswer;

var isGameStarted;

function setup() {

  loadEnigmas('assets/Enigmas/fullBunchEnigmas.json', enigmaLoaded);

  angleMode(DEGREES);
  createCanvas(displayWidth, displayHeight);

  // Load sockets waiting some words----------------------------------
  socket = io.connect('http://localhost:3000');
  socket.on('words', newTranscription);

  wordTyped = '';

  // Hide all of them ----------------------------------------------------------
  // freshStart();

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
      if(isGameStarted === true){
        hangmanTranscript(transcrData);
      }else{
        startForReal();
      }
      addOneAnswer(transcrData);
  }

}

function hangmanTranscript(_transcription){

  var upTranscrData = _transcription.toUpperCase();
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
    endTheGame();

  }
}

// ------------------------------------------------------------------------------------------------------
// ------------------------------------------------------------------------------------------------------
//
// GAME SECTION
//
// ------------------------------------------------------------------------------------------------------
// ------------------------------------------------------------------------------------------------------
function freshStart(){

  myFinalAnswer = finalAnswer();
  // Load fake word -------------------------------------
  startFlapper(emptyWord());
  // Load answer -------------------------------------
  startGallery(clues());

  // --
  hideGallery();
  hideMasterFlapper();
  hideNote();
  // ---
  showMessage();
  // setFirstLine('Bravo !');
  // setSecondLine('Attention à ne pas rater votre train.');

  isGameStarted = false;

  var timerFreshStart = setTimeout(function(){
    showMasterFlapper();
    clearTimeout(timerFreshStart);
  }, 3000);

}

function startForReal(){
  // ---
  showGallery();
  freshStartNote();
  showNote();
  showMasterFlapper();

  // ---
  hideMessage();

  isGameStarted = true;

}

function endTheGame(){

  isGameStarted = false;

  // --
  hideGallery();
  hideNote();
  // ---

  showMessage();
  setFirstLine('Bravo !');
  setSecondLine('Attention à ne pas rater votre train.');
  setThirdLine('Bon Voyage !');

  var timerRelaunch = setTimeout(function(){
    setFirstLine('Re-jouons ensemble...');
    setSecondLine('Trouvons le mot caché !');
    setThirdLine('');
    freshStart();
    clearTimeout(timerRelaunch);
  }, 10000);

}

function enigmaLoaded(){
  //console.log('Enigma callback called !!!!! answer is : ' + finalAnswer());
  freshStart();
}
