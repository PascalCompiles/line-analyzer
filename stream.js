const stream = require('stream');
const { Transform } = require('stream');

/************************************BEGIN************************************/
/* helper variables and constants to help collect data to create the desired line objects.
*/

// Capture current start time in miliseconds
const startTime = Date.now();

// Count total lines coming in through stdin.
let totalLines = 0

// Create variable to hold the string data of a buffer if the end of a line is missing "\n"
let strStore = "";

/************************************END************************************/

// Create the duplex/transformation stream responsible for transforming each line into an object

const createLineObj = new Transform({
  transform(chunk, encoding, callback) {
  let chunkData = chunk.toString();
    
    // If our string store is holding data from a previous chunk, let's append it
    if(strStore.length > 0) {
      chunkData = strStore + chunkData;
      //remove string data from previous chunk
      strStore = "";
    }

  while (chunkData.indexOf('\n') != -1) {
    const lineData = chunkData.substring(0, chunkData.indexOf('\n') + 1)
    //remove the part we just passed 
    chunkData = chunkData.substring(chunkData.indexOf('\n') + 1, chunkData.length)
    // Capture the end time
    const endTime = Date.now();
    // Set the elapsed time it took for this line.
    const elapsedTime = endTime - startTime
    // Get the string's byteLength
    const lengthInBytes = Buffer.byteLength(lineData, 'utf8');
    // increment the totalLines
    totalLines++
    // Make the line object and stringify it.
    this.push(JSON.stringify(
    { elapsedTime: elapsedTime,
      lengthInBytes: lengthInBytes,
      totalLines: totalLines
    }))
//    process.stdin.end();

  }
  if (chunkData.length > 0) {
  /*if some string data is leftover in the chunk because the end of a line "\n" could not be found.
   * let's store that in memory and wait for the next chunk so it can be tacked on.*/
  strStore = chunkData;
  //console.log("there's some left over data"); 
  }
    callback();
  }
});




// create a second stream that consumes the created objects and outputs human readable one-line summary reports.

const summaryReport = new Transform({
  transform(chunk, encoding, callback) {
    const chunkData = JSON.parse(chunk);

    // additional feature, clear previous line
    if (process.argv[2] === "--clear") {
    console.clear();
    }


    function calculateBytesPerSec(chunkData) {
    // convert the elapsed time from miliseconds to seconds
    const elapsedTimeSecs = chunkData.elapsedTime / 1000
    return Math.floor(chunkData.lengthInBytes / elapsedTimeSecs);
    }




    this.push(`Summary Report - ElapsedTime: ${chunkData.elapsedTime} milisec, LengthInBytes: ${chunkData.lengthInBytes}, TotalLines: ${chunkData.totalLines}, Rate: ${calculateBytesPerSec(chunkData)} Bytes/sec \n`);
    callback();
  }
});



process.stdin.on('data', function(chunk) {}).pipe(createLineObj).pipe(summaryReport).pipe(process.stdout);

