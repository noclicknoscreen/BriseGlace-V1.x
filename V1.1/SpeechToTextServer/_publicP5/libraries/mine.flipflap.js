
const size = 72;
const letterStep = 72;

// FLIP FLAP Class -----------------------------------------------------------------------------------------------
function flipFlap() {
  this.myFont;
  this.letters = [];
};

flipFlap.prototype.preload = function() {
  this.myFont = loadFont('assets/Fonts/PrestigeEliteStd-Bd.otf');
};

flipFlap.prototype.setup = function(_answer) {

  for(i = 0; i < _answer.length; i++){
      this.letters.push(new flipFlapLetter(_answer[i]));
  }

};

flipFlap.prototype.draw = function() {

  translate(width / 2, 0.8 * height);

  textFont(this.myFont);
  textSize(size);
  textAlign(CENTER);

  for(i = 0; i < this.letters.length; i++){
      this.letters[i].draw(i * letterStep);
  }
  resetMatrix();

};

// FLIP FLAP LETTER Class -----------------------------------------------------------------------------------------------

const xLetterSize = 72;
const yLetterSize = 100;
const letterRound = 10;

function flipFlapLetter(_char) {

  this.char = _char;

};

flipFlapLetter.prototype.draw = function(_position) {

  fill(0);
  stroke(255);
  strokeWeight(2);
  rectMode(CENTER);  // Set rectMode to CENTER
  rect(_position, 0, xLetterSize, yLetterSize, letterRound, letterRound, letterRound, letterRound);
  line(_position - 0.45 * xLetterSize, 0, _position + 0.45 * xLetterSize, 0);

  fill(255);
  noStroke();
  text(this.char.toLocaleUpperCase(),_position, 0.23 * yLetterSize);

};
