export function copyArray(array) {
    //deep copy array of arrays
    //iterate board for cell state
    const copy = [];
    const [rows, cols] = [array.length, array[0].length];
    //rows iterate i
    copy.length = rows;
    for (let i = 0; i < rows; i++) {
    //cols w/ ref [row]
      copy[i] = [];
      copy[i].length = cols;
      for (let j = 0; j < cols; j++) {
      //board started paused cur state
        copy[i][j] = array[i][j];
      }
    }
    return copy;
  }

export function arrIsFalsy(arr) {
    //checks if there are no true values in nested arrays
    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < arr.length; j++) {
        if (arr[i][j]) return false;
      }
    }
    return true;
  }
  

export function makeFalsyArray(rows, cols) {
    //nested arrays of false values
    const arr = [];
    arr.length = rows;
    for (let i = 0; i < rows; i++) {
      arr[i] = [];
      arr[i].length = cols;
      for (let j = 0; j < cols; j++) {
        arr[i][j] = false;
      }
    }
    return arr;
  }

  export function validateNumber(num) { // 101>num>0
    if (!Number(num)) return false;
    num = Math.round(Number(num));
    return Math.max(Math.min(Number(num), 100), 1);
  }


