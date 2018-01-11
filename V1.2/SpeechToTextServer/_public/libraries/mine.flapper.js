
const minAsciiCode = 33;
const maxAsciiCode = 90;

function showMasterFlapper(){
    w3.show("#MasterFlapper");
};
function hideMasterFlapper(){
    w3.hide("#MasterFlapper");
};

function startFlapper(_word){

  var word = _word.toUpperCase();
  var MasterFlapper = document.getElementById('MasterFlapper');

  MasterFlapper.innerHTML = '';
  // var middlePos = 0.5 * MasterFlapper.clientWidth;
  // if(middlePos === 0){
  //   middlePos = 0.5 * 1920;
  // }
  var middlePos = 0.5 * 1920;
  var realPos = middlePos -  0.5*_word.length*72;
  MasterFlapper.style.left = realPos.toString() + 'px';

  for(idxLetter=0; idxLetter<word.length; idxLetter++){

    var divDigit = document.createElement('div');
    var divBackTop = document.createElement('div');
    var divBackBottom = document.createElement('div');
    var divFrontTop = document.createElement('div');
    var divFrontBottom = document.createElement('div');

    divDigit.setAttribute('class','digit');
    divBackTop.setAttribute('class','back top');
    divBackBottom.setAttribute('class','back bottom');
    divFrontTop.setAttribute('class','front top');
    divFrontBottom.setAttribute('class','front bottom');

    divDigit.appendChild(divBackTop);
    divDigit.appendChild(divBackBottom);
    divDigit.appendChild(divFrontTop);
    divDigit.appendChild(divFrontBottom);
    document.getElementById('MasterFlapper').appendChild(divDigit);

  }

  $('.flapper .digit').each(function(index, value) {


    var flap = new FlapDigit($(this));
    flap.cycleTo(word[index]);
    // console.log( index + ": " + word[index]);

    // setInterval(function() {
    //   var rand = Math.floor(Math.random() * 9) + 1;
    //   flap.cycleTo(_word[index]);
    // }, 10000);

  });

}

$(document).ready(function() {

  FlapDigit = function($ele) {
    this.digits = ['&nbsp;', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O','P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', "'", '-', ' '];
    this.pos = 0;
    this.target = this.digits[0];

    // this.digits = ['&nbsp;', 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, '.', ',', ':', '$'];
    // this.pos = 0;
    // this.target = this.digits[0];
    // this.targetAsciiCode = minAsciiCode;
    // this.currentAsciiCode = minAsciiCode;
    this.interval = 150;
    this.timeout;
    this.animate = true;

    this.$prev = $ele.find('.front.top, .back.bottom');
    this.$next = $ele.find('.back.top, .front.bottom');
    this.$back_top = $ele.find('.back.top');
    this.$back_bottom = $ele.find('.back.bottom');
    this.$front_top = $ele.find('.front.top');
    this.$front_bottom = $ele.find('.front.bottom');

    this.initialize();
  }

  FlapDigit.prototype = {

    initialize: function() {
      this.$prev.html(this.digits[this.pos]);
      this.$next.html(this.digits[this.pos]);
      console.log(this);
    },

    increment: function() {
      var _this = this;

      // Increment eache character
      var next = this.pos + 1;
      if (next >= this.digits.length) {
        next = 0;
      }

      // There display the letters
      this.$prev.show().html(this.digits[this.pos]);
      this.$next.hide().html(this.digits[next]);

      var speed1 = Math.floor(Math.random() * this.interval * .4 + this.interval * .3);
      var speed2 = Math.floor(Math.random() * this.interval * .1 + this.interval * .2);

      if (this.animate) {
        this.$back_top.show();
        this.$front_bottom.transform({ scaleY: 0.0 });
        this.$front_top.transform({ scaleY: 1.0 }).stop().show().animate({ scaleY: 0.0 }, speed1, 'swing', function(){
          _this.$front_bottom.stop().show().animate({ scaleY: 1.0 }, speed2, 'linear');
        });
      } else {
        this.$front_top.hide();
        this.$back_top.show();
        if (this.timeout) {
          clearTimeout(this.timeout);
        }
        this.timeout = setTimeout(function(){
          this.$back_bottom.hide();
          this.$front_bottom.show();
        }, speed);
      }

      this.pos = next;

    },

    cycleTo: function(_letter) {
      var _this = this;

      var myPos = this.digits.indexOf(_letter);
      if(myPos < 0){
        // We not found the letter into the array, so get the empty one
        myPos = 0;
      }

      if (this.interval_timer) {
        clearInterval(this.interval_timer);
        this.interval_timer = null;
      }

      this.interval_timer = setInterval(function(){

        if (_this.pos === myPos) {
          clearInterval(_this.interval_timer);
          _this.interval_timer = null;
        } else {
          _this.increment();
        }
      }, this.interval);

    }

  };

});
