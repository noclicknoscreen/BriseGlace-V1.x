
var express = require('express');
var app = express();
var server = app.listen(3000);

app.use(express.static('All-In'));


var io = require('socket.io');
var mySocket = io(server);


const record = require('node-record-lpcm16');
// Imports the Google Cloud client library
const speech = require('@google-cloud/speech');
// Creates a client
var client;

const encoding = 'LINEAR16';
const sampleRateHertz = 16000;
const languageCode = 'fr-FR';

const request = {
  config: {
    encoding: encoding,
    sampleRateHertz: sampleRateHertz,
    languageCode: languageCode,
  },
  single_utterance:true,
  interimResults: true, // If you want interim results, set this to true
};

// Create a recognize stream
var recognizeStream;

console.log("My socket server is running");
mySocket.sockets.on('connection', newConnection);

start();
recordSome();

function newConnection(socket){
  console.log('new connection : ' + socket.id);
}

function start(){

  console.log('Start API Client.');

  client = new speech.SpeechClient();
  recognizeStream = client
  //.streamingRecognize(request)
  .streamingRecognize(request)
  .on('error', console.error)
  .on('data', sendWords)
  ;
}

function recordSome(){

  console.log('Listening audio, press Ctrl+C to stop.');

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

}

function sendWords(data){

  if(data.results[0] && data.results[0].alternatives[0]){
    console.log('Transcription:' + data.results[0].alternatives[0].transcript);
    mySocket.emit('words', JSON.stringify(data.results[0].alternatives[0].transcript));

  }else{
    console.log(`\n\nReached transcription time limit, press Ctrl+C\n`);
    start();
  }

}
