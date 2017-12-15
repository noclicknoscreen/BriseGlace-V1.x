
const answersStepY = 26;
const answersSize = 24;
const maxWords = 10;

const answerPosX = -150;
const answerPosY = 720;

function answers() {

  var myFont;
  var answersDisplayed = [];
  var allAnswers = [];
  var imgBackground;

}

answers.prototype.preload = function() {
  this.myFont = loadFont('assets/Fonts/DK Crayon Crumble.ttf');
  this.answersDisplayed = [
    '#0 - Answer',
    '#1 - Answer',
    '#2 - Answer',
    '#3 - Answer',
    '#4 - Answer',
    '#5 - Answer',
    '#6 - Answer',
    '#7 - Answer',
    '#8 - Answer',
    '#9 - Answer'
  ];
  this.allAnswers = [];

  imgBackground = loadImage("assets/Images/Sup-Note-A01.png");

};

answers.prototype.draw = function() {


  // Note background
  noTint();
  rotate(-15);
  imageMode(CORNER);
  image(imgBackground, answerPosX, answerPosY);

  fill('#063984');
  textFont(this.myFont);
  textSize(answersSize);
  textAlign(LEFT);

  // ------------------------------------------------------------------------------------------------------------
  this.answersDisplayed = this.allAnswers.slice(-10);

  var answersLen = this.answersDisplayed.length;

  for (i = 0; i < answersLen; i++) {
    //console.log(this.answersDisplayed[i]);
    text(this.answersDisplayed[i].toLocaleUpperCase(), 70 + answerPosX, 65 + answerPosY + (i * answersStepY));
    //text(this.answersDisplayed[i].toLocaleUpperCase(), 0, 0);
  }

  resetMatrix();

};

answers.prototype.add = function(newAnswer) {
  this.allAnswers.push(newAnswer);
  console.log("Ajouté : " + this.allAnswers[this.allAnswers.length - 1]);

};
