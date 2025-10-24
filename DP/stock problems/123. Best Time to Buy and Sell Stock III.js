// https://leetcode.com/problems/best-time-to-buy-and-sell-stock-iii/description/

/*

Recursion

O(2^n) & O(n)



/**
 * 
 * Goal: Maximize profit with at most 2 transactions (buy+sell pairs)
 * Each transaction = 1 buy + 1 sell
 * 
 *  tCount = 0 → canBuy (first buy)
    tCount = 1 → canSell (first sell)
    tCount = 2 → canBuy (second buy)
    tCount = 3 → canSell (second sell)

 */

var maxProfit = function(prices) {
    const n = prices.length
    const cap = 2 // we are allowed to make 2 complete transactions (buy + sell)

    const findProfit = (i, tCount) => {
        // Base cases:
        // 1️⃣ If we’ve reached the end of the price list → no more profit possible
        // 2️⃣ If we’ve already done all possible operations (4 for cap=2) → stop
        if (i === n || tCount === cap * 2) return 0


        // If tCount is even → we are in a BUY state (0, 2, ...)
        if (tCount % 2 === 0) {
            // Two options:
            // 🅰️ Buy stock today → subtract current price (we pay money)
            //    then move to next state (tCount + 1 → next action is SELL)
            const buy = -prices[i] + findProfit(i + 1, tCount + 1)

            // 🅱️ Skip buying today → remain in same state
            const notBuy = findProfit(i + 1, tCount)

            // Take the max profit of both choices
            return Math.max(buy, notBuy)
        }

        // Else → we are in a SELL state (1, 3, ...)
        // Two options:
        // 🅰️ Sell stock today → add current price (we earn money)
        //    then move to next state (tCount + 1 → next action is BUY)
        const sell = prices[i] + findProfit(i + 1, tCount + 1)

        // 🅱️ Skip selling today → remain in same state
        const notSell = findProfit(i + 1, tCount)

        // Take the max profit of both choices
        return Math.max(sell, notSell)
    }

    // Start recursion from day 0, with tCount = 0 (first action = BUY)
    return findProfit(0, 0)
};


/*

Memo

O(n * 2 * cap) & O(n) + O(n * 2 * cap)

*/


var maxProfit = function(prices) {
    const n = prices.length
    const cap = 2 // we are allowed to make 2 complete transactions (buy + sell)

    // dp[i][tCount] = max profit from day i till end, 
    // having already done 'tCount' operations (each operation is buy OR sell)
    // tCount ranges from 0..(cap*2 - 1)
    // Example when cap = 2 → tCount = 0..3  => [buy1, sell1, buy2, sell2]
    const dp = Array.from({ length: n + 1 }, () => new Array(cap * 2).fill(-1))

    const findProfit = (i, tCount) => {
        // Base cases:
        // 1️⃣ If we’ve reached the end of the price list → no more profit possible
        // 2️⃣ If we’ve already done all possible operations (4 for cap=2) → stop
        if (i === n || tCount === cap * 2) return 0

        // Memoized result (avoid recomputation)
        if (dp[i][tCount] != -1) return dp[i][tCount]

        // If tCount is even → we are in a BUY state (0, 2, ...)
        if (tCount % 2 === 0) {
            // Two options:
            // 🅰️ Buy stock today → subtract current price (we pay money)
            //    then move to next state (tCount + 1 → next action is SELL)
            const buy = -prices[i] + findProfit(i + 1, tCount + 1)

            // 🅱️ Skip buying today → remain in same state
            const notBuy = findProfit(i + 1, tCount)

            // Take the max profit of both choices
            return dp[i][tCount] = Math.max(buy, notBuy)
        }

        // Else → we are in a SELL state (1, 3, ...)
        // Two options:
        // 🅰️ Sell stock today → add current price (we earn money)
        //    then move to next state (tCount + 1 → next action is BUY)
        const sell = prices[i] + findProfit(i + 1, tCount + 1)

        // 🅱️ Skip selling today → remain in same state
        const notSell = findProfit(i + 1, tCount)

        // Take the max profit of both choices
        return dp[i][tCount] = Math.max(sell, notSell)
    }

    // Start recursion from day 0, with tCount = 0 (first action = BUY)
    return findProfit(0, 0)
};


/*

Tabulation

O(n*4) & O(n*4)

*/



var maxProfit = function (prices) {
    const n = prices.length;
    const cap = 2;
    const dp = Array.from({ length: n + 1 }, () => new Array(cap * 2 + 1).fill(0)); // The maximum profit you can achieve starting from day i given that you’ve already made tCount buy/sell actions so far.

    for (let i = n - 1; i >= 0; i--) { // go from end
        for (let tCount = cap * 2 - 1; tCount >= 0; tCount--) { // go from end, we are doing + 1 below, so we can't start from 0
            if (tCount % 2 === 0) {
                // Buy turn
                const buy = -prices[i] + dp[i + 1][tCount + 1];
                const notBuy = dp[i + 1][tCount];
                dp[i][tCount] = Math.max(buy, notBuy);
            } else {
                // Sell turn
                const sell = prices[i] + dp[i + 1][tCount + 1];
                const notSell = dp[i + 1][tCount];
                dp[i][tCount] = Math.max(sell, notSell);
            }
        }
    }

    return dp[0][0]; // maximum profit starting at day 0, allowed to buy
};


/*

Space ops - 1

O(n*4) & O(4)

*/


var maxProfit = function (prices) {
    const n = prices.length;
    const cap = 2;
    let prev = new Array(cap * 2 + 1).fill(0)
    let curr = new Array(cap * 2 + 1).fill(0)
    
    for (let i = n - 1; i >= 0; i--) {
        for (let tCount = cap * 2 - 1; tCount >= 0; tCount--) { // start from end
            if (tCount % 2 === 0) {
                // Buy turn
                const buy = -prices[i] + prev[tCount + 1];
                const notBuy = prev[tCount];
                curr[tCount] = Math.max(buy, notBuy);
            } else {
                // Sell turn
                const sell = prices[i] + prev[tCount + 1];
                const notSell = prev[tCount];
                curr[tCount] = Math.max(sell, notSell);
            }
        }
        prev = [...curr]
    }

    return prev[0]; 
};

/*

Space ops - 2

O(n*k) & O(k)

*/

var maxProfit = function (prices) {
    const n = prices.length
    const cap = 2
    let dp = new Array(cap * 2 + 1).fill(0)

    let prev, temp
    for (let i = n - 1; i >= 0; i--) {
        prev = 0
        for (let tCount = cap * 2 - 1; tCount >= 0; tCount--) {
            temp = dp[tCount]
            if (tCount % 2 === 0) {
                const buy = -prices[i] + prev
                const notBuy = dp[tCount]
                dp[tCount] = Math.max(buy, notBuy)
            } else {

                const sell = prices[i] + prev
                const notSell = dp[tCount]
                dp[tCount] = Math.max(sell, notSell)
            }
            prev = temp
        }
    }
    return dp[0]
};


/*

Space ops - 3

O(n) & O(1)

*/




/**

 * This function computes the maximum profit from at most TWO stock transactions.
 * A transaction = one buy followed by one sell.
 * 
 * The approach optimizes dynamic programming into 4 variables
 * that track profit states after each buy/sell decision.
 */
var maxProfit = function (prices) {
    const n = prices.length;

    // Initialize states for the 4 key decision points:
    // buy1  → max profit after the FIRST BUY
    // sell1 → max profit after the FIRST SELL
    // buy2  → max profit after the SECOND BUY
    // sell2 → max profit after the SECOND SELL

    // Initially, we can buy the first stock (cost = -prices[0]),
    // and we haven’t sold anything yet, so profits after sells are 0.
    let buy1 = -prices[0];
    let buy2 = -prices[0];
    let sell1 = 0, sell2 = 0;

    // Iterate over each day to update these states
    for (let i = 1; i < n; i++) {
        const price = prices[i];

        // 1️⃣ First buy: either keep previous buy1, or buy today at -price
        buy1 = Math.max(buy1, -price);

        // 2️⃣ First sell: either keep previous sell1, or sell today to realize profit (buy1 + price)
        sell1 = Math.max(sell1, buy1 + price);

        // 3️⃣ Second buy: either keep previous buy2, or buy again after completing first sell
        //                 (profit after sell1 - current price)
        buy2 = Math.max(buy2, sell1 - price);

        // 4️⃣ Second sell: either keep previous sell2, or sell second stock today
        //                  (profit after buy2 + price)
        sell2 = Math.max(sell2, buy2 + price);
    }

    // sell2 will hold the maximum profit achievable after at most 2 transactions
    return sell2;
};
