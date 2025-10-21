// https://leetcode.com/problems/coin-change-ii/description/

// Similar to 322. Problem, instead of counting coins, we need to count the ways


/*

Recursion

O(2^n) & O(n)

*/


var change = function(amount, coins) {
    const n = coins.length
    const findNoOfCoins = (ind, target) => {
        if (target === 0) return 1
        if (target < 0) return 0
        if (ind === 0) {
            if (target % coins[0] === 0) return 1
            return 0
        }

        const notPick = findNoOfCoins(ind - 1, target)
        let pick = 0
        if (target >= coins[ind]) {
            pick = findNoOfCoins(ind, target - coins[ind])
        }
        return pick + notPick
    }

    return findNoOfCoins(n - 1, amount)
};


/*

Memo

O(n*amt) & O(n) + O(n*amt)

*/


var change = function(amount, coins) {
    const n = coins.length
    const dp = Array.from({length: n}, () => new Array(amount + 1).fill(-1))
    const findNoOfCoins = (ind, target) => {
        if (target === 0) return 1
        if (target < 0) return 0
        if (ind === 0) {
            if (target % coins[0] === 0) return 1
            return 0
        }

        if (dp[ind][target]!=-1) return dp[ind][target]

        const notPick = findNoOfCoins(ind - 1, target)
        let pick = 0
        if (target >= coins[ind]) {
            pick = findNoOfCoins(ind, target - coins[ind])
        }
        return dp[ind][target] = pick + notPick
    }

    return findNoOfCoins(n - 1, amount)
};


/*

Tabulation

O(n*amt) & O(n*amt)

*/


var change = function (amount, coins) {
    const n = coins.length
    const dp = Array.from({ length: n }, () => new Array(amount + 1))
    for (let i = 0; i <= amount; i++) {
        if (i % coins[0] === 0) dp[0][i] = 1
        else dp[0][i] = 0
    }

    for (let i = 1; i < n; i++) {
        for (let target = 0; target <= amount; target++) {
            const notPick = dp[i - 1][target]
            let pick = 0
            if (target >= coins[i]) {
                pick = dp[i][target - coins[i]]
            }
            dp[i][target] = pick + notPick
        }
    }
    return dp[n - 1][amount]
};


/*

Space ops - Improved code comparing to other implementations

*/

var change = function (amount, coins) {
    const n = coins.length
    const prev = new Array(amount + 1).fill(0) // initialise with 0
    prev[0] = 1 // for loop not needed for initial row, just assign 1

    for (let i = 0; i < n; i++) { // start from 0 instead of 1
        for (let target = coins[i]; target <= amount; target++) {
            const notPick = prev[target]
            const pick = prev[target - coins[i]]
            prev[target] = pick + notPick
        }
    }
    return prev[amount]
};