// https://leetcode.com/problems/cherry-pickup-ii/description/

/*

Recursion

O(9^rows) & O(rows)

*/

var cherryPickup = function (grid) {
  const rows = grid.length;
  const cols = grid[0].length;

  const countOfCherries = (i, j1, j2) => {
    // the robots move together and go to next row together, so i will be same for both
    if (j1 < 0 || j1 > cols - 1 || j2 < 0 || j2 > cols - 1) return -1e9;

    if (i === rows - 1) {
      let value = 0;
      if (j1 === j2) {
        // both robots are in the same position, so we consider only one time
        value += grid[i][j1];
      } else {
        value += grid[i][j1] + grid[i][j2];
      }

      return value;
    }

    let value = 0;
    let maxValue = Number.MIN_SAFE_INTEGER;
    for (let d1 = -1; d1 <= 1; d1++) {
      // for every move of robot1, robot2 can move in 3 ways, so total 9 ways
      for (let d2 = -1; d2 <= 1; d2++) {
        value = 0;
        if (j1 === j2) {
          value += grid[i][j1];
        } else {
          value += grid[i][j1] + grid[i][j2];
        }

        value += countOfCherries(i + 1, j1 + d1, j2 + d2);
        maxValue = Math.max(maxValue, value);
      }
    }

    return maxValue;
  };

  return countOfCherries(0, 0, cols - 1);
};

/*

Memoization

O(rows*cols*cols) & O(rows) + O(rows*cols*cols)

*/

var cherryPickup = function (grid) {
  const rows = grid.length;
  const cols = grid[0].length;

  const dp = Array.from({ length: rows }, () =>
    Array.from({ length: cols }, () => Array.from({ length: cols }, () => -1))
  );

  const countOfCherries = (i, j1, j2) => {
    if (j1 < 0 || j1 > cols - 1 || j2 < 0 || j2 > cols - 1) return -1e9;

    if (i === rows - 1) {
      let value = 0;
      if (j1 === j2) {
        value += grid[i][j1];
      } else {
        value += grid[i][j1] + grid[i][j2];
      }

      return value;
    }

    if (dp[i][j1][j2] != -1) return dp[i][j1][j2];
    let value = 0;
    let maxValue = Number.MIN_SAFE_INTEGER;
    for (let d1 = -1; d1 <= 1; d1++) {
      for (let d2 = -1; d2 <= 1; d2++) {
        value = 0;
        if (j1 === j2) {
          value += grid[i][j1];
        } else {
          value += grid[i][j1] + grid[i][j2];
        }

        value += countOfCherries(i + 1, j1 + d1, j2 + d2);
        maxValue = Math.max(maxValue, value);
      }
    }

    return (dp[i][j1][j2] = maxValue);
  };

  return countOfCherries(0, 0, cols - 1);
};

/*

Tabulation

O(rows*cols*cols) &  O(rows*cols*cols)

*/

var cherryPickup = function (grid) {
  const rows = grid.length;
  const cols = grid[0].length;

  const dp = Array.from({ length: rows }, () =>
    Array.from({ length: cols }, () => Array.from({ length: cols }))
  );

  for (let j1 = 0; j1 < cols; j1++) {
    // we assign the last rows value to the dp array based on the logic
    for (let j2 = 0; j2 < cols; j2++) {
      if (j1 === j2) {
        dp[rows - 1][j1][j2] = grid[rows - 1][j1];
      } else {
        dp[rows - 1][j1][j2] = grid[rows - 1][j1] + grid[rows - 1][j2];
      }
    }
  }
  for (let i = rows - 2; i >= 0; i--) {
    for (let j1 = 0; j1 < cols; j1++) {
      for (let j2 = 0; j2 < cols; j2++) {
        let maxValue = -1e9;
        for (let d1 = -1; d1 <= 1; d1++) {
          for (let d2 = -1; d2 <= 1; d2++) {
            let value = 0;
            if (j1 === j2) {
              value += grid[i][j1];
            } else {
              value += grid[i][j1] + grid[i][j2];
            }
            if (
              j1 + d1 >= 0 &&
              j1 + d1 < cols &&
              j2 + d2 >= 0 &&
              j2 + d2 < cols
            ) {
              // if not out of bounds, consider
              value += dp[i + 1][j1 + d1][j2 + d2];
            } else value += -1e9;
            maxValue = Math.max(maxValue, value);
          }
        }

        dp[i][j1][j2] = maxValue;
      }
    }
  }

  return dp[0][0][cols - 1];
};

/*

Space Optimisation

O(rows*cols*cols) & O(rows*cols)

*/

var cherryPickup = function (grid) {
  const rows = grid.length;
  const cols = grid[0].length;

  let front = Array.from({ length: cols }, () => Array.from({ length: cols }));

  for (let j1 = 0; j1 < cols; j1++) {
    for (let j2 = 0; j2 < cols; j2++) {
      if (j1 === j2) {
        front[j1][j2] = grid[rows - 1][j1];
      } else {
        front[j1][j2] = grid[rows - 1][j1] + grid[rows - 1][j2];
      }
    }
  }
  for (let i = rows - 2; i >= 0; i--) {
    let curr = Array.from({ length: cols }, () => Array.from({ length: cols }));
    for (let j1 = 0; j1 < cols; j1++) {
      for (let j2 = 0; j2 < cols; j2++) {
        let maxValue = -1e9;
        for (let d1 = -1; d1 <= 1; d1++) {
          for (let d2 = -1; d2 <= 1; d2++) {
            let value = 0;
            if (j1 === j2) {
              value += grid[i][j1];
            } else {
              value += grid[i][j1] + grid[i][j2];
            }
            if (
              j1 + d1 >= 0 &&
              j1 + d1 < cols &&
              j2 + d2 >= 0 &&
              j2 + d2 < cols
            ) {
              value += front[j1 + d1][j2 + d2];
            } else value += -1e9;
            maxValue = Math.max(maxValue, value);
          }
        }

        curr[j1][j2] = maxValue;
      }
    }
    front = curr;
  }

  return front[0][cols - 1];
};
