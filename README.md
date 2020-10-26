## Line Analyzer

The Line Analyzer tool let's you get information on invidiual lines being processed in your Unix pipelines.

e.g.

`$cat output.log | node analyzelines.js`

**Output:**
`Summary Report - ElapsedTime: 8 milisec, LengthInBytes: 40, TotalLines: 1, Rate: 5000 Bytes/sec` 

## Installation 

Simply clone this repo to your desired folder, this package does not require external dependencies to run.

# Testing

Testing uses `jest` therefore you will need to run the following commands:

`npm install`

`npm run test`

## Additional Feature

By default Analyze Lines will print each line to the screen, to prevent your screen from being flooded you can pass the `--clear` option to have each line cleared before the next one.

e.g. 

`$ tail -f output.log | node analyzelines.js --clear`
