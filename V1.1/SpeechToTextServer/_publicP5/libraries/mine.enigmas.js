
//var index;
var idxHint;

// FLIP FLAP Class -----------------------------------------------------------------------------------------------
function enigmas() {
  var index;
  var enigma;
  var idxCurrentEnigma = 0;
  this.idxHint = 0;
};

// Public --------------------------------------------------------------------------------------------------------
enigmas.prototype.preload = function() {
  // Load the whole list of enigmas
  this.nextEnigma('larbresle.json');
};

enigmas.prototype.errorJson = function (error){
  console.error(error);
}

enigmas.prototype.wordToFind = function() {
};

enigmas.prototype.nextEnigma = function(_path) {
  this.enigma = loadJSON('assets/Enigmas/' + _path);
};

enigmas.prototype.hintPicture = function(_index) {
};

enigmas.prototype.hintAnswer = function(_index) {
};

enigmas.prototype.hintKeyword = function(_index) {
};

enigmas.prototype.nextHint = function() {

  this.idxHint++;

  if(this.idxHint > this.enigma.hints.length){
    this.idxHint = 0;
  }

  console.log("L'indice en cours est : " + this.idxHint);

};

enigmas.prototype.emptyWord = function() {
  return this.enigma.emptyWord;
};

enigmas.prototype.currentAnswer = function() {

  if(this.idxHint < this.enigma.hints.length){
    return this.enigma.hints[this.idxHint].answer;
  }else{
    return "toto-tutu";
  }

};


// Private --------------------------------------------------------------------------------------------------------
