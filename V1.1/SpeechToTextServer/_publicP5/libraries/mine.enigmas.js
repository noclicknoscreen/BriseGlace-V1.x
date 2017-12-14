
//var index;
const fs = require('fs');

// FLIP FLAP Class -----------------------------------------------------------------------------------------------
function enigmas() {
  var index;
  var enigma;
  var idxCurrentEnigma = 0;
};

// Public --------------------------------------------------------------------------------------------------------
enigmas.prototype.preload = function() {
  // Load the whole list of enigmas
  this.loadEnigmas();
  this.nextEnigma(this.idxCurrentEnigma);
};

enigmas.prototype.loadEnigmas = function (){

  const testFolder = './tests/*.json';

  fs.readdir(testFolder, (err, files) => {
    files.forEach(file => {
      console.log(file);
    });
  });

  // this.index = loadJSON('assets/Enigmas/index.json');
  // console.log('index.json OK');
  //
  // if(this.index.data.length > 0){
  //   this.idxCurrentEnigma = floor(random(this.index.data.length));
  //   console.log('loading enigma n° : ' + this.idxCurrentEnigma);
  //
  // }else{
  //   console.error('index.json is empty');
  // };

};

enigmas.prototype.errorJson = function (error){
  console.error(error);
}

enigmas.prototype.wordToFind = function() {
};

enigmas.prototype.nextEnigma = function(_newIndex) {

  var path = 'assets/Enigmas/' + this.index.data[_newIndex];
  console.log('Enigma path : ' + path)

  this.enigma = loadJSON(path);

  if(this.enigma === undefined){
    console.log('Error loading ' + path)

  }else{
    console.log('Enigma loaded');
    console.log('wordToFind : ' + this.enigma.wordToFind);
    console.log('type : ' + this.enigma.type);
  }

};

enigmas.prototype.hintPicture = function(_index) {
};

enigmas.prototype.hintPicture = function(_index) {
};

enigmas.prototype.hintKeyword = function(_index) {
};

// Private --------------------------------------------------------------------------------------------------------
