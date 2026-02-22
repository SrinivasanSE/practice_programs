// https://www.geeksforgeeks.org/find-maximum-difference-between-nearest-left-and-right-smaller-elements/

// Similar to Largest Rectangle in Histogram logic

class Solution {
  // Previous Smaller Element (PSE)
  getPSE(arr) {
    const n = arr.length;
    const left = new Array(n).fill(0); // default 0 if none exists
    const stk = [];

    for (let i = 0; i < n; i++) {
      while (stk.length && arr[stk.at(-1)] >= arr[i]) {
        stk.pop();
      }
      left[i] = stk.length ? arr[stk.at(-1)] : 0;
      stk.push(i);
    }

    return left;
  }

  // Next Smaller Element (NSE)
  getNSE(arr) {
    const n = arr.length;
    const right = new Array(n).fill(0);
    const stk = [];

    for (let i = n - 1; i >= 0; i--) {
      while (stk.length && arr[stk.at(-1)] >= arr[i]) {
        stk.pop();
      }
      right[i] = stk.length ? arr[stk.at(-1)] : 0;
      stk.push(i);
    }

    return right;
  }

  findMaxDiff(arr) {
    const n = arr.length;

    const left = this.getPSE(arr); // LS – previous smaller
    const right = this.getNSE(arr); // RS – next smaller

    let max = -1;

    for (let i = 0; i < n; i++) {
      const diff = Math.abs(left[i] - right[i]);
      max = Math.max(max, diff);
    }

    return max;
  }
}

/*

Optimal

O(n) & O(n)

*/

function findMaxDiff(arr) {
  const n = arr.length;
  const stk = [];
  let mxDiff = 0;

  let  L, R;

  for (let i = 0; i <= n; i++) {
    // flush while
    while (stk.length > 0 && (i === n || arr[stk[stk.length - 1]] > arr[i])) {
      stk.pop();

      // NSE (right smaller)
      R = i === n ? 0 : arr[i];

      // PSE (left smaller)
      L = stk.length === 0 ? 0 : arr[stk[stk.length - 1]];

      mxDiff = Math.max(mxDiff, Math.abs(R - L));
    }

    // do NOT push the sentinel 'n'
    if (i < n) {
      // avoid consecutive duplicates, there is no need as all of them will give the same result only
      if (stk.length === 0 || arr[stk[stk.length - 1]] !== arr[i]) {
        stk.push(i);
      }
    }
  }

  return mxDiff;
}
