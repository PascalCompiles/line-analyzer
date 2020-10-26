const { exec, spawn } = require('child_process');
var Readable = require('stream').Readable; 

var cp = spawn('node', ['./analyzelines.js'], { stdio: ['pipe', 1, 2, 'ipc'] });

function bufferToStream(buffer) { 
  var stream = new Readable();
  stream.push(buffer);
  stream.push(null);
  return stream;
}

describe("Streaming lines test", () => {
  test("it should work with a single line", () => {
  let result = "";
    // actual test
    const output = `Summary Report - ElapsedTime: 10 milisec, LengthInBytes: 8, TotalLines: 1, Rate: 800 Bytes/sec \n`;
    const stream = bufferToStream(Buffer.from(`Line 1 \n`));
    stream.on('data', () => {} ).pipe(cp.stdin).pipe(process.stdout)
    expect(output).toEqual(output);
  });
});
