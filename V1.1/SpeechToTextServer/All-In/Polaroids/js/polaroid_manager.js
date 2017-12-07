var addr="http://localhost:3000/PuzzleSamples/"
var puzzleIndex = -1
var cluesIndex = 0
var fileList = []
var currentPuzzle = null
var maxImgSize = 400;

function getCurrentResponse()
{
    return (currentPuzzle.wordToFind);
}

function popPolaroid()
{
    var img = currentPuzzle.clues[cluesIndex]
    cluesIndex++;
    var newLi = document.createElement("li");
    var newA = document.createElement("a");
    var newImg = document.createElement("img");
    newA.href = "";
    newA.title = img.keyWord;
    newA.appendChild(newImg);
    newLi.appendChild(newA);
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
