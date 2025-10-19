// https://leetcode.com/problems/triangle/description/


/*

Recursion

O(2^(n*n)) & O(n)


*/


var minimumTotal = function (triangle) {
    const m = triangle.length

    const findSum = (i, j) => {
        if (i === m - 1) {
            return triangle[i][j]
        }

        const down = findSum(i + 1, j) // move down
        const downRight = findSum(i + 1, j + 1) // move down, one index right

        return Math.min(down, downRight) + triangle[i][j]
    }

    return findSum(0, 0)
};


/*

Memoization

O(n*n) & O(n) + O(n*n)

*/


var minimumTotal = function (triangle) {
    const m = triangle.length
    const dp = Array.from({length: m}, () => new Array(m).fill(null))
    const findSum = (i, j) => {
        if (i === m - 1) {
            return triangle[i][j]
        }

        if (dp[i][j] != null) return dp[i][j]

        const down = findSum(i + 1, j)
        const downRight = findSum(i + 1, j + 1)

        return dp[i][j] = Math.min(down, downRight) + triangle[i][j]
    }

    return findSum(0, 0)
};


/*

Tabulation

O(n*n) & O(n*n)

*/


var minimumTotal = function (triangle) {
    const n = triangle.length
    const dp = Array.from({ length: n }, () => new Array(n).fill(null))

    for (let i = 0; i < n; i++) { // start from bottom, fill the bottom row
        dp[n - 1][i] = triangle[n - 1][i]
    }
    let down, downRight
    for (let i = n - 2; i >= 0; i--) { // skip the already filled row and start from n - 2 row
        for (let j = i; j >= 0; j--) { // at this row, there will be i elements, so j starts from i, for ex: row 3 contains 3 elements

            down = dp[i + 1][j]
            downRight = dp[i + 1][j + 1]

            dp[i][j] = Math.min(down, downRight) + triangle[i][j]
        }
    }

    return dp[0][0]
};


/*

Space Optimisation

O(n*n) & O(n)

*/


var minimumTotal = function (triangle) {
    const n = triangle.length
    let next = new Array(n)

    for (let i = 0; i < n; i++) {
        next[i] = triangle[n - 1][i]
    }
    let down, downRight, temp
    for (let i = n - 2; i >= 0; i--) {
        temp = new Array(n)
        for (let j = i; j >= 0; j--) {

            down = next[j]
            downRight = next[j + 1]

            temp[j] = Math.min(down, downRight) + triangle[i][j]
        }
        next = temp
    }

    return next[0]
};