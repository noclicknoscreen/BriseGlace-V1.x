
var loadCallback;
var theEnigma;

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

    // Enigmas
    var limit = _allEnigmas.enigmas.length;
    var rndIndex = floor(random() * limit);
    var choice = 0;
    console.log('load one enigma index='+rndIndex+' limit was: ' + limit);

    for (x in _allEnigmas.enigmas) {
      if(choice === rndIndex){
        theEnigma = _allEnigmas.enigmas[x];
        console.log('Enigma chosen +++++ ['+x+']: ' + _allEnigmas.enigmas[x].finalAnswer);
        break;
      }else{
        console.log('Enigma rejected --- ['+x+']: ' + _allEnigmas.enigmas[x].finalAnswer);
      }

      choice++;

    }

    // theEnigma = _allEnigmas.enigmas[rndIndex];
    // Call the back at top level
    loadCallback();

};

function finalAnswer() {
  // console.log('Enigma callback called !!!!! answer is : ' + theEnigma.finalAnswer);
  return theEnigma.finalAnswer;
};
function displayAnswer() {
  // console.log('Enigma callback called !!!!! answer is : ' + theEnigma.finalAnswer);
  return theEnigma.displayAnswer;
};

function emptyWord() {
  // console.log('Enigma callback called !!!!! answer is : ' + theEnigma.finalAnswer);
  return theEnigma.emptyWord;
};

function clues() {
  return theEnigma.clues;
};

//
// // Public --------------------------------------------------------------------------------------------------------
// enigmas.prototype.nextEnigma = function() {
//
// };
//
// enigmas.prototype.hintPicture = function(_index) {
// };
//
// enigmas.prototype.hintAnswer = function(_index) {
// };
//
// enigmas.prototype.hintKeyword = function(_index) {
// };
//
// enigmas.prototype.nextHint = function() {
//
//   this.idxHint++;
//
//   if(this.idxHint > this.enigma.hints.length){
//     this.idxHint = 0;
//   }
//
//   console.log("L'indice en cours est : " + this.idxHint);
//
// };
//
//
// enigmas.prototype.emptyWord = function() {
//   return this.enigma.emptyWord;
// };
//
// enigmas.prototype.currentAnswer = function() {
//
//   if(this.idxHint < this.enigma.hints.length){
//     return this.enigma.hints[this.idxHint].answer;
//   }else{
//     return "toto-tutu";
//   }
//
// };


// Private --------------------------------------------------------------------------------------------------------
