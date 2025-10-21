// https://leetcode.com/problems/coin-change/description/

/*

Recursion

O(2^n) & O(n)

*/


var coinChange = function(coins, amount) {
    const n = coins.length

    const findNoOfCoins = (ind, target) => {
        if (ind === 0) {
            if (target % coins[ind] === 0) return target / coins[ind] // we are calculating no of coins at each step, so if the target can be divided by the coins[0], we return the no of coins
            return 1e9
        }

        const notPick = findNoOfCoins(ind - 1, target) // not pick the current coin
        let pick = 1e9
        if (target >= coins[ind]) {
            pick = 1 + findNoOfCoins(ind, target - coins[ind]) // pick the current coin, but don't move the index since the same coin can be used infinite no of times
        }

        return Math.min(notPick, pick)
    }

    const noOfCoins =  findNoOfCoins(n - 1, amount) 
    return noOfCoins >= 1e9 ? -1 : noOfCoins
};


/*

Memo

O(n*amount) & O(n) + O(n*amount)

*/


var coinChange = function(coins, amount) {
    const n = coins.length

    if (n === 1 && amount % coins[0] != 0) return -1

    const dp = Array.from({length: n}, () => new Array(amount + 1).fill(-1))

    const findNoOfCoins = (ind, target) => {
        if (ind === 0) {
            if (target % coins[ind] === 0) return target / coins[ind]
            return 1e9
        }

        if (dp[ind][target] != -1) return dp[ind][target]

        const notPick = findNoOfCoins(ind - 1, target)
        let pick = 1e9
        if (target >= coins[ind]) {
            pick = 1 + findNoOfCoins(ind, target - coins[ind])
        }

        return dp[ind][target] = Math.min(notPick, pick)
    }

    const noOfCoins = findNoOfCoins(n - 1, amount)

    return noOfCoins >= 1e9 ? -1 : noOfCoins
};


/*

Tabulation

O(n*amount) & O(n*amount)

*/


var coinChange = function (coins, amount) {
    const n = coins.length

    if (n === 1 && amount % coins[0] != 0) return -1

    const dp = Array.from({ length: n }, () => new Array(amount + 1))

    for (let i = 0; i <= amount; i++) { // we converted the base case from recursion, the target can be anything, so we calculate for all the targets
        if (i % coins[0] === 0) {
            dp[0][i] = i / coins[0]
        } else {
            dp[0][i] = 1e9
        }
    }

    for (let i = 1; i < n; i++) {
        for (let target = 0; target <= amount; target++) { // target should start from 0
            const notPick = dp[i - 1][target]
            let pick = 1e9
            if (target >= coins[i]) {
                pick = 1 + dp[i][target - coins[i]]
            }

            dp[i][target] = Math.min(notPick, pick)
        }
    }

    return dp[n - 1][amount] >= 1e9 ? -1 : dp[n - 1][amount]
};


/*

Space Ops

O(n*amount) & O(amount)

*/


var coinChange = function (coins, amount) {
    const n = coins.length

    if (n === 1 && amount % coins[0] != 0) return -1

    let prev = new Array(amount + 1)

    for (let i = 0; i <= amount; i++) {
        if (i % coins[0] === 0) {
            prev[i] = i / coins[0]
        } else {
            prev[i] = 1e9
        }
    }

    for (let i = 1; i < n; i++) {
        for (let target = coins[i]; target <= amount; target++) { // target can be started from coins[i] instead of 0, prev[0...coins[i] - 1] remains unchanged, even if we start from 0, we will assign the same value again and again since pick will not be there when the target is less than the coin
            const notPick = prev[target]
            const pick = 1 + prev[target - coins[i]] // we can use the same prev and no need to use curr array
            prev[target] = Math.min(notPick, pick)
        }
    }

    return prev[amount] >= 1e9 ? -1 : prev[amount]
};

/*

Why Starting at coin[i] Works

If target < coin[i], you can’t use this coin anyway,
so earlier entries (prev[0..coin[i]-1]) remain correct.

*/