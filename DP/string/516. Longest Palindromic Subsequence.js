// https://leetcode.com/problems/longest-palindromic-subsequence/description/

/*

We can reverse the string and we will have two strings now, s1 and s2,  then we can use the same logic as 1143.

*/

/*

Recursion

O(2^n) & O(n)

*/


var longestPalindromeSubseq = function(s) {
    const n = s.length 

    const findLength = (i, j) => {
        if (i > j) return 0
        if (i === j) return 1

        if (s[i] === s[j]) {
            return 2 + findLength(i + 1, j - 1) // we are adding 2 here consider the count of both
        }

        return Math.max(findLength(i + 1, j), findLength(i, j - 1))
    }

    return findLength(0, n - 1)
};


/*

Memo

O(n^2) & O(n) + O(n^2)

*/


var longestPalindromeSubseq = function(s) {
    const n = s.length 

    const dp = Array.from({length: n}, () => new Array(n).fill(-1))

    const findLength = (i, j) => {
        if (i > j) return 0
        if (i === j) return 1

        if (dp[i][j] != -1) return dp[i][j]

        if (s[i] === s[j]) {
            return dp[i][j] = 2 + findLength(i + 1, j - 1)
        }

        return dp[i][j] = Math.max(findLength(i + 1, j), findLength(i, j - 1))
    }

    return findLength(0, n - 1)
};


/*

Tabulation

O(n^2) & O(n^2)

*/


var longestPalindromeSubseq = function(s) {
    const n = s.length 

    const dp = Array.from({length: n}, () => new Array(n).fill(0))

    for (let i = 0; i < n; i++) { // Base case, all diagonals which denotes the same chars should be 1
        dp[i][i] = 1
    }

    for (let i = n - 1; i >= 0; i--) { // start from reverse and fill the dp
        for (let j = i + 1; j < n; j++) { // start from i + 1
            if (s[i] === s[j]) {
                dp[i][j] = 2 + dp[i + 1][j - 1]
            } else {
                dp[i][j] = Math.max(dp[i + 1][j], dp[i][j - 1])
            }
        }
    }

    return dp[0][n - 1]
};

/*

Space ops

O(n^2) & O(n)

*/


var longestPalindromeSubseq = function(s) {
    const n = s.length 

    let prev = new Array(n).fill(1)
    let curr = new Array(n).fill(0)


    for (let i = n - 1; i >= 0; i--) {
        curr[i] = 1
        for (let j = i + 1; j < n; j++) {
            if (s[i] === s[j]) {
                curr[j] = 2 + prev[j - 1]
            } else {
                curr[j] = Math.max(prev[j], curr[j - 1])
            }
        }
        prev = [...curr]
    }

    return prev[n - 1]
};


// Removing curr as well


var longestPalindromeSubseq = function(s) {
  let n = s.length;

  let dp = new Array(n).fill(1);
  
  for (let i = n - 1; i >= 0; i--) {
    let prev = 0; // stores dp[i+1][j-1] from previous iteration
    for (let j = i + 1; j < n; j++) {
      let temp = dp[j]; // save current dp[j] (which is dp[i+1][j]) before overwriting
      if (s[i] === s[j]) {
        dp[j] = 2 + prev; // prev is dp[i+1][j-1]
      } else {
        dp[j] = Math.max(dp[j], dp[j - 1]); // dp[j] is dp[i+1][j], dp[j-1] is dp[i][j-1]
      }
      prev = temp; // update prev for next iteration
    }
  }
  return dp[n - 1];
};