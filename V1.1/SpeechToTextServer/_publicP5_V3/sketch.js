
var socket;
var wordTyped;
var myFinalAnswer;

var isGameStarted;

var drawFeedBack;

function setup() {

  loadEnigmas('assets/Enigmas/fullBunchEnigmas.json', enigmaLoaded);

  angleMode(DEGREES);
  createCanvas(displayWidth, displayHeight);

  // Load sockets waiting some words----------------------------------
  socket = io.connect('http://localhost:3000');
  socket.on('words', newTranscription);
  socket.on('talking', function(){
    drawFeedBack = true;
  });
  socket.on('endTalking', function(){
    drawFeedBack = false;
  });

  wordTyped = '';

  // Hide all of them ----------------------------------------------------------
  // freshStart();
  drawFeedBack = false;

}

function draw() {

  background('#fff');

  if(drawFeedBack == true){
    fill('#f0f');
    nostroke();
    rect(width/2, height/2, 10, 10);}
  };

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

      var result = false;

      if(enigmaType() === 'motus'){
        result = motusTranscript(transcrData);
        // result = hangmanTranscript(transcrData);
      }else if (enigmaType() === 'hangman') {
        result = hangmanTranscript(transcrData);
      }

      if(result===true){
        endTheGame();
      }else {
        addOneAnswer(transcrData);
      }

    }else{
      addOneAnswer(transcrData);
      startForReal();
    }
  }

}

// ---------------------------------------------------------------------------------------
// Game : Pendu
// On essaie des mots jusqu'à trouver la bonne réponse
function hangmanTranscript(_transcription){

  var upTranscrData = _transcription.toUpperCase();
  var upFinalAnswer = myFinalAnswer.toUpperCase();
  var pos = upTranscrData.search(upFinalAnswer);

  console.log('Compare data=' + upTranscrData + '; answer=' + upFinalAnswer);

  // ---------------------------------------------------
  return compareAnswers(motusAnswer);

}

// ---------------------------------------------------------------------------------------
// Game : Motus
// On garde les lettres à la bonne place jusqu'à avoir complété tout le mot

var motusAnswer = '';

function motusTranscript(_transcription){

  var tempMotusAnswer = '';

  var upTranscrData = _transcription.toUpperCase();
  upTranscrData = upTranscrData.trim();
  upTranscrData = upTranscrData.replace('"','');

  var upFinalAnswer = myFinalAnswer.toUpperCase();

  for(idxLetter=0;idxLetter<upFinalAnswer.length;idxLetter++){

    console.log('Comparaison ['+idxLetter+'] : ' + upTranscrData[idxLetter] + ' is equal to ' + upFinalAnswer[idxLetter] + '?');

    if(upTranscrData[idxLetter] === upFinalAnswer[idxLetter]){
      console.log('Find letter ['+idxLetter+'] = ' + upTranscrData[idxLetter]);
      tempMotusAnswer += upTranscrData[idxLetter];

    }else {
      tempMotusAnswer += motusAnswer[idxLetter];
      wonOrLost = false;

    }
  }

  motusAnswer = tempMotusAnswer;
  console.log('Motus answer = ' + motusAnswer);
  startFlapper(motusAnswer);

  // ---------------------------------------------------
  return compareAnswers(motusAnswer);

}

function compareAnswers(_data){
  // on recherche si le mot est trouvé
  var pos = _data.toUpperCase().search(finalAnswer().toUpperCase());
  console.log('Compare motus=' + _data.toUpperCase() + ' <-> answer=' + finalAnswer().toUpperCase() + ' result=' + pos);

  if(pos >= 0){
    return true;

  }else {
    return false;
  }
}

// ------------------------------------------------------------------------------------------------------
// ------------------------------------------------------------------------------------------------------
//
// GAME SECTION
//
// ------------------------------------------------------------------------------------------------------
// ------------------------------------------------------------------------------------------------------
var timerFreshStart;
function freshStart(){

  myFinalAnswer = finalAnswer();
  motusAnswer = emptyWord();

  // Load fake word -------------------------------------
  startFlapper(emptyWord());

  // --
  hideGallery();
  hideMasterFlapper();
  hideNote();
  // ---
  showMessage();
  // setFirstLine('Bravo !');
  // setSecondLine('Attention à ne pas rater votre train.');

  isGameStarted = false;

  timerFreshStart = setTimeout(function(){
    showMasterFlapper();
    clearTimeout(timerFreshStart);
  }, 3000);

}

function startForReal(){
  // ---
  showGallery();
  startGallery(clues());

  freshStartNote();
  showNote();
  showMasterFlapper();

  // ---
  hideMessage();

  isGameStarted = true;

}

var timerRelaunch;
function endTheGame(){

  isGameStarted = false;
  motusAnswer = '';

  startFlapper(finalAnswer());

  // --
  hideGallery();
  hideNote();
  // ---

  showMessage();
  // setFirstLine('Bravo !');
  // setSecondLine('Attention à ne pas rater votre train.');

  setFirstLine('Vous partez à ' + finalAnswer().toString() + ' ?');
  setSecondLine(enigmaContent().toString());

  setThirdLine('Bon Voyage !');



  timerRelaunch = setTimeout(function(){
    setFirstLine('Re-jouons ensemble...');
    setSecondLine('Trouvons le mot caché grâce aux photos !');
    setThirdLine('');
    newEnigma();
    freshStart();

  }, 10000);


  // clearTimeout(timerRelaunch);
  // clearTimeout(timerFreshStart);
  //
}

function enigmaLoaded(){
  //console.log('Enigma callback called !!!!! answer is : ' + finalAnswer());
  freshStart();
}
