// https://www.geeksforgeeks.org/finding-nearest-shortest-tower-in-array/

// Similar to Largest Rectangle in Histogram

/*

Brute

O(N^2) & O(1)

*/

function getSmaller(arr) {
  const n = arr.length;
  const res = new Array(n).fill(-1);

  for (let i = 0; i < n; i++) {
    let ind = -1;
    let minDist = Infinity;

    for (let j = 0; j < n; j++) {
      if (arr[j] < arr[i]) {
        const dist = Math.abs(i - j);
        if (dist < minDist) {
          minDist = dist;
          ind = j;
        } else if (dist === minDist) {
          if (arr[j] < arr[ind] || (arr[j] === arr[ind] && j < ind)) {
            ind = j;
          }
        }
      }
    }
    res[i] = ind;
  }

  return res;
}

/*

Optimal

O(n) & O(n)

*/

class Solution {
  // Previous Smaller Element (to the left)
  getPSE(arr) {
    const n = arr.length;
    const left = new Array(n).fill(-1);
    const stk = [];

    for (let i = 0; i < n; i++) {
      while (stk.length && arr[stk.at(-1)] >= arr[i]) {
        stk.pop();
      }
      if (stk.length) left[i] = stk.at(-1);
      stk.push(i);
    }
    return left;
  }

  // Next Smaller Element (to the right)
  getNSE(arr) {
    const n = arr.length;
    const right = new Array(n).fill(-1);
    const stk = [];

    for (let i = n - 1; i >= 0; i--) {
      while (stk.length && arr[stk.at(-1)] >= arr[i]) {
        stk.pop();
      }
      if (stk.length) right[i] = stk.at(-1);
      stk.push(i);
    }
    return right;
  }

  nearestSmallestTower(arr) {
    const n = arr.length;

    const left = this.getPSE(arr);
    const right = this.getNSE(arr);

    const res = Array(n);

    for (let i = 0; i < n; i++) {
      const L = left[i];
      const R = right[i];

      if (L === -1 && R === -1) {
        res[i] = -1;
        continue;
      }

      if (L === -1) {
        res[i] = R;
        continue;
      }

      if (R === -1) {
        res[i] = L;
        continue;
      }

      const dL = i - L;
      const dR = R - i;

      // choose nearest distance
      if (dL < dR) {
        res[i] = L;
      } else if (dR < dL) {
        res[i] = R;
      } else {
        // equal distance → choose smaller height → if equal → smaller index
        if (arr[L] < arr[R]) res[i] = L;
        else if (arr[R] < arr[L]) res[i] = R;
        else res[i] = Math.min(L, R);
      }
    }

    return res;
  }
}
