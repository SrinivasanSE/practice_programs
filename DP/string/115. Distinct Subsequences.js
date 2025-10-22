// https://leetcode.com/problems/distinct-subsequences/description/

/*

Recursion

O(2^n1) & O(n1)

*/



var numDistinct = function (s, t) {
    const n1 = s.length, n2 = t.length
    const dp = Array.from({ length: n1 + 1 }, () => new Array(n2 + 1).fill(-1))

    const findCount = (i, j) => {
        if (i < j) return 0 // If the string s is shorter than the string t (i < j), then it is impossible for s to contain t as a subsequence.
        if (j === 0) return 1 // if j becomes 0, that means, we have matched all the chars from t, so we return 1
        if (i === 0) return 0 // if i becomes 0 and j is not 0, that means we moved at the start of s trying to match chars and still some chars from t were not matched 

        if (s[i - 1] === t[j - 1]) { // when the char matches, move to the before char and stay at the same char and check if the char from t can be matched by another same char in the front
            return dp[i][j] = findCount(i - 1, j - 1) + findCount(i - 1, j)
        }

        return findCount(i - 1, j) // no match, so move the s string, so that we can check if t's char can at least match with other chars in the front of s
    }

    return findCount(n1, n2) // 1 based indexing
};


/*

Memo

O(n1*n2) & O(n1 + n2) & O(n1*n2)

*/


var numDistinct = function (s, t) {
    const n1 = s.length, n2 = t.length
    const dp = Array.from({ length: n1 + 1 }, () => new Array(n2 + 1).fill(-1))

    const findCount = (i, j) => {
        if (i < j) return 0
        if (j === 0) return 1
        if (i === 0) return 0

        if (dp[i][j] != -1) return dp[i][j]

        if (s[i - 1] === t[j - 1]) {
            return dp[i][j] = findCount(i - 1, j - 1) + findCount(i - 1, j)
        }

        return dp[i][j] = findCount(i - 1, j)
    }

    return findCount(n1, n2)
};


/*

Tabulation

O(n1*n2) & O(n1*n2)

*/


var numDistinct = function (s, t) {
    const n1 = s.length, n2 = t.length

    if (n1 < n2) return 0
    const dp = Array.from({ length: n1 + 1 }, () => new Array(n2 + 1).fill(0))

    for (let i = 0; i <= n1; i++) { // Base case, when j is 0, it should be 1
        dp[i][0] = 1
    }

    for (let i = 1; i <= n1; i++) {
        for (let j = 1; j <= n2; j++) {
            dp[i][j] = dp[i - 1][j]
            if (s[i - 1] === t[j - 1]) {
                dp[i][j] += dp[i - 1][j - 1]
            }
        }
    }

    return dp[n1][n2]


};

/*

Space ops

O(n1*n2) & O(n2)

*/



var numDistinct = function (s, t) {
    const n1 = s.length, n2 = t.length
    if (n1 < n2) return 0
    let prev = new Array(n2 + 1).fill(0), curr

    prev[0] = 1

    for (let i = 1; i <= n1; i++) {
        curr = new Array(n2 + 1).fill(1)
        for (let j = 1; j <= n2; j++) {
            curr[j] = prev[j]
            if (s[i - 1] === t[j - 1]) {
                curr[j] += prev[j - 1]
            }
        }
        prev = curr
    }

    return prev[n2]


};;

// Space optimised further, curr arr removed. We can notice that curr array is not used to calculate in the current iteration, so curr arr is not needed 
// and we need to run the loop in reverse, so that we don't overwrite the arr


var numDistinct = function (s, t) {
    const n1 = s.length, n2 = t.length
    if (n1 < n2) return 0
    let prev = new Array(n2 + 1).fill(0)

    prev[0] = 1

    for (let i = 1; i <= n1; i++) {
        for (let j = n2; j >= 1; j--) { // run the loop from end, if we run from start, for j = 2, we will need prev[1] 
            // and we would overwritten that already in the previous iteration, but if we run from end, we won't overwrite
            if (s[i - 1] === t[j - 1]) {
                prev[j] += prev[j - 1]
            }
        }
    }

    return prev[n2]


};