// https://leetcode.com/problems/minimum-path-sum/description/


/*

Recursion

O(2^(m*n)) & O(m - 1 + n - 1)

*/


var minPathSum = function (grid) {
    const m = grid.length
    const n = grid[0].length

    const findSum = (i, j) => {
        if (i < 0 || j < 0) return Number.MAX_SAFE_INTEGER

        if (i === 0 && j === 0) {
            return grid[i][j]
        }

        const left = findSum(i, j - 1)
        const up = findSum(i - 1, j)

        return Math.min(left, up) + grid[i][j]  // find the min path in each step and add the current path
    }

    return findSum(m - 1, n - 1)
};


/*

Memoization

O(n*m) & O((N-1)+(M-1)) + O(M*N)

*/


var minPathSum = function (grid) {
    const m = grid.length
    const n = grid[0].length

    const dp = Array.from({ length: m }, () => new Array(n).fill(-1))

    const findSum = (i, j) => {
        if (i < 0 || j < 0) return Number.MAX_SAFE_INTEGER

        if (i === 0 && j === 0) {
            return grid[i][j]
        }

        if (dp[i][j] != -1) return dp[i][j]

        const left = findSum(i, j - 1)
        const up = findSum(i - 1, j)

        return dp[i][j] = Math.min(left, up) + grid[i][j]
    }

    return findSum(m - 1, n - 1)
};


/*

Tabulation

O(n*m) & O(n*m)

*/


var minPathSum = function (grid) {
    const m = grid.length
    const n = grid[0].length

    const dp = Array.from({ length: m }, () => new Array(n).fill(-1))
    dp[0][0] = grid[0][0]

    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (i === 0 && j === 0) {
                continue
            }

            let up = Number.MAX_SAFE_INTEGER
            if (i > 0) {
                up = dp[i - 1][j]
            }
            let left = Number.MAX_SAFE_INTEGER
            if (j > 0) {
                left = dp[i][j - 1]
            }

            dp[i][j] = Math.min(left, up) + grid[i][j]
        }
    }

    return dp[m - 1][n - 1]

};


/*

Space optimization

O(n*m) & O(n)

*/


var minPathSum = function (grid) {
    const m = grid.length
    const n = grid[0].length

    const prev = new Array(n)
    prev[0] = grid[0][0]
    let last = prev[0]
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (i === 0 && j === 0) {
                continue
            }

            let up = Number.MAX_SAFE_INTEGER
            if (i > 0) {
                up = prev[j]
            }
            let left = Number.MAX_SAFE_INTEGER
            if (j > 0) {
                left = last
            }

            last = Math.min(left, up) + grid[i][j]
            prev[j] = last
        }
    }

    return prev[n - 1]

};