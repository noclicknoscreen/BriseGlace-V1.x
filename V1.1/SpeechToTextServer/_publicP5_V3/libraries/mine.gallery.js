
function startGallery(){

  var idxCreation = 0;

  // Pop all polas
  popAPola('Machine à coudre','http://www.arts-et-metiers.net/sites/arts-et-metiers.net/files/styles/objet_collection/public/cnam_0000327_001.jpg',idxCreation++);
  popAPola('Pont','https://upload.wikimedia.org/wikipedia/commons/1/15/L%27Arbresle_-_La_Br%C3%A9venne.jpg',idxCreation++);
  popAPola('Château',"http://medieval.mrugala.net/Architecture/France,_Rhone,_L%27Arbresle/L'Arbresle%20-%20Chateau%20-%20Donjon%20(02).jpg",idxCreation++);
  // popAPola('La Brévenne','https://upload.wikimedia.org/wikipedia/commons/2/25/Sain-Bel-02.JPG',idxCreation++);
  popAPola('Blason','https://upload.wikimedia.org/wikipedia/commons/2/2b/Blason_ville_fr_L%27Arbresle_%28Rh%C3%B4ne%29.svg',idxCreation++);
  popAPola('Vue de la ville','https://upload.wikimedia.org/wikipedia/commons/4/4d/Arbr_2.JPG',idxCreation++);

}

function stopGallery(){
  document.getElementById("page_ul").innerHtml('');
}

function popAPola(_text, _link, _idxCreated){

  var maxImgSize = 300;
  var angleAmplitude = 10.0;

  var newLi = document.createElement("li");
  var newDiv = document.createElement("div");
  var newMasterDiv = document.createElement("div");
  var newImg = document.createElement("img");
  var newMsk = document.createElement("img");
  var newShadow = document.createElement("img");

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
  newMsk.src = 'assets/Images/Polaroid-A02.svg';
  newMsk.style.position = "absolute";
  newMsk.style.left = "0px";
  newMsk.style.top = "0px";
  newMsk.style.zIndex = '3';

  // Image (Image piochée sur le net)---------------------------------------------------------
  newImg.src = _link;
  newImg.style.position = "absolute";
  newImg.style.left = "20px";
  newImg.style.top = "20px";
  newImg.style.width = '400px';
  newImg.style.height = '400px';
  newImg.style.zIndex = '2';

  // Image (Masque Pola)---------------------------------------------------------
  newShadow.src = 'assets/Images/Polaroid-A02_O.svg';
  newShadow.style.position = "absolute";
  newShadow.style.left = "5px";
  newShadow.style.top = "7px";
  newShadow.style.opacity = "0.3";
  newShadow.style.zIndex = '1';

  // List ----------------------------------------------------------
  var minX = 0.05 * document.getElementById("Gallery").clientWidth;
  var maxX = 0.75 * document.getElementById("Gallery").clientWidth;

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
  newMasterDiv.style.position = 'absolute';
  newMasterDiv.style.top = '50%';
  newMasterDiv.style.animationName = 'inAndOut';
  newMasterDiv.style.animationDuration = '60s';
  newMasterDiv.style.animationDelay = (_idxCreated*20).toString() + 's';
  newMasterDiv.style.animationTimingFunction="ease-in-out" ;
  newMasterDiv.style.animationFillMode="both" ;

  // On met tout ensemble
  newMasterDiv.appendChild(newDiv);
  newMasterDiv.appendChild(newMsk);
  newMasterDiv.appendChild(newImg);
  newMasterDiv.appendChild(newShadow);
  newLi.appendChild(newMasterDiv);

  document.getElementById("galleryPic").appendChild(newLi);

}
