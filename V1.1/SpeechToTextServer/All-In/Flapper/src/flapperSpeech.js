//var io = require('socket.io');
var socket;

var aListeMots = [];

var FlapBuffer = function(wrap, num_lines) {
  this.wrap = wrap;
  this.num_lines = num_lines;
  this.line_buffer = '';
  this.buffers = [[]];
  this.cursor = 0;
};

FlapBuffer.prototype = {

  pushLine: function(line) {

    if (this.buffers[this.cursor].length < this.num_lines) {
      this.buffers[this.cursor].push(line);
    } else {
      this.buffers.push([]);
      this.cursor++;
      this.pushLine(line);
    }
  },

  pushWord: function(word) {
    if (this.line_buffer.length == 0) {
      this.line_buffer = word;
    } else if ((word.length + this.line_buffer.length + 1) <= this.wrap) {
      this.line_buffer += ' ' + word;
    } else {
      this.pushLine(this.line_buffer);
      this.line_buffer = word;
    }
  },

  flush: function() {
    if (this.line_buffer.length) {
      this.pushLine(this.line_buffer);
      this.line_buffer = '';
    }
  },

};



var FlapperSpeech = function(display_selector, input_selector, click_selector) {
  var _this = this;

  var onAnimStart = function(e) {
    var $display = $(e.target);
    $display.prevUntil('.flapper', '.activity').addClass('active');
  };

  var onAnimEnd = function(e) {
    var $display = $(e.target);
    $display.prevUntil('.flapper', '.activity').removeClass('active');
  };


  // Socket Part
  socket = io.connect('http://localhost:3000');
  socket.on('words', newTranscription);

  this.opts = {
    chars_preset: 'alphanum',
    align: 'left',
    width: 20,
    on_anim_start: onAnimStart,
    on_anim_end: onAnimEnd,
    transform: true
  };

  this.timers = [];

  this.$displays = $(display_selector);
  this.num_lines = this.$displays.length;

  this.line_delay = 300;
  this.screen_delay = 7000;

  this.$displays.flapper(this.opts);

  this.$typesomething = $(input_selector);

  function newTranscription(transcrData){

    // Désormais, on sait que toto est bien
    // défini et on peut poursuivre.
    var myJson = JSON.parse(transcrData);
    //console.log("Rough Datas : " + transcrData);

    for(element in myJson){
      //console.log("element : " + element);

      if (element == 'error') {
        //console.log('[Error] : ' + myJson.code);
      }
      if (element == 'outcomes') {
        //console.log('[Real text] : ' + myJson.outcomes[0]._text);

        var text = _this.cleanInput(myJson.outcomes[0]._text);
        //var buffers = _this.parseInput(text);

        console.log('[Text cleaned] : ' + text)

        var words = text.split(" ");
        var numWords = words.length;

        var foundOrNot = false;
        var myWord = "";

        // parse words
        for (i = 0; i < numWords; i++) {

          myWord = words[i];
          //console.log("Je compare ce mot ["+myWord+"]")

          if (myWord.localeCompare(getCurrentResponse()) === 0) {
            // start of e.g. time section, handled in nex loop
            foundOrNot = true;
            console.log("Trouvé :D +++++++++++++++++++ (Bonne Réponse="+getCurrentResponse()+")");
            break;

          } else {
            // phrase
            console.log("Pas Trouvé :D --------------- (Bonne Réponse="+getCurrentResponse()+")");
            aListeMots.push(myWord);

          }
        }

        if(foundOrNot === true){
          _this.stopDisplay();
          _this.updateDisplay(_this.parseInput(myWord));

        }else{
          console.log("Pop it !");

          var smallArray = [];
          var htmlContent;

          // resize the words array
          console.log("Taille du tableau des mots entendus : " + aListeMots.length);

          if(aListeMots.length > 10){
            smallArray = aListeMots.slice(aListeMots.length - 10, aListeMots.length - 1)
          }else{
            smallArray = aListeMots;
          }

          console.log("Taille du tableau des mauvaises réponses : " + smallArray.length);

          for(i = 0; i < smallArray.length; i++){
            console.log("Tableau des mauvaises réponses : " + smallArray[i]);
            htmlContent += '<li> '+smallArray[i]+' </li>';
          }

          document.getElementById("listeMots").innerHTML = htmlContent;

          popPolaroid();
        }
      }
    }
  }

};

FlapperSpeech.prototype = {

  cleanInput: function(text) {
    return text.trim().toUpperCase();
  },

  parseInput: function(text) {
    var buffer = new FlapBuffer(this.opts.width, this.num_lines);
    var lines = text.split(/\n/);

    for (i in lines) {
      var words = lines[i].split(/\s/);
      for (j in words) {
        buffer.pushWord(words[j]);
      }
      buffer.flush();
    }

    buffer.flush();
    return buffer.buffers;
  },

  stopDisplay: function() {
    for (i in this.timers) {
      clearTimeout(this.timers[i]);
    }

    this.timers = [];
  },

  updateDisplay: function(buffers) {
    var _this = this;
    var timeout = 100;

    for (i in buffers) {

      _this.$displays.each(function(j) {

        var $display = $(_this.$displays[j]);

        (function(i,j) {
          _this.timers.push(setTimeout(function(){
            if (buffers[i][j]) {
              $display.val(buffers[i][j]).change();
            } else {
              $display.val('').change();
            }
          }, timeout));
        } (i, j));

        timeout += _this.line_delay;
      });

      timeout += _this.screen_delay;
    }
  }

};

$(document).ready(function(){

  new FlapperSpeech('input.display', '#typesomething', '#showme');
  launchNewPuzzle();

});
