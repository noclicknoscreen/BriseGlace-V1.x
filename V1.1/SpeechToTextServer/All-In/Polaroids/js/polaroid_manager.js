var addr="http://localhost:3000/PuzzleSamples/"
var puzzleIndex = -1
var fileList = []
var currentPuzzle = null
var maxImgSize = 400;

function launchNewPuzzle() {
    puzzleIndex++;

    if (puzzleIndex >= fileList.length)
	puzzleIndex = 0;

    $.ajax({
	type: "GET",
	url: addr + fileList[puzzleIndex],
	dataType: "json",
	success: function(response) {
	    currentPuzzle = response;
	    for (var img of currentPuzzle.clues) {
		var newLi = document.createElement("li");
		var newA = document.createElement("a");
		var newImg = document.createElement("img");
		newImg.src = img.picture;
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
		newA.href = "";
		newA.title = img.keyWord;
		newA.appendChild(newImg);
		newLi.appendChild(newA);
		document.getElementById("polaroids").appendChild(newLi);
	    }
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
