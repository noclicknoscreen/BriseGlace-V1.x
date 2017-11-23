// Move it from left to right to watch if it's alive !
var x = 0;

// Record some stream
var record = require('node-record-lpcm16');

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
  interimResults: true, // If you want interim results, set this to true
};

// Create a recognize stream
const recognizeStream = client
  .streamingRecognize(request)
  .on('error', console.error("Errors"))
  .on('data', console.log(data.results[0] && data.results[0].alternatives[0] ? `Transcription: ${data.results[0].alternatives[0].transcript}\n` : `\n\nReached transcription time limit, press Ctrl+C\n`));


function setup() {
  createCanvas(720, 400);

  // Create an Audio input
  mic = new p5.AudioIn();
  // start the Audio Input.
  mic.start();

  console.log(record);

}

function draw() {

  background(200);

  // Set colors
  stroke(100, 255, 255);
  noFill();
  strokeWeight(4 * mic.getLevel());
  ellipse(width / 2, height / 2, 400 * mic.getLevel(), 400 * mic.getLevel());

  // Draw a circle
  stroke(50);
  fill(100);
  ellipse(x, 0.95 * height, 20, 20);
  x++;
  if (x > width) {
    x = 0;
  }
}