
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

  document.getElementById('MasterFlapper').innerHTML = '';

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
    // this.digits = ['&nbsp;', 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, '.', ',', ':', '$'];
    // this.pos = 0;
    // this.target = this.digits[0];
    this.targetAsciiCode = minAsciiCode;
    this.currentAsciiCode = minAsciiCode;
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
      this.$prev.html('');
      this.$next.html('');
      console.log(this);
    },

    increment: function() {
      var _this = this;

      // Increment eache character
      var next = this.currentAsciiCode + 1;
      if (next >= maxAsciiCode) {
        next = minAsciiCode;
      }

      // There display the letters
      this.$prev.show().html(String.fromCharCode(this.currentAsciiCode));
      this.$next.hide().html(String.fromCharCode(next));

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

      this.currentAsciiCode = next;

    },

    cycleTo: function(_letter) {
      var _this = this;
      _this.targetAsciiCode = _letter.charCodeAt(0);

      // console.log('Cycle to letter : ' + _letter + ', ascii code:' + _this.currentAsciiCode);
      // console.log('Target is : ' + String.fromCharCode(_this.targetAsciiCode) + ', ascii code:' + _this.targetAsciiCode);

      if (this.interval_timer) {
        clearInterval(this.interval_timer);
        this.interval_timer = null;
      }

      this.interval_timer = setInterval(function(){

        // console.log('Comparing ['+_this.targetAsciiCode+'->'+String.fromCharCode(_this.targetAsciiCode)+'] and ['+_this.currentAsciiCode+'->'+String.fromCharCode(_this.currentAsciiCode)+']')

        if (_this.targetAsciiCode === _this.currentAsciiCode) {
          clearInterval(_this.interval_timer);
          _this.interval_timer = null;
        } else {
          _this.increment();
        }
      }, this.interval);

    }

  };

});
