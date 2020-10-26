const { spawn } = require('child_process');


function callApp() {
spawn('cat google.com | node index.js')
}

describe("Stream test", () => {
  test("it should work with a single line", () => {
    // actual test
    const input = [
      { id: 3, url: "https://www.link3.dev" }
    ];
    const output = [{ id: 3, url: "https://www.link3.dev" }];
expect(callApp()).toEqual(output);
  });
});
