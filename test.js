const { exec } = require('child_process');
var Readable = require('stream').Readable; 

function bufferToStream(buffer) { 
  var stream = new Readable();
  stream.push(buffer);
  stream.push(null);

  return stream;
}
const singleLine = Buffer.from("hey \n")

bufferToStream(singleLine).on('data', function(chunk) {  
}).pipe(exec('node', ['./stream.js']))


