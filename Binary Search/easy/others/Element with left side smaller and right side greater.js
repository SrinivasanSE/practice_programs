// https://www.geeksforgeeks.org/find-the-element-before-which-all-the-elements-are-smaller-than-it-and-after-which-all-are-greater-than-it/

/*

Brute

O(n^2) & O(1)

*/

class Solution {
  findElement(arr) {
    const n = arr.length;

    for (let i = 1; i < n - 1; i++) {
      let left = true;
      let right = true;
      for (let j = 0; j < n; j++) {
        if (j < i) {
          if (arr[j] >= arr[i]) {
            left = false;
            break;
          }
        } else if (i < j) {
          if (arr[i] >= arr[j]) {
            right = false;
            break;
          }
        }
      }

      if (left && right) {
        return arr[i];
      }
    }

    return -1;
  }
}

/*

Optimal

O(n) & O(n)

*/

class Solution {
  findElement(arr) {
    // code here
    const n = arr.length;

    const leftMax = new Array(n).fill(0);

    leftMax[0] = Number.MIN_SAFE_INTEGER;

    for (let i = 1; i < n; i++) {
      leftMax[i] = Math.max(leftMax[i - 1], arr[i - 1]);
    }

    let rightMin = arr[n - 1];

    for (let i = n - 2; i > 0; i--) {
      if (arr[i] > leftMax[i] && arr[i] < rightMin) {
        return arr[i];
      }

      rightMin = Math.min(rightMin, arr[i]);
    }

    return -1;
  }
}
