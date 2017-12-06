
var myFont;
var myText;

var socket;

function preload() {
  myFont = loadFont('assets/Abel-Regular.ttf');
}

function setup() {

  createCanvas(600, 400);
  background(100);

  socket = io.connect('http://localhost:3000');
  socket.on('words', newTranscription);

  myText = 'P5.js';

}

function draw() {

  background(100, 100, 100);

  fill('#ED225D');
  textFont(myFont);
  textSize(24);
  textAlign(CENTER);
  text(myText, width / 2, 0);
  
}

function mouseClicked(){
  whatsNewRequest();
}

/* ---------------------------------------------
Socket events
----------------------------------------------- */
function whatsNewRequest(){
  var mouseData = {
    x : mouseX,
    y : mouseY
  }

  console.log("Requesting What's new : \n" + mouseData.x + "," + mouseData.y);
  socket.emit('whatsNew', mouseData);

}

function newTranscription(transcrData){

  var key, value;

  //console.log("Acquiring new transcription : \n" + transcrData);

  //if (typeof transcrData._text !== 'undefined') {
    // Désormais, on sait que toto est bien
    // défini et on peut poursuivre.
    JSON.parse(transcrData, (key, value) =>{
      if (key === '_text') {
          console.log('[Real text] : ' + value)
          myText = value.replace(/ /g, '\n');;  // renvoie value * 2 pour les nombres
      }
      if (key === 'error') {
          console.error('[Error] : ' + value)
      }
    });

  //}else{
    //console.log('Text undefined !!!!!!!!!!!!!!!!!!!');
  //}
}
