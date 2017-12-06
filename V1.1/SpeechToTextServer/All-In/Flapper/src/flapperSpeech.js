//var io = require('socket.io');
var socket;

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



var FlapDemo = function(display_selector, input_selector, click_selector) {
    var _this = this;

    var onAnimStart = function(e) {
        var $display = $(e.target);
        $display.prevUntil('.flapper', '.activity').addClass('active');
    };

    var onAnimEnd = function(e) {
        var $display = $(e.target);
        $display.prevUntil('.flapper', '.activity').removeClass('active');
    };

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

    // Socket Part
    socket = io.connect('http://localhost:3000');
    socket.on('words', newTranscription);

    function newTranscription(transcrData){

      var key, value;

      //console.log("Acquiring new transcription : \n" + transcrData);

      //if (typeof transcrData._text !== 'undefined') {
        // Désormais, on sait que toto est bien
        // défini et on peut poursuivre.
        JSON.parse(transcrData, (key, value) =>{
          if (key === '_text') {
              console.log('[Real text] : ' + value)

              var text = _this.cleanInput(value);

              var buffers = _this.parseInput(text);

              _this.stopDisplay();
              _this.updateDisplay(buffers);

              e.preventDefault();

          }
          if (key === 'error') {
              console.error('[Error] : ' + value)
          }
        });

      //}else{
        //console.log('Text undefined !!!!!!!!!!!!!!!!!!!');
      //}
    }

};

FlapDemo.prototype = {

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

    new FlapDemo('input.display', '#typesomething', '#showme');

});
