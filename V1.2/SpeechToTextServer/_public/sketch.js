
var socket;
var wordTyped;
var myFinalAnswer;

var isGameStarted;
var firstStart;

var drawFeedBack;

var audioIn;

function setup() {

  // Audio setup (for visual feedback)
  // audioIn = new p5.AudioIn()
  // audioIn.start();

  loadEnigmas('assets/Enigmas/fullBunchEnigmas.json', enigmaLoaded);

  angleMode(DEGREES);
  createCanvas(displayWidth, displayHeight);

  // Load sockets waiting some words----------------------------------
  socket = io.connect('http://localhost:3000');
  socket.on('words', newTranscription);
  socket.on('empty', emptyTranscription);
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
  //
  // micLevel = audioIn.getLevel();
  // ellipse(width/2, height/2, micLevel*100, micLevel*100);
  //
  // console.log("Mic level : " + micLevel);

};

  /* ---------------------------------------------
  Socket events
  ----------------------------------------------- */
  var messageBottomEmpty = [
    "Parlez un peu plus fort, s'il vous plait !",
    "Comment ?",
    "Je n'ai pas entendu...",
    "Rapprochez-vous de mon oreille.",
    "Que dites-vous ?",
    "Je n'ai pas bien compris."
  ];
  var idxMessageBottomEmpty = 0;

  function emptyTranscription(){

    console.log('[Trancription vide]');

    var messageBottom = document.getElementById('messageBottomLine');
    messageBottom.innerHTML = messageBottomEmpty[idxMessageBottomEmpty];

    idxMessageBottomEmpty++;
    if(idxMessageBottomEmpty >= messageBottomEmpty.length){
      idxMessageBottomEmpty = 0;
    }

  }

  /* ---------------------------------------------
  Socket events
  ----------------------------------------------- */
  var messageBottomYes = [
    "Bien joué.",
    "Essayons ce mot.",
    "Je n'aurais pas dit ça...",
    "Essayons pour voir.",
    "Bien tenté.",
    "Curieuse proposition !",
    "Vous chauffez.",
    "Vous y êtes presque.",
    "Encore un effort."
  ];
  var idxMessageBottomYes = 0;

  function newTranscription(transcrData){

    console.log('[Trancription recue] : ' + transcrData);

    if(transcrData !== ''){

      var messageBottom = document.getElementById('messageBottomLine');
      messageBottom.innerHTML = messageBottomYes[idxMessageBottomYes];

      idxMessageBottomYes++;
      if(idxMessageBottomYes >= messageBottomYes.length){
        idxMessageBottomYes = 0;
      }

      if(isGameStarted === true){

        popTheNextPola();

        var result = false;

        if(enigmaGameType() === 'motus'){
          result = motusTranscript(transcrData);
          // result = hangmanTranscript(transcrData);
        }else if (enigmaGameType() === 'hangman') {
          result = hangmanTranscript(transcrData);
        }

        if(result===true){
          endTheGame();
        }else {
          addOneAnswer(transcrData);
        }

      }else{
        startForReal();
        addOneAnswer(transcrData);
        popTheNextPola();
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

    var upTranscrData = suppressAccents(_transcription).toUpperCase();
    upTranscrData = upTranscrData.trim();
    upTranscrData = upTranscrData.replace('"','');

    var upFinalAnswer = suppressAccents(myFinalAnswer).toUpperCase();
    var wordTab = upFinalAnswer.split(" ");
    var motusAnswerIdx = 0;
    var tmpAnswer = "";

    for (var i = 0 ; i < wordTab.length ; ++i) {
      if (upTranscrData.search(wordTab[i]) >= 0)
      for (var j = 0 ; j < wordTab[i].length ; ++j) {
        tmpAnswer += wordTab[i][j];
      }
      else
      for (var j = 0 ; j < wordTab[i].length ; ++j) {
        tmpAnswer += motusAnswer[motusAnswerIdx + j];
      }
      motusAnswerIdx += wordTab[i].length + 1;
      if (motusAnswerIdx < motusAnswer.length)
      tmpAnswer += ' ';
    }

    motusAnswerIdx = 0;
    var dataWordTab = upTranscrData.split(" ");
    motusAnswer = tmpAnswer;
    tmpAnswer = "";

    for (var i = 0 ; i < wordTab.length ; ++i) {
      var j = 0;
      while (j < wordTab[i].length) {
        if (i < dataWordTab.length && j < dataWordTab[i].length && dataWordTab[i][j] == wordTab[i][j])
        tmpAnswer += wordTab[i][j];
        else
        tmpAnswer += motusAnswer[motusAnswerIdx + j];
        ++j;
      }
      motusAnswerIdx += wordTab[i].length + 1;
      if (motusAnswerIdx < motusAnswer.length)
      tmpAnswer += ' ';
    }

    motusAnswer = tmpAnswer;
    console.log('Motus answer = ' + motusAnswer);
    startFlapper(motusAnswer);

    // ---------------------------------------------------
    return compareAnswers(motusAnswer, upFinalAnswer);

  }

  function suppressAccents(term){

    term=term.replace("á","a");
    term=term.replace("Á","A");
    term=term.replace("é","e");
    term=term.replace("É","E");
    term=term.replace("í","i");
    term=term.replace("Í","I");
    term=term.replace("ó","o");
    term=term.replace("Ó","O");
    term=term.replace("ú","u");
    term=term.replace("Ú","U");
    term=term.replace("ñ","n");
    term=term.replace("Ñ","N");
    return term;

  }

  function compareAnswers(_data, _finalAnswer){

    // on recherche si le mot est trouvé
    var pos = _data.toUpperCase().search(_finalAnswer.toUpperCase());
    console.log('Compare motus=' + _data.toUpperCase() + ' <-> answer=' + _finalAnswer.toUpperCase() + ' result=' + pos);

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

    // Pick a new enigma ------------------------------------------------------------
    newEnigma();
    if(firstStart === true){
      setFirstLine('Vous êtes joueur ?...\nMoi oui.');
      setSecondLine('Parlez-moi dans l\'oreille pour gagner des lettres !');
      setThirdLine('');
      firstStart = false;
    }else{
      setFirstLine('Re-jouons ensemble...');
      setSecondLine('Trouvons ' + enigmaWordType().toString() + ' grâce aux photos !');
      setThirdLine('');
    }

    myFinalAnswer = finalAnswer();
    motusAnswer = emptyWord();

    // Load fake word -------------------------------------
    startFlapper(emptyWord());

    // --
    hideGallery();
    hideMasterFlapper();
    //hideNote();
    // ---
    showAllMessages();
    hideMessageBottom();

    isGameStarted = false;

    timerFreshStart = setTimeout(function(){
      showMasterFlapper();
      showMessageBottom();
      clearTimeout(timerFreshStart);
    }, 3000);

  }

  function startForReal(){
    // ---
    showGallery();
    startGallery(clues());

    showMessageBottom();

    freshStartNote();
    //showNote();
    showMasterFlapper();

    // ---
    hideAllMessages();

    isGameStarted = true;

  }

  var timerRelaunch;
  function endTheGame(){

    isGameStarted = false;
    motusAnswer = '';

    startFlapper(finalAnswer());

    // --
    //hideNote();
      // ---
    showAllMessages();
    hideMessageBottom();
    setFirstLine(enigmaFinalContent()[0].toString());
    setSecondLine(enigmaFinalContent()[1].toString());
    setThirdLine(enigmaFinalContent()[2].toString());

    timerRelaunch = setTimeout(function(){
      freshStart();
    }, 10000);

      // clearTimeout(timerRelaunch);
      // clearTimeout(timerFreshStart);
      //
  }

  function enigmaLoaded(){
    //console.log('Enigma callback called !!!!! answer is : ' + finalAnswer());
    firstStart = true;
    freshStart();
  }
