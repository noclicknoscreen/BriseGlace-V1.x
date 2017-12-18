
const maxWords = 10;

var myFont;
var answersDisplayed = [];
var allAnswers = [];

function startAnswers() {

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
