// WRITING DATA TO FILE
const fs = require('fs')
// delete output csv file if exists
if (fs.existsSync('sortingAlgRuntimes.csv')) fs.unlinkSync('sortingAlgRuntimes.csv'); 
// create and write a header to the output csv file
fs.appendFile('sortingAlgRuntimes.csv', "Sort Type, N,runtime\n", (err) => {
    if (err) throw err});