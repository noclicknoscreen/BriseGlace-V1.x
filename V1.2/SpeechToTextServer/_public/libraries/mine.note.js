
const maxWords = 10;

var myFont;
var answersDisplayed = [];
var allAnswers = [];

function showNote(){
    w3.show("#Note");
};
function hideNote(){
    w3.hide("#Note");
};

function freshStartNote(){

  allAnswers.splice(0,allAnswers.length);

  for (i = 0; i < 10; i++) {
    // Get the  list element
    var changedLi = document.getElementById('Answer' + i);
    // Change the content
    changedLi.innerHTML = '';
    changedLi.removeAttribute('class');
  }
};


function addOneAnswer(_newAnswerText) {

  if(allAnswers.includes(_newAnswerText)){
      // allready said !!!!
  }else{
    // never said -> add it !
    allAnswers.push(_newAnswerText);

    // ------------------------------------------------------------------------------------------------------------
    answersDisplayed = allAnswers.slice(-10);

    var answersLen = answersDisplayed.length;

    for (i = 0; i < answersLen; i++) {
      var liId = 'Answer' + i;
      // Get the  list element
      var changedLi = document.getElementById('Answer' + i);
      // Change the content
      changedLi.innerHTML = answersDisplayed[i];
      // Change the color
      if(i === (answersLen - 1)){
        changedLi.setAttribute('class','last');
      }else{
        changedLi.removeAttribute('class');
      }
      console.log('Changing li ['+liId +'] into ['+ answersDisplayed[i] + ']');

    }
  }

};
