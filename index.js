//IMPORTS
const fs = require("fs");
const { performance } = require("perf_hooks");

// WRITING DATA TO FILE
// delete output csv file if exists
if (fs.existsSync("sortingAlgRuntimes.csv"))
  fs.unlinkSync("sortingAlgRuntimes.csv");
// create and write a header to the output csv file
fs.appendFile("sortingAlgRuntimes.csv", "Sort Type, N,runtime\n", (err) => {
  if (err) throw err;
});

//Array of array sizes to test
const arraySizes = [
  1000, 5000, 10000, 15000, 20000, 25000, 30000, 35000, 40000, 45000, 50000,
  55000, 60000, 65000, 70000, 75000, 80000, 850000, 90000, 100000, 110000,
  120000, 130000, 140000, 150000, 160000,
];

//BUBBLE SORT
function bubbleSort(arr) {
  let isSwapped;
  do {
    isSwapped = false;
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] > arr[i + 1]) {
        let temp = arr[i];
        arr[i] = arr[i + 1];
        arr[i + 1] = temp;
        isSwapped = true;
      }
    }
  } while (isSwapped);
}

//SELECTION SORT
function selectionSort(arr) {
  for (let i = 0; i < arr.length; i++) {
    let min = i; // storing index of min element

    for (let j = 0; j < arr.length; j++) {
      if (arr[min] > arr[j]) {
        min = j; // updating index of min element
      }
    }
    if (i !== min) {
      let temp = arr[i];
      arr[i] = arr[min];
      arr[min] = temp;
    }
  }
  return arr;
}

//INSERTION SORT
function insertionSort(arr) {
  for (let i = 1; i < arr.length; i++) {
    let current = arr[i];
    let j;

    for (j = i - 1; j >= 0 && arr[j] > current; j--) {
      let temp = arr[j + 1];
      arr[j + 1] = arr[j];
      arr[j] = temp;
    }
  }
  return arr;
}

//MERGE SORT
function mergeSort(arr) {
  if (arr.length === 1) {
    return arr;
  }
  let array1 = mergeSort(arr.slice(0, arr.length / 2));
  let array2 = mergeSort(arr.slice(arr.length / 2));

  let i = 0;
  let j = 0;
  let newArr = [];

  while (i < array1.length || j < array2.length) {
    if ((i !== array1.length && array1[i] < array2[j]) || j === array2.length) {
      newArr.push(array1[i]);
      i++;
    } else {
      newArr.push(array2[j]);
      j++;
    }
  }
  return newArr;
}

//Declare runs
const runs = 10;
//run sorts for varying data sizes N
for (let n = 0; n <= arraySizes.length; n++) {
  //Declare empty array and fill with random numbers according to n array size
  const randomNumberArr = [];
  console.log("Sorting with N = ", arraySizes[n]);
  for (let i = 0; i < arraySizes[n]; i++) {
    randomNumberArr.push(Math.floor(Math.random() * 100));
  }

  //BUBBLE SORT CALLS & CALCULATIONS
  //Bubble Sort variables to calculate average runtimes (commented for Bubble Sort and repeated for each sort algorithm.)
  let bubbleTotal = 0;
  let bubbleAverage = 0;

  //Loop through runs to run each alrogithm 10 times on each array size
  for (let r = 1; r <= runs; r++) {
    //Record start of each run and print to console
    let timestart = performance.now();
    console.log("r = ", r, "starting at", timestart);
    //Call Bubble Sort function
    bubbleSort(randomNumberArr);
    //Calculate time of each run (time after function - time before function)
    runtime = performance.now() - timestart;
    //Add each runtime to total
    bubbleTotal += runtime;
  }
  //Print total to console
  console.log("Current total: " + bubbleTotal);
  //Calculate average
  bubbleAverage = bubbleTotal / runs;
  //Store runtime data in variable and also print to console
  let data =
    "BUBBLE SORT: Size " +
    String(arraySizes[n]) +
    ", Average Runtime: " +
    String(bubbleAverage) +
    "\n";
  console.log(data);
  //Write runtime data to csv file
  fs.appendFile("sortingAlgRuntimes.csv", data, (err) => {
    if (err) throw err;
  });
}

//SELECTION SORT CALLS & CALCULATIONS
for (let n = 0; n <= arraySizes.length; n++) {
  const randomNumberArr = [];
  console.log("Sorting with N = ", arraySizes[n]);

  for (let i = 0; i < arraySizes[n]; i++) {
    randomNumberArr.push(Math.floor(Math.random() * 100));
  }

  let selectionTotal = 0;
  let selectionAverage = 0;

  for (let r = 1; r <= runs; r++) {
    timestart = performance.now();
    console.log("r = ", r, "starting at", timestart);
    selectionSort(randomNumberArr);
    runtime = performance.now() - timestart;
    selectionTotal += runtime;
  }

  console.log("Current total: " + selectionTotal);
  selectionAverage = selectionTotal / runs;
  data =
    "SELECTION SORT: Size " +
    String(arraySizes[n]) +
    ", Average Runtime: " +
    String(selectionAverage) +
    "\n";
  console.log(data);
  fs.appendFile("sortingAlgRuntimes.csv", data, (err) => {
    if (err) throw err;
  });
}

//INSERTION SORT CALLS & CALCULATIONS
for (let n = 0; n <= arraySizes.length; n++) {
  //Declare empty array and fill with random numbers according to n array size
  const randomNumberArr = [];
  console.log("Sorting with N = ", arraySizes[n]);

  for (let i = 0; i < arraySizes[n]; i++) {
    randomNumberArr.push(Math.floor(Math.random() * 100));
  }

  let insertionTotal = 0;
  let insertionAverage = 0;

  for (let r = 1; r <= runs; r++) {
    timestart = performance.now();
    console.log("r = ", r, "starting at", timestart);
    insertionSort(randomNumberArr);
    runtime = performance.now() - timestart;
    insertionTotal += runtime;
  }

  console.log("Current total: " + insertionTotal);
  insertionAverage = insertionTotal / runs;
  data =
    "INSERTION SORT: Size " +
    String(n) +
    ", Average Runtime: " +
    String(insertionAverage) +
    "\n";
  console.log(data);
  fs.appendFile("sortingAlgRuntimes.csv", data, (err) => {
    if (err) throw err;
  });
}

for (let n = 0; n <= arraySizes.length; n++) {
  //Declare empty array and fill with random numbers according to n array size
  const randomNumberArr = [];
  console.log("Sorting with N = ", arraySizes[n]);
  for (let i = 0; i < arraySizes[n]; i++) {
    randomNumberArr.push(Math.floor(Math.random() * 100));
  }

  let mergeTotal = 0;
  let mergeAverage = 0;
  for (let r = 1; r <= runs; r++) {
    timestart = performance.now();
    console.log("r = ", r, "starting at", timestart);
    mergeSort(randomNumberArr);
    runtime = performance.now() - timestart;
    mergeTotal += runtime;
  }
  console.log("Current total: " + mergeTotal);
  mergeAverage = mergeTotal / runs;
  data =
    "MERGE SORT: Size " +
    String(arraySizes[n]) +
    ", Average Runtime: " +
    String(mergeAverage) +
    "\n";
  console.log(data);
  fs.appendFile("sortingAlgRuntimes.csv", data, (err) => {
    if (err) throw err;
  });
}
