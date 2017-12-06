
var express = require('express');
var app = express();
var server = app.listen(3000);

var io = require('socket.io');
var mySocket = io(server);

const record = require('node-record-lpcm16');
const request = require('request');
var witToken = 'TWWYOKL6CJMWMVIN3HJLUGSMIPCUKHC5'; // get one from wit.ai!

app.use(express.static('All-In'));

console.log("My socket server is running");

mySocket.sockets.on('connection', newConnection);

function newConnection(socket){
  console.log('new connection : ' + socket.id);

  mySocket.on('whatsNew', whatsNewReceived);
  function whatsNewReceived(data){
    console.log('Received : \n' + data.x + "," + data.y);
    //sendWords(data);
  }

  recordSome();

}

function recordSome(){

  console.log('Listening audio, press Ctrl+C to stop.');
  // Stop recording after three seconds

  setTimeout(function () {
    record.stop()
  }, 10000);

record.start({
  /*
  sampleRate    : 16000  // audio sample rate
  threshold     : 0.5    // silence threshold (rec only)
  thresholdStart: null   // silence threshold to start recording, overrides threshold (rec only)
  thresholdEnd  : null   // silence threshold to end recording, overrides threshold (rec only)
  silence       : '1.0'  // seconds of silence before ending
  verbose       : false  // log info to the console
  recordProgram : 'rec'  // Defaults to 'rec' - also supports 'arecord' and 'sox'
  device        : null   // recording device (e.g.: 'plughw:1')
  */
  verbose:true,
  thresholdStart: 0.75,   // silence threshold to start recording, overrides threshold (rec only)
  thresholdEnd  : 0.5    // silence threshold to end recording, overrides threshold (rec only)
  // threshold     : 0.65,       // silence threshold (rec only)
  //silence       : '0.5',     // seconds of silence before ending
  //recordProgram : 'sox'  // Defaults to 'rec' - also supports 'arecord' and 'sox'
  // thresholdStart: 0.5,   // silence threshold to start recording, overrides threshold (rec only)
  // thresholdEnd  : 0.5    // silence threshold to end recording, overrides threshold (rec only)
})
.on('error', console.error)
.pipe(request.post({
  'url'     : 'https://api.wit.ai/speech?client=chromium&lang=fr-fr&output=json',
  'headers' : {
    'Accept'        : 'application/vnd.wit.20160202+json',
    'Authorization' : 'Bearer ' + witToken,
    'Content-Type'  : 'audio/wav'
  }
}, sendWords));

}

function sendWords(err, resp, body){

  if(body){
    console.log('[OK] : \n' + body);
    mySocket.emit('words', body);
  }else{
    console.log('[Error] : \n' + err);
  }

  // And take a new shot
  recordSome();

}

// Create a recognize stream
exports.parseResult = function (err, resp, body) {
  console.log(body);
  recordSome();
}
