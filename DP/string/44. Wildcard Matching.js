// https://leetcode.com/problems/wildcard-matching/description/

/*

Recursion

O(2^n) & O(n1 + n2)

*/

var isMatch = function (s, p) {
  const n1 = s.length,
    n2 = p.length;

  // recursive function that checks if first i chars of s match first j chars of p
  const isMatch = (i, j) => {
    // ✅ Base Case 1: Both strings are empty → match
    if (i === 0 && j === 0) return true;

    // ❌ Base Case 2: pattern empty but string not empty → no match
    if (j === 0) return false;

    // ✅ Base Case 3: string empty but pattern not empty
    // Only possible match if the remaining pattern characters are all '*'
    if (i === 0) {
      for (let k = 0; k < j; k++) {
        if (p[k] != "*") return false;
      }
      return true;
    }

    let flag = false;

    // 🎯 Case 1: Characters match or pattern has '?'
    // Then reduce both i and j
    if (s[i - 1] === p[j - 1] || p[j - 1] === "?") {
      flag = isMatch(i - 1, j - 1);
    }
    // ⭐ Case 2: Pattern character is '*'
    // '*' can match:
    //   → zero characters  → move j-1 (ignore '*')
    //   → one or more chars → move i-1 (consume one from s)
    else if (p[j - 1] === "*") {
      flag = isMatch(i - 1, j) || isMatch(i, j - 1);
    }

    // 💾 Store the result before returning
    return flag
  };

  // Start recursion with full lengths
  return isMatch(n1, n2);
};

/*

Memo

O(n1*n2) & O(n1 + n2) + O(n1*n2)

*/

var isMatch = function (s, p) {
  const n1 = s.length,
    n2 = p.length;

  // dp[i][j] will store whether s[0..i-1] matches p[0..j-1]
  // initialized to -1 (uncomputed)
  const dp = Array.from({ length: n1 + 1 }, () => new Array(n2 + 1).fill(-1));

  // recursive function that checks if first i chars of s match first j chars of p
  const isMatch = (i, j) => {
    // ✅ Base Case 1: Both strings are empty → match
    if (i === 0 && j === 0) return true;

    // ❌ Base Case 2: pattern empty but string not empty → no match
    if (i > 0 && j === 0) return false;

    // ✅ Base Case 3: string empty but pattern not empty
    // Only possible match if the remaining pattern characters are all '*'
    if (j > 0 && i === 0) {
      for (let k = 0; k < j; k++) {
        if (p[k] != "*") return false;
      }
      return true;
    }

    // 🧠 Memoization: if already computed, return stored result
    if (dp[i][j] != -1) return dp[i][j];

    let flag = false;

    // 🎯 Case 1: Characters match or pattern has '?'
    // Then reduce both i and j
    if (s[i - 1] === p[j - 1] || p[j - 1] === "?") {
      flag = isMatch(i - 1, j - 1);
    }
    // ⭐ Case 2: Pattern character is '*'
    // '*' can match:
    //   → zero characters  → move j-1 (ignore '*')
    //   → one or more chars → move i-1 (consume one from s)
    else if (p[j - 1] === "*") {
      flag = isMatch(i - 1, j) || isMatch(i, j - 1);
    }

    // 💾 Store the result before returning
    return (dp[i][j] = flag);
  };

  // Start recursion with full lengths
  return isMatch(n1, n2);
};

/*

Tabulation

O(n1*n2) & O(n1*n2)

*/

var isMatch = function (s, p) {
  const n1 = s.length,
    n2 = p.length;

  // dp[i][j] = whether s[0..i-1] matches p[0..j-1]
  const dp = Array.from({ length: n1 + 1 }, () =>
    new Array(n2 + 1).fill(false)
  );

  // ✅ Empty string matches empty pattern
  dp[0][0] = true;

  // 🧱 Initialize first row:
  // An empty string can only match if all previous pattern chars are '*'
  for (let j = 1; j <= n2; j++) {
    dp[0][j] = dp[0][j - 1] && p[j - 1] === "*";
  }

  // 🧮 Fill DP table
  for (let i = 1; i <= n1; i++) {
    for (let j = 1; j <= n2; j++) {
      let flag = false;

      // 🎯 Exact match or '?'
      if (s[i - 1] === p[j - 1] || p[j - 1] === "?") {
        flag = dp[i - 1][j - 1];
      }
      // ⭐ '*' can match empty (dp[i][j-1]) or one char (dp[i-1][j])
      else if (p[j - 1] === "*") {
        flag = dp[i - 1][j] || dp[i][j - 1];
      }

      dp[i][j] = flag;
    }
  }

  // ✅ Final result: does full string match full pattern
  return dp[n1][n2];
};

/*

Space ops - 1

O(n1*n2) & O(n2) + O(n2)

*/

var isMatch = function (s, p) {
  const n1 = s.length,
    n2 = p.length;

  // prev → dp[i-1], curr → dp[i]
  let prev = new Array(n2 + 1).fill(false);
  let curr = new Array(n2 + 1).fill(false);

  // ✅ Empty string and empty pattern
  prev[0] = true;

  // 🧱 Initialize first row: empty string vs pattern
  for (let j = 1; j <= n2; j++) {
    prev[j] = prev[j - 1] && p[j - 1] === "*";
  }

  // 🧮 Build row by row
  for (let i = 1; i <= n1; i++) {
    // Empty pattern never matches non-empty string
    curr[0] = false;

    for (let j = 1; j <= n2; j++) {
      let flag = false;

      if (s[i - 1] === p[j - 1] || p[j - 1] === "?") {
        // exact match or '?'
        flag = prev[j - 1];
      } else if (p[j - 1] === "*") {
        // '*' matches empty (curr[j-1]) or consumes char (prev[j])
        flag = prev[j] || curr[j - 1];
      }

      curr[j] = flag;
    }

    // Move curr → prev for next iteration
    prev = [...curr];
  }

  // ✅ Final result
  return prev[n2];
};

/*

Space ops - 2

O(n1*n2) & O(n2) 

*/

var isMatch = function (s, p) {
  const n1 = s.length,
    n2 = p.length;
  let dp = new Array(n2 + 1).fill(false);
  dp[0] = true;

  // 🧱 Base: empty string vs pattern
  for (let j = 1; j <= n2; j++) {
    dp[j] = dp[j - 1] && p[j - 1] === "*";
  }

  // prev → dp[j-1] from previous row, temp → old dp[j] before overwrite
  let prev, temp;

  for (let i = 1; i <= n1; i++) {
    prev = dp[0]; // store previous diagonal
    dp[0] = false; // pattern empty can't match non-empty string dp[1][0] means string is not empty, but pattern is empty which is false

    for (let j = 1; j <= n2; j++) {
      temp = dp[j]; // store dp[i-1][j] before it gets overwritten, this will be used in the next iteration as prev, dp[j - 1]
      let flag = false;

      if (s[i - 1] === p[j - 1] || p[j - 1] === "?") {
        // match or '?': take diagonal
        flag = prev;
      } else if (p[j - 1] === "*") {
        // '*' = dp[i][j-1] (same row left) OR dp[i-1][j] (above)
        flag = dp[j] || dp[j - 1];
      }

      dp[j] = flag;
      prev = temp;
    }
  }

  return dp[n2];
};
