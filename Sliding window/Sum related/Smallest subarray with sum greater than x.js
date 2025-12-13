// https://www.geeksforgeeks.org/minimum-length-subarray-sum-greater-given-value/

/*

Brute

O(n^2) & O(1)

*/

function smallestSubWithSum(x, arr) {
  let n = arr.length;
  let res = Infinity;

  // Pick every element as starting point
  for (let i = 0; i < n; i++) {
    let curr = 0;

    for (let j = i; j < n; j++) {
      curr += arr[j];

      if (curr > x) {
        res = Math.min(res, j - i + 1);
        break;
      }
    }
  }

  // Return 0 if answer does
  // not exists.
  if (res === Infinity) return 0;

  return res;
}

/*

Optimal

O(n) & O(1)

*/

class Solution {
  smallestSubWithSum(arr, x) {
    // code here
    const n = arr.length;
    let l = -1,
      curr = 0,
      best = n + 1;

    for (let r = 0; r < n; r++) {
      curr += arr[r];

      while (curr > x) {
        l += 1;
        best = Math.min(best, r - l + 1);
        curr -= arr[l];
      }
    }

    return best > n ? 0 : best;
  }
}
