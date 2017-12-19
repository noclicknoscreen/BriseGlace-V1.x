
function showGallery(){
  w3.show("#Gallery");
};
function hideGallery(){
  w3.hide("#Gallery");
};

function startGallery(_allClues){

  var idxCreation = 0;
  document.getElementById("GalleryPic").innerHTML = '';
  // Pop all polas
  for(clue in _allClues){
    popAPola(_allClues[clue].keyWord, _allClues[clue].picture,idxCreation++);
  }

}

function stopGallery(){
  document.getElementById("page_ul").innerHtml('');
}

function popAPola(_text, _link, _idxCreated){

  console.log('Adding clues [text,link,index] : ['+_text+','+_link+','+_idxCreated+']')

  var angleAmplitude = 10.0;

  var newLi = document.createElement("li");
  var newDiv = document.createElement("div");
  var newMasterDiv = document.createElement("div");
  var newPicContent = document.createElement("div");
  var newPic = document.createElement("img");       // Illustration picked on internet
  var newPolaMask = document.createElement("img");  // Polaroid Mask
  var newShadow = document.createElement("img");    // Dropped shadow

  // Text ----------------------------------------------------------
  // Mot clé accompagnant l'image
  newDiv.append(_text);
  newDiv.style.textAlign = 'center';
  newDiv.style.position = 'absolute';
  newDiv.style.top = '450px';
  newDiv.style.left = '0%';
  newDiv.style.right = '100%';
  newDiv.style.width = '486px';
  newDiv.style.height = 'auto';
  newDiv.style.zIndex = '4';

  // Image (Masque Pola)---------------------------------------------------------
  newPolaMask.src = 'assets/Images/Polaroid-A02.svg';
  newPolaMask.style.position = "absolute";
  newPolaMask.style.left = "0px";
  newPolaMask.style.top = "0px";
  newPolaMask.style.zIndex = '3';

  // Image (Image piochée sur le net)---------------------------------------------------------
  const maxSize = 400;
  newPic.src = _link;
  newPic.style.display= 'block';
  // newPic.style.backgroundColor= '#fff';
  newPic.style.margin= 'auto';
  newPic.style.zIndex = '2';
  //
  newPic.onload = function() {
    var height = this.naturalHeight;
    var width = this.naturalWidth;

    if (height > width) {
      newPic.style.maxWidth = maxSize.toString() + "px";
    }
    else{
      newPic.style.maxHeight = maxSize.toString() + "px";
    }
  }

  newPicContent.style.position = "absolute";
  newPicContent.style.overflow = "hidden";
  newPicContent.style.left = "20px";
  newPicContent.style.top = "20px";
  newPicContent.style.width = '400px';
  newPicContent.style.height = '400px';
  newPicContent.style.backgroundColor= '#fff';

  // Image (Masque Pola)---------------------------------------------------------
  newShadow.src = 'assets/Images/Polaroid-A02_O.svg';
  newShadow.style.position = "absolute";
  newShadow.style.left = "5px";
  newShadow.style.top = "7px";
  newShadow.style.opacity = "0.3";
  newShadow.style.zIndex = '1';

  // List ----------------------------------------------------------
  // var minX = 0.05 * document.getElementById("Gallery").clientWidth;
  // var maxX = 0.75 * document.getElementById("Gallery").clientWidth;
  var minX = 100;
  var maxX = 800;

  var minY = 50;
  var maxY = 350;

  var posX = floor(random(minX, maxX));
  var posY = floor(random(minY, maxY));
  var angle = floor(random(-1 * angleAmplitude, angleAmplitude));

  var transform = '';
  transform += 'translate(' + posX + 'px,' + posY + 'px)';
  transform += ' ';
  transform += 'rotate(' + angle +'deg)';
  transform += ' ';
  transform += 'scale(0.7, 0.7)';

  console.log('transform is : ' + transform);

  newLi.style.transform = transform;
  newLi.style["-moz-transform"] = transform;
  newLi.style["-webkit-transform"] = transform;
  newLi.style.position = 'fixed';
  newLi.style.left = '0px';
  newLi.style.top = '0px';


  // Div Master pour l'animation d'entrée/sortie --------------------
  var rndDuration = floor(random(25,40));
  var rndDelay = _idxCreated * floor(random(10,15));
  console.log('animation timings is : ' + rndDuration + ',' + rndDelay);

  // newMasterDiv.style.backgroundColor= '#fff';
  // newMasterDiv.style.width = '400px';
  // newMasterDiv.style.height = '400px';
  newMasterDiv.style.animationName = 'inAndOut';
  newMasterDiv.style.animationDuration = rndDuration.toString() + 's';
  newMasterDiv.style.animationDelay = rndDelay.toString() + 's';
  newMasterDiv.style.animationTimingFunction="ease-in-out" ;
  newMasterDiv.style.animationFillMode="both" ;
  newMasterDiv.style.animationIterationCount='infinite';

  // On met tout ensemble
  newMasterDiv.appendChild(newDiv);
  newMasterDiv.appendChild(newPolaMask);
  newPicContent.appendChild(newPic);
  newMasterDiv.appendChild(newPicContent);
  newMasterDiv.appendChild(newShadow);
  newLi.appendChild(newMasterDiv);

  document.getElementById("GalleryPic").appendChild(newLi);

}
