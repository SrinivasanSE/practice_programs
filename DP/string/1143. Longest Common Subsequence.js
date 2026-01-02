// https://leetcode.com/problems/longest-common-subsequence/description/

/*

Recursion

O(2^n) & O(n)

*/

var longestCommonSubsequence = function (text1, text2) {
  const n1 = text1.length,
    n2 = text2.length;

  const findLength = (i1, i2) => {
    if (i1 === 0 || i2 === 0) return 0; // since we follow 1 based indexing, we should check for 0 instead of < 0

    if (text1[i1] === text2[i2]) {
      // if both the chars are same, we can move to the previous char
      return 1 + findLength(i1 - 1, i2 - 1);
    }

    return Math.max(findLength(i1 - 1, i2), findLength(i1, i2 - 1)); // if the chars are not same, we need to move s1 and not move s2 and not move s1 and move s2 to not miss any chars, for ex: s1 = ec and s2 = ce
  };

  return findLength(n1, n2); // start with n1 and n2, we consider 1 based indexing
};

/*

Memo

O(n1*n2) & O(n1 + n2) + O(n1*n2)

*/

var longestCommonSubsequence = function (text1, text2) {
  const n1 = text1.length,
    n2 = text2.length;

  const dp = Array.from({ length: n1 }, () => new Array(n2 + 1).fill(-1));

  const findLength = (i1, i2) => {
    if (i1 < 0 || i2 < 0) return 0;

    if (dp[i1][i2] != -1) return dp[i1][i2];

    if (text1[i1] === text2[i2]) {
      return (dp[i1][i2] = 1 + findLength(i1 - 1, i2 - 1));
    }

    return (dp[i1][i2] = Math.max(
      findLength(i1 - 1, i2),
      findLength(i1, i2 - 1)
    ));
  };

  return findLength(n1 - 1, n2 - 1);
};

/*

Tabulation

O(n1*n2) & O(n1*n2)

*/

var longestCommonSubsequence = function (text1, text2) {
  const n1 = text1.length,
    n2 = text2.length;

  const dp = Array.from({ length: n1 + 1 }, () => new Array(n2 + 1).fill(0));

  for (let i1 = 1; i1 <= n1; i1++) {
    // start from 1, we consider 1 based indexing
    for (let i2 = 1; i2 <= n2; i2++) {
      // start from 1
      if (text1[i1 - 1] === text2[i2 - 1]) {
        dp[i1][i2] = 1 + dp[i1 - 1][i2 - 1];
      } else {
        dp[i1][i2] = Math.max(dp[i1 - 1][i2], dp[i1][i2 - 1]);
      }
    }
  }
  return dp[n1][n2]; // dp[i][j] = LCS length between str1[0..i-1] and str2[0..j-1]
};

/*

Space ops

O(n1*n2) & O(2*n2)

*/

var longestCommonSubsequence = function (text1, text2) {
  const n1 = text1.length,
    n2 = text2.length;

  let prev = new Array(n2 + 1).fill(0),
    curr = new Array(n2 + 1).fill(0);

  for (let i1 = 1; i1 <= n1; i1++) {
    curr = new Array(n2 + 1).fill(0);
    for (let i2 = 1; i2 <= n2; i2++) {
      if (text1[i1 - 1] === text2[i2 - 1]) {
        curr[i2] = 1 + prev[i2 - 1];
      } else {
        curr[i2] = Math.max(prev[i2], curr[i2 - 1]);
      }
    }
    prev = curr;
  }
  return prev[n2];
};

/*

Space ops - one arr

O(n1*n2) & O(n2)

*/


// further optimised, curr arr not needed

var longestCommonSubsequence = function (text1, text2) {
  const n1 = text1.length,
    n2 = text2.length;
  let dp = new Array(n2 + 1).fill(0);
  let prev, temp;
  for (let i = 1; i <= n1; i++) {
    prev = 0;
    for (let j = 1; j <= n2; j++) {
      temp = dp[j];
      if (text1[i - 1] === text2[j - 1]) {
        dp[j] = 1 + prev;
      } else {
        dp[j] = Math.max(dp[j], dp[j - 1]);
      }
      prev = temp;
    }
  }
  return dp[n2];
};
