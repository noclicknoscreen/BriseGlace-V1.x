
// Tmp allows to create random file name
var tmp = require('tmp');
var tmpname = tmp.tmpNameSync({ template: 'tmp/tmp-XXXXXX.wav' });
console.log("Filename : " + tmpname);

// Create, listen, write and stops every 3 seconds
var record = require('node-record-lpcm16')
var fs = require('fs')
var file = fs.createWriteStream(tmpname, { encoding: 'binary' })

record.start({
  sampleRate : 16000,
  verbose : true
})
.pipe(file)

// Stop recording after three seconds
setTimeout(function () {
  record.stop()
}, 3000)
