// https://leetcode.com/problems/minimum-falling-path-sum/description/

/*

Recursion

O(3^n) & O(n)

*/

var minFallingPathSum = function (matrix) {
  const n = matrix.length;

  const find = (i, j) => {
    if (j < 0 || j >= n) return 1e9;

    if (i == 0) return matrix[i][j];

    const up = find(i - 1, j);
    const upLeft = find(i - 1, j - 1);
    const upRight = find(i - 1, j + 1);

    return Math.min(up, upLeft, upRight) + matrix[i][j];
  };

  let min = Number.MAX_SAFE_INTEGER;
  for (let j = 0; j < n; j++) {
    min = Math.min(min, find(n - 1, j));
  }
  return min;
};

/*

Memo

O(N*M) & O(N*M) + O(N)

*/

var minFallingPathSum = function (matrix) {
  const n = matrix.length;
  const dp = Array.from({ length: n }, () => new Array(n).fill(null));
  const find = (i, j) => {
    if (j < 0 || j >= n) return 1e9;

    if (i == 0) return matrix[i][j];

    if (dp[i][j] != null) return dp[i][j];

    const up = find(i - 1, j);
    const upLeft = find(i - 1, j - 1);
    const upRight = find(i - 1, j + 1);

    return (dp[i][j] = Math.min(up, upLeft, upRight) + matrix[i][j]);
  };

  let min = Number.MAX_SAFE_INTEGER;
  for (let j = 0; j < n; j++) {
    min = Math.min(min, find(n - 1, j));
  }
  return min;
};

/*

Tabulation

O(N*M) & O(N*M)

*/

var minFallingPathSum = function (matrix) {
  const n = matrix.length;
  const dp = Array.from({ length: n }, () => new Array(n).fill(0));

  for (let i = 0; i < n; i++) {
    dp[0][i] = matrix[0][i];
  }
  let up, upLeft, upRight;
  for (let i = 1; i < n; i++) {
    for (let j = 0; j < n; j++) {
      up = dp[i - 1][j];
      upLeft = 1e9;
      if (j > 0) {
        upLeft = dp[i - 1][j - 1];
      }
      upRight = 1e9;
      if (j + 1 < n) {
        upRight = dp[i - 1][j + 1];
      }
      dp[i][j] = Math.min(up, upLeft, upRight) + matrix[i][j];
    }
  }
  let min = Number.MAX_SAFE_INTEGER;
  for (let j = 0; j < n; j++) {
    min = Math.min(min, dp[n - 1][j]);
  }
  return min;
};

/*

Space ops

O(N*M) & O(N)

*/

var minFallingPathSum = function (matrix) {
  const n = matrix.length;
  let prev = new Array(n).fill(0);

  for (let i = 0; i < n; i++) {
    prev[i] = matrix[0][i];
  }
  let up, upLeft, upRight;
  for (let i = 1; i < n; i++) {
    let curr = new Array(n).fill(0);
    for (let j = 0; j < n; j++) {
      up = prev[j];
      upLeft = 1e9;
      if (j > 0) {
        upLeft = prev[j - 1];
      }
      upRight = 1e9;
      if (j + 1 < n) {
        upRight = prev[j + 1];
      }
      curr[j] = Math.min(up, upLeft, upRight) + matrix[i][j];
    }
    prev = curr;
  }

  return Math.min(...prev);
};
