// https://leetcode.com/problems/unique-paths/description/

// Check the formula approach

/*

Recursion

O(2^(m*n)) & O(m - 1 + n - 1)

*/

var uniquePaths = function (m, n) {
  const findPaths = (i, j) => {
    if (i === 0 && j === 0) {
      return 1;
    }

    if (i < 0 || j < 0) return 0;
    let left = findPaths(i, j - 1);
    let up = findPaths(i - 1, j);
    return left + up;
  };

  return findPaths(m - 1, n - 1);
};

/*

Memoization

O(n*m) & O((N-1)+(M-1)) + O(M*N)

*/

var uniquePaths = function (m, n) {
  const dp = Array.from({ length: m }, () => new Array(n).fill(-1));

  const findPaths = (i, j) => {
    if (i === 0 && j === 0) {
      return 1;
    }

    if (i < 0 || j < 0) return 0;
    if (dp[i][j] != -1) return dp[i][j];
    let left = findPaths(i, j - 1);
    let up = findPaths(i - 1, j);
    return (dp[i][j] = left + up);
  };

  return findPaths(m - 1, n - 1);
};

/*

Tabulation

O(n*m) & O(n*m)

*/

var uniquePaths = function (m, n) {
  const dp = Array.from({ length: m }, () => new Array(n).fill(-1));
  dp[0][0] = 1;
  let up, left;
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (i === 0 && j === 0) continue;
      up = 0;
      if (i > 0) up = dp[i - 1][j];
      left = 0;
      if (j > 0) left = dp[i][j - 1];

      dp[i][j] = up + left;
    }
  }

  return dp[m - 1][n - 1];
};

/*

Space optimization

O(n*m) & O(n)

*/

var uniquePaths = function (m, n) {
  /*
      dp[j] represents:
      Number of unique paths to reach column j
      in the CURRENT row.

      Initially, for the first row (i = 0),
      there is only 1 way to reach any cell
      (only moving right).
    */
  const dp = new Array(n).fill(1);

  let up, left;

  // Iterate through each row
  for (let i = 0; i < m; i++) {
    // Iterate through each column
    for (let j = 0; j < n; j++) {
      // Starting cell (0,0) already has 1 path
      // so we skip recomputation
      if (i == 0 && j == 0) {
        continue;
      }

      /*
              up represents paths coming from the cell above:
              (i - 1, j)

              dp[j] STILL holds the value from the previous row,
              because dp[j] has not been updated yet in this row.
            */
      up = 0;
      if (i - 1 >= 0) up = dp[j];

      /*
              left represents paths coming from the cell to the left:
              (i, j - 1)

              dp[j - 1] has already been updated in the current row,
              so it correctly represents the left cell.
            */
      left = 0;
      if (j - 1 >= 0) left = dp[j - 1];

      /*
              Total paths to current cell =
              paths from up + paths from left
            */
      dp[j] = up + left;
    }
  }

  /*
      dp[n - 1] contains the number of unique paths
      to reach the bottom-right corner (m - 1, n - 1)
    */
  return dp[n - 1];
};
