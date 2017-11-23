
var express = require('express');
var app = express();
var server = app.listen(3000);

app.use(express.static('publicP5'));

console.log("My socket server is running");

var io = require('socket.io');
var mySocket = io(server);

mySocket.sockets.on('connection', newConnection);

function newConnection(socket){
  console.log('new connection : ' + socket.id);

  mySocket.on('whatsNew', whatsNewReceived);
  function whatsNewReceived(data){
    console.log('Received : \n' + data.x + "," + data.y);
    //sendWords(data);
  }

  record
  .start({
    sampleRateHertz: sampleRateHertz,
    threshold: 0,
    // Other options, see https://www.npmjs.com/package/node-record-lpcm16#options
    verbose: false,
    recordProgram: 'rec', // Try also "arecord" or "sox"
    silence: '0.5',
  })
  .on('error', console.error)
  .pipe(recognizeStream);

  console.log('Listening audio, press Ctrl+C to stop.');

}

function sendWords(data){

  if(data.results[0] && data.results[0].alternatives[0]){
    process.stdout.write(`Transcription: ${data.results[0].alternatives[0].transcript}\n`);
    mySocket.emit('words', data);
  }else{
    process.stdout.write(`\n\nReached transcription time limit, press Ctrl+C\n`);
  }

}


const record = require('node-record-lpcm16');
// Imports the Google Cloud client library
const speech = require('@google-cloud/speech');
// Creates a client
const client = new speech.SpeechClient();

const encoding = 'LINEAR16';
const sampleRateHertz = 16000;
const languageCode = 'fr-FR';

const request = {
  config: {
    encoding: encoding,
    sampleRateHertz: sampleRateHertz,
    languageCode: languageCode,
  },
  interimResults: false, // If you want interim results, set this to true
};

// Create a recognize stream
const recognizeStream = client
.streamingRecognize(request)
.on('error', console.error)
.on('data', sendWords)
;
