// https://www.geeksforgeeks.org/first-negative-integer-every-window-size-k/

/*

Better

O(n^2) & O(k)

*/

class Solution {
  firstNegInt(arr, k) {
    // write code here
    const n = arr.length;

    let q = [];
    let res = [];

    for (let i = 0; i < n; i++) {
      if (arr[i] < 0) {
        q.push(i);
      }

      if (q[0] <= i - k) {
        q.shift();
      }

      if (i >= k - 1) {
        if (q.length === 0) {
          res.push(0);
        } else {
          res.push(arr[q[0]]);
        }
      }
    }
    return res;
  }
}

/*

Optimal

O(n) & O(1)

*/

class Solution {
  firstNegInt(arr, k) {
    // write code here
    const n = arr.length;

    let negI = 0;
    let res = [];

    for (let i = k - 1; i < n; i++) { // start from k - 1
      while (negI < i && (negI <= i - k || arr[negI] >= 0)) { // keep moving negative index when the index it's out of the window or positive
        negI++;
      }

      if (negI < n && arr[negI] < 0) { // if the current index is within n and the element is negative, push it.
        res.push(arr[negI]);
      } else {
        res.push(0);
      }
    }
    return res;
  }
}
