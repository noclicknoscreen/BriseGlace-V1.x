
function startGallery(){

  var idxCreation = 0;

  // Pop all polas
  popAPola('La guerre de 100 ans','assets/Images/Brigniais/Brigniais.jpg',idxCreation++);
  popAPola('Sa gare en 1993','assets/Images/Brigniais/15449767249_6d784e3c61_b.jpg',idxCreation++);
  popAPola('Aqueduc','assets/Images/Brigniais/Brignais_-_Aqueduc_du_Gier_-1.JPG',idxCreation++);
  popAPola('Omnibus','assets/Images/Brigniais/SF_859_-_BRIGNAIS_-_La_Place.JPG',idxCreation++);
  popAPola('Blason','assets/Images/Brigniais/Blason_ville_fr_Brignais_%28Rh%C3%B4ne%29.svg',idxCreation++);
  popAPola('Vu de la ville','assets/Images/Brigniais/Brignais_vue_du_pont_vieux.jpg',idxCreation++);
  popAPola('Le pont','assets/Images/Brigniais/Brignais_Garon.jpg',idxCreation++);

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

  // Text ----------------------------------------------------------
  // Mot clé accompagnant l'image
  newDiv.append(_text);
  newDiv.style.textAlign = 'center';
  newDiv.style.position = 'absolute';
  newDiv.style.top = '80%';
  newDiv.style.left = '0%';
  newDiv.style.right = '100%';
  newDiv.style.width = '486px';
  newDiv.style.height = 'auto';

  // Image (Masque Pola)---------------------------------------------------------
  newMsk.src = 'assets/Images/Polaroid-A01.svg';
  newMsk.style.zIndex = '1';

  // Image (Image piochée sur le net)---------------------------------------------------------
  newImg.src = _link;
  newImg.style.position = "absolute";
  newImg.style.left = "4%";
  newImg.style.top = "4%";
  newImg.style.width = '400px';
  newImg.style.height = '400px';
  newImg.style.zIndex = '-1';

  // List ----------------------------------------------------------
  var maxX = document.getElementById("Gallery").clientWidth;
  var maxY = document.getElementById("Gallery").clientHeight;

  var posX = floor(random(0, maxX));
  var posY = floor(random(0, maxY));
  var angle = floor(random(-1 * angleAmplitude, angleAmplitude));

  var transform = '';
  transform += 'rotate(' + angle +'deg)';
  transform += ' ';
  transform += 'translate(' + posX + 'px,' + posY + 'px)';
  transform += ' ';
  transform += 'scale(0.6, 0.6)';

  console.log('transform is : ' + transform);

  newLi.style.transform = transform;
  newLi.style["-moz-transform"] = transform;
  newLi.style["-webkit-transform"] = transform;
  newLi.style.position = "absolute";

  // Div Master pour l'animation d'entrée/sortie --------------------
  newMasterDiv.style.animationName = 'inAndOut';
  newMasterDiv.style.animationDuration = '60s';
  newMasterDiv.style.animationDelay = (_idxCreated*20).toString() + 's';
  newMasterDiv.style.animationTimingFunction="ease-in-out" ;
  newMasterDiv.style.animationFillMode="both" ;

  // On met tout ensemble
  newMasterDiv.appendChild(newImg);
  newMasterDiv.appendChild(newMsk);
  newMasterDiv.appendChild(newDiv);
  newLi.appendChild(newMasterDiv);

  document.getElementById("galleryPic").appendChild(newLi);

}
