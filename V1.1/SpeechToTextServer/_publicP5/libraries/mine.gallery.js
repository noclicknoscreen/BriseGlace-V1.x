
// const canvasResWidth = 1920;
// const canvasResHeight = 1080;
//
var nbLinks;
var imgPola;
var imgDropShadow;


// GALLERY Class ----------------------------------------------------------------------------------------------------
function gallery() {

  var links = [];
  nbLinks = 8;

}

gallery.prototype.preload = function() {
  this.links = [];
  imgPola = loadImage("assets/Images/polaroid-mask.png");
  imgDropShadow = loadImage("assets/Images/DropShadow.png");
};

gallery.prototype.draw = function() {


  nbLinks = this.links.length;

  for (i = 0; i < nbLinks; i++) {
    //translate(0.45 * width, 0.2 * height);
    this.links[i].draw();
    //console.log('Link n° : ' + i + '\n' + this.links[i].toString());
  }

};

gallery.prototype.addLink = function(_newLink) {

  var newLink = new link(_newLink);

  this.links.push(new link(_newLink));

  console.log("Ajouté : " + newLink.toString());

};

// LINK Class ----------------------------------------------------------------------------------------------------
const imgLinkX = 0;
const imgLinkY = -22;
const imgLinkXSize = 238;
const imgLinkYSize = 230;

const xMin = 300;
const xMax = 1920 - 300;
const yMin= 100;
const yMax= 500;
const angleAmplitude = 10;

function link(_link){
  this.posX = floor(random(0.2 * canvasResWidth, 0.8 * canvasResWidth));
  this.posY = floor(random(0.15 * canvasResHeight, 0.5 * canvasResHeight));
  this.link = _link;
  this.imgLink = loadImage(_link);
  this.angle = random(-1 * angleAmplitude, angleAmplitude);
};

link.prototype.draw = function() {

  rotate(this.angle);

  // // Draw the shadow
  imageMode(CENTER);
  tint(255, 100);
  image(imgDropShadow, this.posX + 5, this.posY + 5, 0.95 * imgDropShadow.width, 0.95 * imgDropShadow.height);
  // Then the web image
  imageMode(CENTER);
  noTint();
  // Display into the polaroid, depending on polaroid hole
  // Crop it randomly into the source image
  image(this.imgLink, this.posX + imgLinkX, this.posY + imgLinkY, imgLinkXSize, imgLinkYSize);//, 0, 0, imgLinkXSize, imgLinkYSize);
  // the the polaroid
  imageMode(CENTER);
  noTint();
  image(imgPola, this.posX, this.posY);

  resetMatrix();

};

link.prototype.toString = function() {
  return 'X:' + this.posX + ' Y:' + this.posY + ' angle:' + this.angle + '\nlink:' + this.link;
};
