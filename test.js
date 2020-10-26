const { exec, spawn } = require('child_process');
var fs = require('fs');

var cp = spawn('node', ['./analyzelines.js'], { stdio: ['pipe', 1, 2, 'ipc'] });

fs.createReadStream(__dirname+'/example.txt').pipe(cp.stdin).pipe(process.stdout);
