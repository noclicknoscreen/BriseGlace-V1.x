var addr="http://localhost:3000/PuzzleSamples/";
var puzzleIndex = -1;
var cluesIndex = 0;
var coordList = [];
var fileList = [];
var currentPuzzle = null;
var maxImgSize = 300;
var amplitudeAngle = 40.0;
var minDistPol = 50;

function getCurrentResponse()
{
    return (currentPuzzle.wordToFind);
}

function popPolaroid()
{
    var img = currentPuzzle.clues[cluesIndex]
    cluesIndex++;
    var newLi = document.createElement("li");
    var newDiv = document.createElement("div");
    var newImg = document.createElement("img");
    var newMask = document.createElement("img");
    newDiv.href = "";
    newMask.style.position = "absolute";
    newMask.style.top = "0%";
    newMask.style.left = "0%";
    newMask.src = "./assets/Images/polaroid-mask.png";
    newDiv.innerHtml = img.keyWord;
    newDiv.style.overflow = "hidden";
    newDiv.style.height = "" + newMask.naturalHeight + "px";
    newDiv.style.width = "" + newMask.naturalWidth + "px";
    newDiv.style["border-radius"] = "3px";
    newMask.style["border-radius"] = "3px";
    newDiv.appendChild(newMask);
    newDiv.appendChild(newImg);
    newLi.appendChild(newDiv);
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
	var angle = (Math.random() * amplitudeAngle) - (amplitudeAngle / 2);
	newLi.style.transform = "rotate(" + angle.toString() + "deg)";
	newLi.style["-moz-transform"] = "rotate(" + angle.toString() + "deg)";
	newLi.style["-webkit-transform"] = "rotate(" + angle.toString() + "deg)";
	newLi.style.position = "fixed";
	var haveGoodCoord = false;
	var coord = null;
	while (!haveGoodCoord) {
	    coord = {
		top: Math.random() * 15,
		left: Math.random() * 70 + 15
	    };
	    if (coordList.length == 0)
		break;
	    for (var c of coordList) {
		haveGoodCoord = false;
		if (Math.pow(c.top - coord.top, 2) + Math.pow(c.left - coord.left, 2) < minDistPol)
		    break;
		haveGoodCoord = true;
	    }
	}
	newLi.style.left = "" + coord.left + "%";
	newLi.style.top = "" + coord.top + "%";
	coordList.push(coord);
	document.getElementById("polaroids").appendChild(newLi);
    }
    newImg.src = img.picture;
    if (cluesIndex >= currentPuzzle.clues.length - 1)
	return false;
    return true;
}

function preloadImages(puzzle) {
    if (!preloadImages.list) {
        preloadImages.list = [];
    }
    var list = preloadImages.list;
    for (var i = 0; i < puzzle.clues.length; i++) {
        var img_t = new Image();
        img_t.onload = function() {
            var index = list.indexOf(this);
            if (index !== -1) {
                list.splice(index, 1);
            }
        }
        list.push(img_t);
        img_t.src = puzzle.clues[i].picture;
    }
}

function launchNewPuzzle() {
    if (!fileList.length)
	return ;
    coordList = [];
    document.getElementById("polaroids").innerHTML = "";
    cluesIndex = 0;
    puzzleIndex++;

    if (puzzleIndex >= fileList.length)
	puzzleIndex = 0;

    $.ajax({
	type: "GET",
	url: addr + fileList[puzzleIndex],
	dataType: "json",
	success: function(response) {
	    preloadImages(response);
	    currentPuzzle = response;
	    popPolaroid();
	}});
}

$.ajax({
    type: "GET",
    url: addr + "index.json",
    dataType: "json",
    success: function(response) {
	fileList = response.data;
	launchNewPuzzle();
    }});
