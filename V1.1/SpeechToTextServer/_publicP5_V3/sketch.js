
var socket;
var wordTyped;
var myFinalAnswer;

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
function freshStart(){

  myFinalAnswer = finalAnswer();
  motusAnswer = emptyWord();

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
  motusAnswer = '';

  startFlapper(finalAnswer());

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
    setSecondLine('Trouvons le mot caché grâce aux photos !');
    setThirdLine('');
    newEnigma();
    freshStart();
    clearTimeout(timerRelaunch);
  }, 10000);

}

function enigmaLoaded(){
  //console.log('Enigma callback called !!!!! answer is : ' + finalAnswer());
  freshStart();
}
