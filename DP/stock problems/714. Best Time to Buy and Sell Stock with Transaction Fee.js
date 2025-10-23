// https://leetcode.com/problems/best-time-to-buy-and-sell-stock-with-transaction-fee/description/


/*

Recursion

O(2^n) & O(n)

*/


var maxProfit = function(prices, fee) {
    const n = prices.length

    const findProfit = (i, canBuy) => {
        if (i === n) return 0

        if (canBuy) {
            const buy = -prices[i] + findProfit(i + 1, 0) 
            const notBuy = findProfit(i + 1, 1)

            return Math.max(buy, notBuy)
        } 

        const sell = prices[i] - fee + findProfit(i + 1, 1) // subtract the fee while selling, only change comparing to 122 problem
        const notSell = findProfit(i + 1, 0)

        return  Math.max(sell, notSell)
    }

    return findProfit(0, 1)
};

/*

Memo

O(n*2) & O(n) + O(n*2)

*/

var maxProfit = function(prices, fee) {
    const n = prices.length

    const dp = Array.from({length: n + 1}, () => new Array(2).fill(-1))

    const findProfit = (i, canBuy) => {
        if (i === n) return 0

        if (dp[i][canBuy] != -1) return dp[i][canBuy]

        if (canBuy) {
            const buy = -prices[i] + findProfit(i + 1, 0) 
            const notBuy = findProfit(i + 1, 1)

            return dp[i][canBuy] = Math.max(buy, notBuy)
        } 

        const sell = prices[i] - fee + findProfit(i + 1, 1)
        const notSell = findProfit(i + 1, 0)

        return dp[i][canBuy] = Math.max(sell, notSell)
    }

    return findProfit(0, 1)
};

/*

Tabulation

O(n) & O(n*2)

*/


var maxProfit = function (prices, fee) {
    const n = prices.length

    const dp = Array.from({ length: n + 1 }, () => new Array(2).fill(0))

    for (let i = n - 1; i >= 0; i--) {

        const buy = -prices[i] + dp[i + 1][0]
        const notBuy = dp[i + 1][1]

        dp[i][1] = Math.max(buy, notBuy)

        const sell = prices[i] - fee + dp[i + 1][1]
        const notSell = dp[i + 1][0]

        dp[i][0] = Math.max(sell, notSell)
    }


    return dp[0][1]
};

/*

Space ops 

O(n) & O(2)

*/


var maxProfit = function (prices, fee) {
    const n = prices.length

    let front = new Array(2).fill(0), curr = new Array(2).fill(0)

    for (let i = n - 1; i >= 0; i--) {

        const buy = -prices[i] + front[0]
        const notBuy = front[1]

        curr[1] = Math.max(buy, notBuy)

        const sell = prices[i] - fee + front[1]
        const notSell = front[0]

        curr[0] = Math.max(sell, notSell)

        front = [...curr]
    }


    return front[1]
};


/*

Space ops - 2

O(n) & O(1)

*/


var maxProfit = function (prices) {
    const n = prices.length

    let aheadNotBuy = 0, aheadBuy = 0, currBuy, currNotBuy

    for (let i = n - 1; i >= 0; i--) {
        currBuy = Math.max(-prices[i] + aheadNotBuy, aheadBuy)
        currNotBuy = Math.max(prices[i] + aheadBuy - fee, aheadNotBuy)

        aheadBuy = currBuy
        aheadNotBuy = currNotBuy
    }


    return aheadBuy
};

/*

Space ops - 3

O(n) & O(1)

*/

/**
 * Best Time to Buy and Sell Stock with Transaction Fee
 * ----------------------------------------------------
 * Goal: Maximize profit with as many transactions as you like,
 * but you must pay a fee for each sell.
 * 
 * Allowed actions:
 *   - Buy a stock (if you don't currently hold one)
 *   - Sell a stock (if you're currently holding one)
 *   - Do nothing (skip the day)
 * 
 * DP State Machine Approach:
 *   We track two states for each day:
 *     1. hold → maximum profit when we are holding a stock
 *     2. cash → maximum profit when we are not holding a stock (free cash)
 * 
 * Transitions:
 *   cash = max(cash, hold + price - fee)
 *     → Either do nothing (stay in cash)
 *       OR sell today (earn price, pay fee)
 * 
 *   hold = max(hold, prevCash - price)
 *     → Either keep holding (do nothing)
 *       OR buy today (spend price using yesterday’s cash)
 */

var maxProfit = function (prices, fee) {
    const n = prices.length
    if (n === 0) return 0

    // Initial states:
    // Day 0: we can either hold one stock (buy it), or have no stock (cash = 0)
    let hold = -prices[0]  // bought the first stock
    let cash = 0           // no stock held, no profit
    let prevCash = 0       // stores yesterday’s cash (for valid state transitions)

    // Iterate through each day
    for (let i = 1; i < n; i++) {
        prevCash = cash   // save yesterday's cash before updating

        // Option 1: Sell today (we were holding before)
        // Option 2: Do nothing (stay in cash)
        // Selling moves us from 'hold' → 'cash' and we pay the transaction fee.
        cash = Math.max(cash, hold + prices[i] - fee)

        // Option 1: Keep holding (do nothing)
        // Option 2: Buy today (spend today's price from yesterday’s cash)
        // Buying moves us from 'cash' → 'hold'
        hold = Math.max(hold, prevCash - prices[i])
    }

    // At the end, we must NOT be holding a stock to realize profit,
    // so the final answer is the profit in the 'cash' state.
    return cash
};
