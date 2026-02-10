// https://leetcode.com/problems/find-a-peak-element-ii/description/

/*
Brute
O(n*m) & O(1)
*/

var findPeakGrid = function (mat) {
  const m = mat.length;
  const n = mat[0].length;
  let isPeak;
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      isPeak = true;

      if (j > 0 && mat[i][j] < mat[i][j - 1]) {
        isPeak = false;
      }

      if (j < n - 1 && mat[i][j] < mat[i][j + 1]) {
        isPeak = false;
      }

      if (i > 0 && mat[i][j] < mat[i - 1][j]) {
        isPeak = false;
      }

      if (i < m - 1 && mat[i][j] < mat[i + 1][j]) {
        isPeak = false;
      }

      if (isPeak) {
        return [i, j];
      }
    }
  }
};

/*
Optimal
O(nlogm) & O(1)

*/

// doing binary search on col and max element in row

var findMaxElementIndex = (arr, n, col) => {
  let maxRow = 0;
  for (let i = 1; i < n; i++) {
    if (arr[maxRow][col] < arr[i][col]) {
      maxRow = i;
    }
  }
  return maxRow;
};
var findPeakGrid = function (mat) {
  let n = mat.length;
  let m = mat[0].length;

  let l = 0,
    r = m - 1;

  while (l <= r) {
    const mid = l + Math.floor((r - l) / 2);
    const maxRow = findMaxElementIndex(mat, n, mid);
    const current = mat[maxRow][mid];
    const leftVal = mid - 1 >= 0 ? mat[maxRow][mid - 1] : -1;
    const rightVal = mid < m - 1 ? mat[maxRow][mid + 1] : -1;
    if (leftVal < current && rightVal < current) {
      return [maxRow, mid];
    }

    if (current < rightVal) {
      l = mid + 1;
    } else {
      r = mid - 1;
    }
  }

  return [-1, -1];
};

// doing binary search on rol and max element in col

var findMaxElementIndex = (arr, col, row) => {
  let maxCol = 0;
  for (let i = 1; i < col; i++) {
    if (arr[row][maxCol] < arr[row][i]) {
      maxCol = i;
    }
  }
  return maxCol;
};
var findPeakGrid = function (mat) {
  let n = mat.length;
  let m = mat[0].length;

  let l = 0,
    r = n - 1;

  while (l <= r) {
    const mid = l + Math.floor((r - l) / 2);
    const maxCol = findMaxElementIndex(mat, m, mid);
    const current = mat[mid][maxCol];
    const topVal = mid - 1 >= 0 ? mat[mid - 1][maxCol] : -1;
    const bottomVal = mid < n - 1 ? mat[mid + 1][maxCol] : -1;
    console.log(topVal, current, bottomVal);
    if (topVal < current && bottomVal < current) {
      return [mid, maxCol];
    }

    if (current < bottomVal) {
      l = mid + 1;
    } else {
      r = mid - 1;
    }
  }

  return [-1, -1];
};
