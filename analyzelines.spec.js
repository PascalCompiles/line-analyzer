const calculateBytesPerSec = require('./analyzelines.js'); 

describe("Convert bytes and miliseconds into Throughput Rate of Bytes/sec", () => {
  test("Should be able to convert using integers.", () => {
    const input = {
            elapsedTime: 10,
            lengthInBytes: 8,
            totalLines: 1,
          }
    const output = 800;
    expect(calculateBytesPerSec(input)).toEqual(output);
  });
  test("Should be able to convert using float values.", () => {
    const input = {
            elapsedTime: 20,
            lengthInBytes: 199.47619047619045,
            totalLines: 22,
          }
    const output = 9973;
    expect(calculateBytesPerSec(input)).toEqual(output);
  });
});
