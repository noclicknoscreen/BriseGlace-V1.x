
var loadCallback;
var theEnigma;
var allEnigmas;

var motusAnswer;

// FLIP FLAP Class -----------------------------------------------------------------------------------------------
function loadEnigmas(_path, _loadCallback) {
  console.log("Trying to load : " + _path);
  loadJSON(_path, enigmasLoaded);

  loadCallback = _loadCallback;

};

//
// function errorOnLoad(error) {
//   console.error("Error loading enigmas file");
//   console.error(error);
// };

function enigmasLoaded(_allEnigmas) {
    console.log("Good loading enigmas file");

    allEnigmas = _allEnigmas;

    newEnigma();

    // Call the back at top level
    loadCallback();

};

function newEnigma(){
  // Enigmas
  var limit = allEnigmas.enigmas.length;
  var rndIndex = floor(random() * limit);
  var choice = 0;
  console.log('load one enigma index='+rndIndex+' limit was: ' + limit);

  for (x in allEnigmas.enigmas) {
    if(choice === rndIndex){
      theEnigma = allEnigmas.enigmas[x];
      console.log('Enigma chosen +++++ ['+x+']: ' + allEnigmas.enigmas[x].finalAnswer);
      break;
    }else{
      console.log('Enigma rejected --- ['+x+']: ' + allEnigmas.enigmas[x].finalAnswer);
    }

    choice++;

  }
}

function finalAnswer() {
    return theEnigma.finalAnswer;
};

function emptyWord() {
  // console.log('Enigma callback called !!!!! answer is : ' + theEnigma.finalAnswer);
  return theEnigma.emptyWord;
};

function clues() {
  return theEnigma.clues;
};

// -----------------------------------------------------------------------
// Return an array of the 3 final sentences to display
// -----------------------------------------------------------------------
function enigmaFinalContent() {
  return theEnigma.finalContent;
};
// -----------------------------------------------------------------------
// Return the name of the word we looked for
// e.g. une commune, un film, etc.
// -----------------------------------------------------------------------
function enigmaWordType() {
  return theEnigma.wordType;
};
// -----------------------------------------------------------------------
// Return the type of the game
// - hangman
// - motus
// -----------------------------------------------------------------------
function enigmaGameType() {
  return theEnigma.gameType;
};
