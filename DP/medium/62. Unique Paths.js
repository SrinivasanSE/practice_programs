// https://leetcode.com/problems/unique-paths/description/


/*

Recursion

O(2^(m*n)) & O(m - 1 + n - 1)

*/


var uniquePaths = function (m, n) {

    const findPaths = (i, j) => {
        if (i === 0 && j === 0) {
            return 1
        }

        if (i < 0 || j < 0) return 0
        let left = findPaths(i, j - 1)
        let up = findPaths(i - 1, j)
        return left + up
    }

    return findPaths(m - 1, n - 1)

};


/*

Memoization

O(n*m) & O((N-1)+(M-1)) + O(M*N)

*/


var uniquePaths = function (m, n) {
    const dp = Array.from({ length: m }, () => new Array(n).fill(-1))

    const findPaths = (i, j) => {
        if (i === 0 && j === 0) {
            return 1
        }

        if (i < 0 || j < 0) return 0
        if (dp[i][j] != -1) return dp[i][j]
        let left = findPaths(i, j - 1)
        let up = findPaths(i - 1, j)
        return dp[i][j] = left + up
    }

    return findPaths(m - 1, n - 1)

};


/*

Tabulation

O(n*m) & O(n*m)

*/


var uniquePaths = function (m, n) {
    const dp = Array.from({ length: m }, () => new Array(n).fill(-1))
    dp[0][0] = 1
    let up, left
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (i === 0 && j === 0) continue
            up = 0
            if (i > 0) up = dp[i - 1][j]
            left = 0
            if (j > 0) left = dp[i][j - 1]

            dp[i][j] = up + left
        }
    }

    return dp[m - 1][n - 1]

};


/*

Space optimization

O(n*m) & O(n)

*/


var uniquePaths = function (m, n) {
    let up, left, last = 1
    let prevRow = new Array(n).fill(1)
    for (let i = 0; i < m; i++) {
        last = 1
        for (let j = 0; j < n; j++) {
            if (i === 0 && j === 0) {
                continue
            }
            up = 0
            if (i > 0) up = prevRow[j]
            left = 0
            if (j > 0) left = last
            last = up + left
            prevRow[j] = last
        }
    }

    return prevRow[n - 1]

};