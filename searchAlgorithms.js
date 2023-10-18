const fs = require("fs");

// WRITING DATA TO FILE
// delete output csv file if exists
if (fs.existsSync("searchAlgRuntimes.csv"))
  fs.unlinkSync("searchAlgRuntimes.csv");
// create and write a header to the output csv file
fs.appendFile(
  "searchAlgRuntimes.csv",
  "Search Type, N, Target, Guesses\n",
  (err) => {
    if (err) throw err;
  }
);

//LINEAR SEARCH
function linearSearch(array, target) {
  for (let i = 0; i < array.length; i++) {
    if (array[i] === target) {
      return i;
    } else {
      continue;
    }
  }
}

//BINARY SEARCH
function binarySearch(array, target) {
  let lower = 0;
  let upper = array.length - 1;
  let noGuess = 0;

  while (lower <= upper) {
    noGuess++;
    const middle = lower + Math.floor((upper - lower) / 2);
    if (target === array[middle]) {
      return noGuess;
    }
    if (target < array[middle]) {
      upper = middle - 1;
    } else {
      lower = middle + 1;
    }
  }
}

// const arraySizes = [
//   1, 10, 500, 1000, 5000, 10000, 20000, 30000, 40000, 50000, 60000, 70000,
//   80000, 90000, 100000, 110000, 120000, 130000, 140000, 150000, 160000, 170000,
//   180000, 190000, 200000, 250000, 300000, 350000, 400000, 450000, 500000,
//   550000,
// ];

const runs = 10;

for (let n = 500; n <= 550000; n = n + 500) {
  //Generate array of numbers
  let testArray = [];
  for (let i = 0; i <= n; i++) {
    testArray.push(i);
  }

  //Select target randomly from testArray, excluding 0
  function getRandom(min, max) {
    return min + Math.floor(Math.random() * (max - min + 1));
  }

  let linearTotal = 0;
  let linearAverage = 0;
  let binaryTotal = 0;
  let binaryAverage = 0;

  for (let r = 1; r <= runs; r++) {
    let randomNumberSelection = getRandom(1, n);
    console.log(randomNumberSelection);
    //Call linear search & record data
    const linearResult = linearSearch(testArray, randomNumberSelection);
    linearTotal += linearResult;
    console.log(
      `Run ${r}: The target ${randomNumberSelection} was found after ${linearResult} guesses`
    );

    const binaryResult = binarySearch(testArray, randomNumberSelection);
    binaryTotal += binaryResult;
    console.log(
      `Run ${r}: The target ${randomNumberSelection} was found after ${binaryResult} guesses.`
    );
  }
  linearAverage = linearTotal / runs;
  const linearData = `Linear Search: Size ${n} | Average Guesses = ${linearAverage} \n`;
  fs.appendFile("searchAlgRuntimes.csv", linearData, (err) => {
    if (err) throw err;
  });
  binaryAverage = binaryTotal / runs;
  const binaryData = `Binary Search: Size ${n} | Average Guesses =  ${binaryAverage}\n`;
  fs.appendFile("searchAlgRuntimes.csv", binaryData, (err) => {
    if (err) throw err;
  });
}
