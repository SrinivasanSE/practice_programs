// https://leetcode.com/problems/best-time-to-buy-and-sell-stock-with-cooldown/description/

/*

Recursion

O(2^n & O(n)

*/


var maxProfit = function(prices) {
    const n = prices.length

    const dp = Array.from({length: n + 1}, () => new Array(2).fill(-1))

    const findProfit = (i, canBuy) => {
        if (i >= n ) return 0 // should be >= n as i + 2 can go beyond n as well

        if (dp[i][canBuy] != -1) return dp[i][canBuy]

        if (canBuy) {
            const buy = -prices[i] + findProfit(i + 1, 0)
            const notBuy = findProfit(i + 1, 1)
            return Math.max(buy, notBuy)
        }

        const sell = prices[i] + findProfit(i + 2, 1) // this is the only change, instead of i + 1, it should be i + 2 since we can't buy the next day itself
        const notSell = findProfit(i + 1, 0)
        return Math.max(sell, notSell)
    }

    return findProfit(0, 1)
};


/*

Memo

O(n*2) & O(n) + O(n*2)

*/


var maxProfit = function(prices) {
    const n = prices.length

    const dp = Array.from({length: n + 1}, () => new Array(2).fill(-1))

    const findProfit = (i, canBuy) => {
        if (i >= n ) return 0

        if (dp[i][canBuy] != -1) return dp[i][canBuy]

        if (canBuy) {
            const buy = -prices[i] + findProfit(i + 1, 0)
            const notBuy = findProfit(i + 1, 1)
            return dp[i][canBuy] = Math.max(buy, notBuy)
        }

        const sell = prices[i] + findProfit(i + 2, 1)
        const notSell = findProfit(i + 1, 0)
        return dp[i][canBuy] = Math.max(sell, notSell)
    }

    return findProfit(0, 1)
};


/*

Tabulation

O(n*2) & O(n*2)

*/


var maxProfit = function (prices) {
    const n = prices.length

    const dp = Array.from({ length: n + 2 }, () => new Array(2).fill(0)) // should be n + 2 instead of n + 1 as we access n + 2 in the for loop

    for (let i = n - 1; i >= 0; i--) {

        const buy = -prices[i] + dp[i + 1][0]
        const notBuy = dp[i + 1][1]
        dp[i][1] = Math.max(buy, notBuy)

        const sell = prices[i] + dp[i + 2][1]
        const notSell = dp[i + 1][0]
        dp[i][0] = Math.max(sell, notSell)
    }

    return dp[0][1]
};

/*

Space ops - 1

O(n*2) & O(2) 3 arrays

*/


var maxProfit = function (prices) {
    const n = prices.length

    let front1 = new Array(2).fill(0), front2 = new Array(2).fill(0), curr = new Array(2).fill(0) // need 3 arrays since we have 

    for (let i = n - 1; i >= 0; i--) {

        const buy = -prices[i] + front1[0]
        const notBuy = front1[1]
        curr[1] = Math.max(buy, notBuy)

        const sell = prices[i] + front2[1]
        const notSell = front1[0]
        curr[0] = Math.max(sell, notSell)

        front2 = [...front1]
        front1 = [...curr]
    }

    return front1[1]
};


/*

Space ops - 2

O(n*2) & O(2) 2arrays

*/

var maxProfit = function (prices) {
    const n = prices.length

    let front = new Array(2).fill(0), curr = new Array(2).fill(0)
    let front2 = 0
    for (let i = n - 1; i >= 0; i--) {
        const buy = -prices[i] + front[0]
        const notBuy = front[1]
        curr[1] = Math.max(buy, notBuy)

        const sell = prices[i] + front2 // using variable here instead of arr
        const notSell = front[0]
        curr[0] = Math.max(sell, notSell)

        front2 = front[1]
        front = [...curr]
    }

    return front[1]
};


/*

Space ops - 3

O(n) & O(1)

*/



/**
 * Best Time to Buy and Sell Stock with Cooldown
 * ---------------------------------------------
 * You can perform as many transactions as you want, but:
 * - You cannot hold multiple stocks at once.
 * - After selling, you must take a 1-day cooldown before buying again.
 *
 * We use a **state machine DP** approach with 3 states:
 *
 *   hold → the max profit when you're currently holding a stock
 *   sold → the max profit when you've just sold a stock today
 *   rest → the max profit when you're in cooldown or idle (not holding)
 *
 * Transition between states every day based on possible actions:
 * - From `hold`, you can either continue holding or sell.
 * - From `rest`, you can buy.
 * - From `sold`, you automatically go into `rest` the next day (cooldown).
 */

var maxProfit = function (prices) {
    const n = prices.length
    if (n === 0) return 0

    // ----------------------------------------------------
    // Initial conditions (Day 0)
    // ----------------------------------------------------
    // On the first day:
    // - If we buy the stock, profit = -prices[0]
    // - If we sell or rest, profit = 0 (since no action yet)
    let hold = -prices[0]  // We bought one share at price[0]
    let sold = 0           // We haven't sold anything yet
    let rest = 0           // No transaction = 0 profit
    let prevSold            // Temporary variable to store yesterday’s 'sold' before updating

    // ----------------------------------------------------
    // Iterate through each day
    // ----------------------------------------------------
    for (let i = 1; i < n; i++) {
        prevSold = sold // Store yesterday’s sold state before updating (used for cooldown transition)

        // ------------------------------------------------
        // 1️⃣ Selling today:
        // If we sell today, it means we were holding a stock yesterday.
        // So today's profit = yesterday's hold + today's price.
        // ------------------------------------------------
        sold = hold + prices[i]

        // ------------------------------------------------
        // 2️⃣ Holding today:
        // Two possibilities:
        //   a) We continue to hold from yesterday: profit = previous hold
        //   b) We buy today: profit = yesterday’s rest - current price
        // Note: we use `rest` here (NOT `sold`) because of cooldown rule:
        //   You can only buy after resting (i.e., you cannot buy the day after selling).
        // ------------------------------------------------
        hold = Math.max(hold, rest - prices[i])

        // ------------------------------------------------
        // 3️⃣ Resting today:
        // Two possibilities:
        //   a) Continue resting (do nothing)
        //   b) Enter rest after selling yesterday (cooldown)
        // So today's rest = max(yesterday’s rest, yesterday’s sold)
        // ------------------------------------------------
        rest = Math.max(rest, prevSold)
    }

    // ----------------------------------------------------
    // At the end:
    // - We cannot end in 'hold' (because that means stock still unsold)
    // - So the answer is max(sold, rest)
    //   - sold → last action was selling (realized profit)
    //   - rest → last action was resting (might have sold earlier and cooled down)
    // ----------------------------------------------------
    return Math.max(sold, rest)
}
