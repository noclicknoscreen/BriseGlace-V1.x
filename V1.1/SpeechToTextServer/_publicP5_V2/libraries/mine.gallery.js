
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
};

gallery.prototype.draw = function() {
};

gallery.prototype.addLink = function(_newWord, _newLink) {

  var newLink = new link(_newLink);
  this.links.push(new link(_newWord, _newLink));
  newLink.onePola(_newWord, _newLink);
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

function link(_word, _link){
  this.posX = floor(random(0.2 * canvasResWidth, 0.8 * canvasResWidth));
  this.posY = floor(random(0.15 * canvasResHeight, 0.5 * canvasResHeight));
  this.link = _link;
  this.keyword = _word;
  this.angle = random(-1 * angleAmplitude, angleAmplitude);

};

link.prototype.onePola = function(_keyWord, _path){

  var maxImgSize = 300;
  var amplitudeAngle = 40.0;

  var newImg = document.createElement("img");
  var newDiv = document.createElement("div");
  var newLi = document.createElement("li");

  newDiv.href = "";
  newDiv.innerHtml = _keyWord;
  newDiv.style.overflow = "hidden";
  // newDiv.style.height = "" + newMask.naturalHeight + "px";
  // newDiv.style.width = "" + newMask.naturalWidth + "px";
  newDiv.style["border-radius"] = "3px";

  newImg.src = _path;
  newImg.onload = function() {
    var height = this.naturalHeight;
    var width = this.naturalWidth;

    if (height > width && height > maxImgSize) {
      this.style.width = "auto";
      this.style.height = maxImgSize.toString() + "px";
    }
    else if (width > maxImgSize) {
      this.style.height = "auto";
      this.style.width = maxImgSize.toString() + "px";
    }
  }

  var angle = (Math.random() * amplitudeAngle) - (amplitudeAngle / 2);

  // newImg.style.position = "absolute";
  // newImg.style.left = this.posX.toString() + "pix";
  // newImg.style.top = this.posY.toString() + "pix";

  var transform = '';
  transform += "rotate(" + angle.toString() + "deg)";
  transform += " ";
  transform += "translate("+this.posX.toString()+"px,"+this.posY.toString()+"px)";

  console.log("Transform : " + transform);

  newLi.style.transform = transform;
  newLi.style["-moz-transform"] = transform;
  newLi.style["-webkit-transform"] = transform;
  newLi.style.position = "absolute";

  newDiv.appendChild(newImg);
  newLi.appendChild(newDiv);

  document.getElementById("GalleryPola").appendChild(newImg);

};

link.prototype.toString = function() {
  return 'X:' + this.posX + ' Y:' + this.posY + ' angle:' + this.angle + '\nlink:' + this.link;
};
