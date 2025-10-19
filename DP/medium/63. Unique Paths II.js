// https://leetcode.com/problems/unique-paths-ii/description/


// Same as 62, just need to handle for obstacles


/*

Recursion

O(2^(m*n)) & O(m - 1 + n - 1)

*/


var uniquePathsWithObstacles = function (obstacleGrid) {

    let m = obstacleGrid.length
    let n = obstacleGrid[0].length

    const findPaths = (i, j) => {

        if (i < 0 || j < 0 || obstacleGrid[i][j] === 1) { // we can't use that path if there is a obstacle
            return 0
        }

        if (i === 0 && j === 0) {
            return 1
        }


        const left = findPaths(i, j - 1)
        const up = findPaths(i - 1, j)

        return left + up
    }

    return findPaths(m - 1, n - 1)
};


/*

Memoization

O(n*m) & O((N-1)+(M-1)) + O(M*N)

*/


var uniquePathsWithObstacles = function (obstacleGrid) {

    let m = obstacleGrid.length
    let n = obstacleGrid[0].length

    const dp = Array.from({length: m}, () => new Array(n).fill(-1))

    const findPaths = (i, j) => {

        if (i < 0 || j < 0 || obstacleGrid[i][j] === 1) {
            return 0
        }

        if (i === 0 && j === 0) {
            return 1
        }

        if (dp[i][j] != -1) return dp[i][j]


        const left = findPaths(i, j - 1)
        const up = findPaths(i - 1, j)

        return dp[i][j] = left + up
    }

    return findPaths(m - 1, n - 1)
};


/*

Tabulation

O(n*m) & O(n*m)

*/


var uniquePathsWithObstacles = function(obstacleGrid) {

    const m = obstacleGrid.length
    const n = obstacleGrid[0].length
    let left, up
    const dp = Array.from({length: m}, () => new Array(n))

    dp[0][0] = 1

    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {

            if (obstacleGrid[i][j] === 1)             {
                dp[i][j] = 0
                continue
            }
            
            if (i === 0 && j === 0) {
                continue
            }

            up = 0
            if (i > 0) {
                up = dp[i - 1][j]
            }
            left = 0
            if (j > 0) {
                left = dp[i][j - 1]
            }

            dp[i][j] = up + left 
            
        }
    }

    return dp[m - 1][n - 1]
    
};


/*

Space optimization

O(n*m) & O(n)

*/


var uniquePathsWithObstacles = function(obstacleGrid) {

    const m = obstacleGrid.length
    const n = obstacleGrid[0].length
    let left, up, last
    const prev = new Array(n)

    prev[0] = 1

    for (let i = 0; i < m; i++) {
        last = 1
        for (let j = 0; j < n; j++) {

            if (obstacleGrid[i][j] === 1)             {
                prev[j] = 0
                last = 0
                continue
            }
            
            if (i === 0 && j === 0) {
                
                continue
            }

            
            up = 0
            if (i > 0) {
                up = prev[j]
            }
            left = 0
            if (j > 0) {
                left = last
            }

            last = up + left 
            prev[j] = last
            
        }
    }

    return prev[n - 1]
    
};