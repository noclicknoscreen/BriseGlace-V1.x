// Tmp allows to create random file name
var tmp = require('tmp');
var tmpFileName;

// Create, listen, write and stops every 3 seconds
var record = require('node-record-lpcm16');
var fs = require('fs');
var file;
const sampleRate = 16000;

// Socket decalrations ---------------------------------------------------------
var express = require('express');
var app = express();
var server = app.listen(3000);
var clientDir = '_publicP5_V3';

var io = require('socket.io');
var mySocket = io(server);

app.use(express.static(clientDir));
mySocket.sockets.on('connection', newConnection);

function newConnection(socket){

  console.log('Nouvelle connection : ' + socket.id);
  //socket.on('listen', listenX);

  startRecording();

}
function listenX(socket){
  console.log("I'm listening...................");
  startRecording();
}
// -----------------------------------------------------------------------------

// ------------------------------------------------------
// CORE SERVER SECTION ---------------------------------------------------------
//startRecording();

// ------------------------------------------------------

// ------------------------------------------------------
// Functions section
// ------------------------------------------------------

// The name of the audio file to transcribe
function startRecording()
{

  tmpFileName = tmp.tmpNameSync({ template: '/tmp/tmp-XXXXXX.wav' });
  console.log("Enregistrement sur ce fichier : " + tmpFileName);

  file = fs.createWriteStream(tmpFileName, { encoding: 'binary' });

  // RECORD ---------------------------------------------
  record.start({
    // sampleRate    : 16000  // audio sample rate
    // threshold     : 0.5    // silence threshold (rec only)
    // thresholdStart: null   // silence threshold to start recording, overrides threshold (rec only)
    // thresholdEnd  : null   // silence threshold to end recording, overrides threshold (rec only)
    // silence       : '1.0'  // seconds of silence before ending
    // verbose       : false  // log info to the console
    // recordProgram : 'rec'  // Defaults to 'rec' - also supports 'arecord' and 'sox'
    // device        : null   // recording device (e.g.: 'plughw:1')
    sampleRate : sampleRate,
    verbose : true,
    silence       : '0.5',  // seconds of silence before ending
    threshold     : 0.8,   // silence threshold (rec only)
    // thresholdStart: 0.5,  // silence threshold to start recording, overrides threshold (rec only)
    // thresholdEnd  : 0.5,   // silence threshold to end recording, overrides threshold (rec only)

  })
  .on('end', function () {
    console.log('Fin du streaming.');
    startRecognition(tmpFileName);
    // Then restart
    //startRecording();
  })
  .pipe(file);

  //Stop recording after three seconds
  // setTimeout(function () {
  //   record.stop();
  // }, 5000)

}

// --------------------------------------------------------

// Imports the Google Cloud client library
const speech = require('@google-cloud/speech');

// Your Google Cloud Platform project ID
const projectId = 'avid-booth-186618';

// Creates a client
const client = new speech.SpeechClient({
  projectId: projectId,
});

function startRecognition(myPath)
{

  console.log('Lancement reconnaissance sur ce fichier : ' + myPath);

  // Reads a local audio file and converts it to base64
  const newFile = fs.readFileSync(myPath);
  const audioBytes = newFile.toString('base64');

  // The audio file's encoding, sample rate in hertz, and BCP-47 language code
  const audio = {
    content: audioBytes,
  };
  const config = {
    encoding: 'LINEAR16',
    sampleRateHertz: sampleRate,
    languageCode: 'fr-FR',
  };
  const request = {
    audio: audio,
    config: config,
  };

  // Detects speech in the audio file
  client
  .recognize(request)
  .then(data => {
    const response = data[0];
    const transcription = response.results
    .map(result => result.alternatives[0].transcript)
    .join('\n');

    if(transcription != ''){
      mySocket.emit('words', JSON.stringify(transcription));

      console.log('++++++++++++++++++++++++++++++++++++++++++++++++++++++++');
      console.log('Transcription recue !');
      console.log(`Transcription: ${transcription}`);
      console.log('++++++++++++++++++++++++++++++++++++++++++++++++++++++++');

    }else{
      console.log('--------------------------------------------------------');
      console.log('Transcription vide ------------------------------------');
      console.log('--------------------------------------------------------');

    }

    startRecording();

  })
  .catch(err => {
    console.error('ERROR:', err);
  });

}
