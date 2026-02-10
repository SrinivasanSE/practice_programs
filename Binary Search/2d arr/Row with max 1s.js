// https://www.geeksforgeeks.org/problems/maximum-no-of-1s-row3027/1?page=2&category=Searching&difficulty=Easy&sortBy=submissions
// https://www.geeksforgeeks.org/find-the-row-with-maximum-number-1s/
// https://www.geeksforgeeks.org/problems/row-with-max-1s0023/1

/*
Brute
O(N*M) & O(1)
*/

class Solution {
  rowWithMax1s(arr) {
    // code here
    let maxCount = -1;
    let res = 0;
    const n = arr.length;
    const m = arr[0].length;

    for (let i = 0; i < n; i++) {
      let count = 0;
      for (let j = 0; j < m; j++) {
        if (arr[i][j] === 1) {
          count++;
        }
      }
      if (count > maxCount) {
        maxCount = count;
        res = i;
      }
    }

    return res;
  }
}

/*
Better - Binary
O(n*log(m)) & O(1)
*/

class Solution {
  // binary search to find first occurrence of 1
  findCount(arr, l, r) {
    const n = arr.length;
    let firstOne = -1;

    while (l <= r) {
      const mid = l + Math.floor((r - l) / 2);

      if (arr[mid] === 1) {
        firstOne = mid;
        r = mid - 1; // keep going left to find first 1
      } else {
        l = mid + 1;
      }
    }

    if (firstOne === -1) return 0; // no 1s in this row
    return n - firstOne; // number of 1s = total length - first index of 1
  }

  maxOnes(mat, n, m) {
    let maxCount = -1;
    let res = -1;

    for (let i = 0; i < n; i++) {
      const count = this.findCount(mat[i], 0, m - 1);
      if (count > maxCount) {
        maxCount = count;
        res = i;
      }
    }

    return res;
  }
}

/*
Optimal
O(M + N) & O(1)
*/

function maxOnes(mat, n, m) {
  let maxCount = -1;
  let r = 0;
  let c = m - 1;

  while (r < n && c >= 0) {
    if (mat[r][c] === 0) {
      // we are checking intially the last column at row 0, if it's 0, that means there are no 1s left anyway once we reach the 0, so we move to the next row
      r++;
    } else {
      maxCount = r;
      c--;
    }
  }

  return maxCount;
}
