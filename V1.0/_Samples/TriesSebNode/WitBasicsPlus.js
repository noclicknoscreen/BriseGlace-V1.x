var rec = require('node-record-lpcm16')
//const encoding = 'LINEAR16';
const sampleRateHertz = 16000;
const languageCode = 'fr-FR';

var request = require('request')

var witToken = process.env.WIT_TOKEN; // get one from wit.ai!

exports.parseResult = function (err, resp, body) {
  console.log(body)
}

rec
.start({
  sampleRateHertz: sampleRateHertz,
  threshold: 0,
  // Other options, see https://www.npmjs.com/package/node-record-lpcm16#options
  verbose: true,
  recordProgram: 'rec', // Try also "arecord" or "sox"
  silence: '10.0',
})
//.on('error', console.error)
.pipe(request.post({
  'url'     : 'https://api.wit.ai/speech?client=chromium&lang='+languageCode+'&output=json',
  'headers' : {
    'Accept'        : 'application/vnd.wit.20160202+json',
    'Authorization' : 'Bearer ' + witToken,
    'Content-Type'  : 'audio/wav'
  }
}, exports.parseResult))

//console.log('Listening, press Ctrl+C to stop.');
