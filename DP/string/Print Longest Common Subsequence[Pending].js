// https://www.geeksforgeeks.org/problems/print-all-lcs-sequences3413/1

// TODO: Explore how to print all the lcs strings

// This code uses 1143. code and using the 2d dp table, we can find the lcs string, but it's only printing any one. There could be multiple strings

var longestCommonSubsequence = function (text1, text2) {
  const n1 = text1.length,
    n2 = text2.length;

  const dp = Array.from({ length: n1 + 1 }, () => new Array(n2 + 1).fill(0));

  for (let i1 = 1; i1 <= n1; i1++) {
    for (let i2 = 1; i2 <= n2; i2++) {
      if (text1[i1 - 1] === text2[i2 - 1]) {
        dp[i1][i2] = 1 + dp[i1 - 1][i2 - 1];
      } else {
        dp[i1][i2] = Math.max(dp[i1 - 1][i2], dp[i1][i2 - 1]);
      }
    }
  }

  let i = n1,
    j = n2,
    str = "";

  while (i > 0 && j > 0) {
    // we can use the same dp array and find the lcs
    if (text1[i - 1] === text2[j - 1]) {
      str = text1[i - 1] + str; // form in reverse and reverse at the end
      i--;
      j--;
    } else if (dp[i - 1][j] > dp[i][j - 1]) {
      // we would have got the max value from any of this two, else condition in the above code, we find which is max and move the index towards it
      i--;
    } else {
      j--;
    }
  }

  console.log(str);
};

// We can store the string directly in the dp table as well

var longestCommonSubsequence = function (s1, s2) {
  const m = s1.length,
    n = s2.length;

  const dp = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(""));

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (s1[i - 1] == s2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + s1[i - 1]; // we are adding s1 at the end to get the string in correct order
      } else {
        dp[i][j] =
          dp[i - 1][j].length > dp[i][j - 1].length
            ? dp[i - 1][j]
            : dp[i][j - 1];
      }
    }
  }

  return dp[m][n];
};
