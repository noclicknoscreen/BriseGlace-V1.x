var record = require('node-record-lpcm16')
var request = require('request')
var witToken = process.env.WIT_TOKEN; // get one from wit.ai!

exports.parseResult = function (err, resp, body) {
  console.log(body)
}

record
.start({
  threshold: 0,
  // Other options, see https://www.npmjs.com/package/node-record-lpcm16#options
  //verbose: TRUE,
  recordProgram: 'rec', // Try also "arecord" or "sox"
  silence: '0.5',
})
.on('error', console.error)
.pipe(request.post({
  'url'     : 'https://api.wit.ai/speech?client=chromium&lang=fr-FR&output=json',
  'headers' : {
    'Accept'        : 'application/vnd.wit.20160202+json',
    'Authorization' : 'Bearer ' + witToken,
    'Content-Type'  : 'audio/ulaw'
  }
}, exports.parseResult))
