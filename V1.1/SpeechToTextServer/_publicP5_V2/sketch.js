
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

  // Gallery ----------------------------------------------------------
  // myGallery = new gallery();
  // myGallery.preload();

}

function setup() {
  // Chargement des liens
  // myGallery.addLink("bataille", "https://upload.wikimedia.org/wikipedia/commons/8/81/Brigniais.jpg");
  // myGallery.addLink("bataille", "https://c2.staticflickr.com/4/3941/15449767249_6d784e3c61_b.jpg");
  // myGallery.addLink("bataille", "https://upload.wikimedia.org/wikipedia/commons/8/8e/Brignais_-_Aqueduc_du_Gier_-1.JPG");
  // myGallery.addLink("bataille", "https://upload.wikimedia.org/wikipedia/commons/0/0c/SF_859_-_BRIGNAIS_-_La_Place.JPG");
  // myGallery.addLink("bataille", "https://upload.wikimedia.org/wikipedia/commons/4/43/Blason_ville_fr_Brignais_%28Rh%C3%B4ne%29.svg");
  // myGallery.addLink("bataille", "https://upload.wikimedia.org/wikipedia/commons/9/92/Brignais_vue_du_pont_vieux.jpg");
  // myGallery.addLink("bataille", "https://upload.wikimedia.org/wikipedia/commons/1/1b/Brignais_Garon.jpg");

}

function draw() {

}

/* ---------------------------------------------
Socket events
----------------------------------------------- */
function newTranscription(transcrData){

  // var key, value;
  // console.log('[Trancription recue] : ' + transcrData);
  //
  // myText = transcrData;
  //
  // if(transcrData !== ''){
  //
  //    myAnswers.add(transcrData);
  //
  //    myEnigmas.nextHint();
  //
  //   // var res = transcrData.split(' ');
  //   // var nb = res.length;
  //   //
  //   // for (i = 0; i < nb; i++) {
  //   //   myAnswers.add(res[i]);
  //   // }
  //
  // }
  //
  // socket.emit('listen');

}
