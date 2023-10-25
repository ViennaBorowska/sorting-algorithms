//IMPORTS
const fs = require("fs");
const { performance } = require("perf_hooks");

// WRITING DATA TO FILE
// delete output csv file if exists
// if (fs.existsSync("sortingAlgRuntimes.csv"))
//   fs.unlinkSync("sortingAlgRuntimes.csv");
// // create and write a header to the output csv file
// fs.appendFile(
//   "sortingAlgRuntimes.csv",
//   "Sort Type, N, Average Runtime, Sort Type, N, Average Runtime, Sort Type, N, Average Runtime, Sort Type, N, Average Runtime\n",
//   (err) => {
//     if (err) throw err;
//   }
// );

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
    let min = i;

    for (let j = 0; j < arr.length; j++) {
      if (arr[min] > arr[j]) {
        min = j;
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
for (let n = 101000; n <= 200000; n = n + 1000) {
  console.log("Bubble Sorting with N = ", n);
  //Declare empty array and fill with random numbers according to n array size and print sort type and n to console
  const randomNumberArr = [];
  // console.log("Sorting with N = ", n);
  for (let i = 0; i < n; i++) {
    randomNumberArr.push(Math.floor(Math.random() * n));
  }

  //BUBBLE SORT CALLS & CALCULATIONS (commented for Bubble Sort and repeated for each sort algorithm.)
  //Bubble Sort variables to calculate average runtimes
  let bubbleTotal = 0;
  let bubbleAverage = 0;

  //Loop through runs to run each alrogithm 10 times on each array size - using the same array for all 10 runs with the spread method
  for (let r = 1; r <= runs; r++) {
    let randomNumberArrCopy = [...randomNumberArr];
    //Record start of each run and print to console
    let bubbleTimestart = performance.now();
    //Call Bubble Sort function
    bubbleSort(randomNumberArrCopy);
    //Calculate time of each run (time after function - time before function)
    bubbleRuntime = performance.now() - bubbleTimestart;
    //Add each runtime to total
    bubbleTotal += bubbleRuntime;
  }
  //Calculate average
  bubbleAverage = bubbleTotal / runs;
  //Store runtime data in variable and also print to console
  data = `BUBBLE SORT,${n}, ${bubbleAverage}\n`;
  fs.appendFile("sortingAlgRuntimes.csv", data, (err) => {
    if (err) throw err;
  });
}

//SELECTION SORT CALLS & CALCULATIONS
for (let n = 101000; n <= 200000; n = n + 1000) {
  const randomNumberArr = [];
  console.log("Selection Sorting with N = ", n);

  for (let i = 0; i < n; i++) {
    randomNumberArr.push(Math.floor(Math.random() * n));
  }

  let selectionTotal = 0;
  let selectionAverage = 0;

  for (let r = 1; r <= runs; r++) {
    let randomNumberArrCopy = [...randomNumberArr];
    timestart = performance.now();
    selectionSort(randomNumberArrCopy);
    runtime = performance.now() - timestart;
    selectionTotal += runtime;
  }

  selectionAverage = selectionTotal / runs;
  data = `SELECTION SORT, ${n}, ${selectionAverage}\n`;
  fs.appendFile("sortingAlgRuntimes.csv", data, (err) => {
    if (err) throw err;
  });
}

//INSERTION SORT CALLS & CALCULATIONS
for (let n = 101000; n <= 200000; n = n + 1000) {
  //Declare empty array and fill with random numbers according to n array size
  const randomNumberArr = [];
  console.log("Insertion Sorting with N = ", n);

  for (let i = 0; i < n; i++) {
    randomNumberArr.push(Math.floor(Math.random() * n));
  }

  let insertionTotal = 0;
  let insertionAverage = 0;

  for (let r = 1; r <= runs; r++) {
    let randomNumberArrCopy = [...randomNumberArr];
    timestart = performance.now();
    insertionSort(randomNumberArrCopy);
    runtime = performance.now() - timestart;
    insertionTotal += runtime;
  }

  insertionAverage = insertionTotal / runs;
  data = `INSERTION SORT, ${n}, ${insertionAverage}\n`;

  fs.appendFile("sortingAlgRuntimes.csv", data, (err) => {
    if (err) throw err;
  });
}

//MERGE SORT CALLS & CALCULATIONS
for (let n = 101000; n <= 200000; n = n + 1000) {
  const randomNumberArr = [];
  console.log("Merge Sorting with N = ", n);
  for (let i = 0; i < n; i++) {
    randomNumberArr.push(Math.floor(Math.random() * n));
  }

  let mergeTotal = 0;
  let mergeAverage = 0;
  for (let r = 1; r <= runs; r++) {
    let randomNumberArrCopy = [...randomNumberArr];
    timestart = performance.now();
    mergeSort(randomNumberArrCopy);
    runtime = performance.now() - timestart;
    mergeTotal += runtime;
  }

  mergeAverage = mergeTotal / runs;
  data = `MERGE SORT, ${n}, ${mergeAverage}\n`;

  fs.appendFile("sortingAlgRuntimes.csv", data, (err) => {
    if (err) throw err;
  });

  console.log("Algorithm runs complete!");
}
