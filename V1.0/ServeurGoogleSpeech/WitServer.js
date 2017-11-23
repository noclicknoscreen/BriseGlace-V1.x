
var express = require('express');
var app = express();
var server = app.listen(3000);

var io = require('socket.io');
var mySocket = io(server);

const record = require('node-record-lpcm16');
const request = require('request');
var witToken = 'TWWYOKL6CJMWMVIN3HJLUGSMIPCUKHC5'; // get one from wit.ai!

app.use(express.static('publicP5'));

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
    verbose:true
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
