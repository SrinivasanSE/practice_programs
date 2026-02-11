// https://www.geeksforgeeks.org/problems/good-pairs4519/1?page=2&category=Searching&difficulty=Easy&sortBy=submissions

/*

Find count of numbers greater than current number

*/

function lowerBound(arr, n, target) {
  let l = 0;
  let r = n - 1;

  while (l <= r) {
    const mid = l + Math.floor((r - l) / 2);

    if (arr[mid] <= target) {
      l = mid + 1;
    } else {
      r = mid - 1;
    }
  }

  return n - l; // since after l index, all the elements will be greater than target
}
function solve(arr, n) {
  // Complete this function
  let count = 0;
  arr.sort((a, b) => a - b);
  for (let i = 0; i < n; i++) {
    count += lowerBound(arr, n, arr[i]);
  }

  return count;
}
