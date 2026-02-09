/*
https://www.geeksforgeeks.org/floor-in-a-sorted-array/?ref=lbp
https://www.geeksforgeeks.org/ceiling-in-a-sorted-array/?ref=lbp
https://www.geeksforgeeks.org/find-floor-ceil-unsorted-array/
*/

// Floor - largest element in the array smaller than or equal to x.

function findFloorBs(arr, x) {
  // your code here
  const n = arr.length;
  let l = 0;
  let r = n - 1;

  let ans = -1;

  while (l <= r) {
    let mid = l + Math.floor((r - l) / 2);

    if (arr[mid] <= x) {
      ans = mid;
      l = mid + 1;
    } else {
      r = mid - 1;
    }
  }

  return ans;
}

// Ceil - smallest element in array that is greater than or equal to x

class Solution {
  // Similar to lower bound
  findCeil(arr, x) {
    // code here
    const n = arr.length;
    let l = 0;
    let r = n - 1;

    let ans = -1;

    while (l <= r) {
      let mid = l + Math.floor((r - l) / 2);

      if (x <= arr[mid]) {
        ans = mid;
        r = mid - 1;
      } else {
        l = mid + 1;
      }
    }

    return ans;
  }
}
