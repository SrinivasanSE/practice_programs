// https://leetcode.com/problems/triangle/description/

/*

Recursion

O(2^(n*n)) & O(n)


*/

var minimumTotal = function (triangle) {
  const m = triangle.length;

  const findSum = (i, j) => {
    if (i === m - 1) {
      return triangle[i][j];
    }

    const down = findSum(i + 1, j); // move down
    const downRight = findSum(i + 1, j + 1); // move down, one index right

    return Math.min(down, downRight) + triangle[i][j];
  };

  return findSum(0, 0);
};

/*

Memoization

O(n*n) & O(n) + O(n*n)

*/

var minimumTotal = function (triangle) {
  const m = triangle.length;
  const dp = Array.from({ length: m }, () => new Array(m).fill(null));
  const findSum = (i, j) => {
    if (i === m - 1) {
      return triangle[i][j];
    }

    if (dp[i][j] != null) return dp[i][j];

    const down = findSum(i + 1, j);
    const downRight = findSum(i + 1, j + 1);

    return (dp[i][j] = Math.min(down, downRight) + triangle[i][j]);
  };

  return findSum(0, 0);
};

/*

Tabulation

O(n*n) & O(n*n)

*/

var minimumTotal = function (triangle) {
  const n = triangle.length;
  const dp = Array.from({ length: n }, () => new Array(n).fill(null));

  for (let i = 0; i < n; i++) {
    // start from bottom, fill the bottom row
    dp[n - 1][i] = triangle[n - 1][i];
  }
  let down, downRight;
  for (let i = n - 2; i >= 0; i--) {
    // skip the already filled row and start from n - 2 row
    for (let j = i; j >= 0; j--) { // can be from 0 to i as well
      // from curr row, we try to access next row, it will have i elements , so j starts from i. Ex: n = 4, i = 2, in the next row which is last row, 
      // there will be 3 elements, j goes from 2 to 0 and we do j + 1, so when j = 2, j = 3 also will be accessed

      down = dp[i + 1][j];
      downRight = dp[i + 1][j + 1];

      dp[i][j] = Math.min(down, downRight) + triangle[i][j];
    }
  }

  return dp[0][0];
};

/*

Space Optimisation

O(n*n) & O(2n)

*/

var minimumTotal = function (triangle) {
  const n = triangle.length;
  let next = new Array(n);

  for (let i = 0; i < n; i++) {
    next[i] = triangle[n - 1][i];
  }
  let down, downRight, temp;
  for (let i = n - 2; i >= 0; i--) {
    temp = new Array(n);
    for (let j = i; j >= 0; j--) {
      // can be from 0 to i as well
      down = next[j];
      downRight = next[j + 1];

      temp[j] = Math.min(down, downRight) + triangle[i][j];
    }
    next = temp;
  }

  return next[0];
};

/*

Space Optimisation - one single arr

O(n*n) & O(n)

*/

var minimumTotal = function (triangle) {
  const n = triangle.length;
  let dp = new Array(n).fill(0);

  for (let j = 0; j < n; j++) {
    dp[j] = triangle[n - 1][j];
  }

  for (let i = n - 2; i >= 0; i--) {
    for (let j = 0; j <= i; j++) {
      // if we go from 0, we can directly overwrite the same array since the same val is not needed after,
      // but if we go from j = i, for ex: j = 3, when j = 2, j + 1 which is 3 will be accessed which we already overwritten
      const down = dp[j];
      const downDia = dp[j + 1];

      dp[j] = Math.min(down, downDia) + triangle[i][j];
    }
  }

  return dp[0];
};
