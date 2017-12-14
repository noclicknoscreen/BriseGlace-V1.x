
const canvasResWidth = 1920;
const canvasResHeight = 1080;

var socket;

var myFlipFlap;
var myAnswers;
var myGallery;
var myEnigmas;

var imgOverlay;

var index;

function preload() {

  // Answers ----------------------------------------------------------
  myAnswers = new answers();
  myAnswers.preload();

  // Gallery ----------------------------------------------------------
  myGallery = new gallery();
  myGallery.preload();
  // Chargement des liens
  myGallery.addLink("https://upload.wikimedia.org/wikipedia/commons/8/81/Brigniais.jpg");
  myGallery.addLink("https://c2.staticflickr.com/4/3941/15449767249_6d784e3c61_b.jpg");
  myGallery.addLink("https://upload.wikimedia.org/wikipedia/commons/8/8e/Brignais_-_Aqueduc_du_Gier_-1.JPG");
  myGallery.addLink("https://upload.wikimedia.org/wikipedia/commons/0/0c/SF_859_-_BRIGNAIS_-_La_Place.JPG");
  myGallery.addLink("https://upload.wikimedia.org/wikipedia/commons/4/43/Blason_ville_fr_Brignais_%28Rh%C3%B4ne%29.svg");
  myGallery.addLink("https://upload.wikimedia.org/wikipedia/commons/9/92/Brignais_vue_du_pont_vieux.jpg");
  myGallery.addLink("https://upload.wikimedia.org/wikipedia/commons/1/1b/Brignais_Garon.jpg");

  // FLIP FLAP ----------------------------------------------------------
  myFlipFlap = new flipFlap();
  myFlipFlap.preload();

  // enigmas
/*  myEnigmas = new enigmas();
  myEnigmas.preload();
*/
  // Overlay
  imgOverlay = loadImage("assets/Images/upper-mask.png");

}

function setup() {

  angleMode(DEGREES);
  createCanvas(displayWidth, displayHeight);
  background('#b89664');

  socket = io.connect('http://192.168.81.141:3000');
  socket.on('words', newTranscription);

  myText = 'P5.js';

  myFlipFlap.setup('toto');

}

function draw() {

  background('#b89664');
  noTint();
  //
  // // Answers ----------------------------------------------------------
  myAnswers.draw();
  // // Gallery ----------------------------------------------------------
  myGallery.draw();
  // // FLIP FLAP ----------------------------------------------------------
  myFlipFlap.draw("L'arbresle");
  //
  // // Overlay
  blendMode(BLEND);
  imageMode(CORNERS);
  tint(255, 100);
  image(imgOverlay, 0, 0, width, height);

}

function keyReleased() {
  console.log('emit !!!');
  socket.emit('listen');

}

/* ---------------------------------------------
Socket events
----------------------------------------------- */
function newTranscription(transcrData){

  var key, value;
  console.log('[Trancription recue] : ' + transcrData);

  myText = transcrData;

  if(transcrData !== ''){

     myAnswers.add(transcrData);

    // var res = transcrData.split(' ');
    // var nb = res.length;
    //
    // for (i = 0; i < nb; i++) {
    //   myAnswers.add(res[i]);
    // }

  }

  socket.emit('listen');

}
