// https://leetcode.com/problems/best-time-to-buy-and-sell-stock-iv/description/

// Same as 123 problem, there only 2 transactions allowed and here k transactions allowed


var maxProfit = function (k, prices) {
    const n = prices.length

    const dp = Array.from({ length: n + 1 }, () => new Array(k * 2 + 1).fill(-1))

    const findProfit = (i, tCount) => {
        if (i === n || tCount === 2 * k) {
            return 0
        }

        if (dp[i][tCount] != -1) return dp[i][tCount]

        if (tCount % 2 === 0) {
            const buy = -prices[i] + findProfit(i + 1, tCount + 1)
            const notBuy = findProfit(i + 1, tCount)
            return dp[i][tCount] = Math.max(buy, notBuy)
        }

        const sell = prices[i] + findProfit(i + 1, tCount + 1)
        const notSell = findProfit(i + 1, tCount)
        return dp[i][tCount] = Math.max(sell, notSell)
    }

    return findProfit(0, 0)
};


var maxProfit = function (k, prices) {
    const n = prices.length

    const dp = Array.from({ length: n + 1 }, () => new Array(k * 2 + 1).fill(0))

    for (let i = n - 1; i >= 0; i--) {
        for (let tCount = k * 2 - 1; tCount >= 0; tCount--) {
            if (tCount % 2 === 0) {
                const buy = -prices[i] + dp[i + 1][tCount + 1]
                const notBuy = dp[i + 1][tCount]
                dp[i][tCount] = Math.max(buy, notBuy)
            } else {

                const sell = prices[i] + dp[i + 1][tCount + 1]
                const notSell = dp[i + 1][tCount]
                dp[i][tCount] = Math.max(sell, notSell)
            }
        }
    }


    return dp[0][0]
};


var maxProfit = function (k, prices) {
    const n = prices.length

    let prev = new Array(k * 2 + 1).fill(0)
    let curr = new Array(k * 2 + 1).fill(0)

    for (let i = n - 1; i >= 0; i--) {
        for (let tCount = k * 2 - 1; tCount >= 0; tCount--) {
            if (tCount % 2 === 0) {
                const buy = -prices[i] + prev[tCount + 1]
                const notBuy = prev[tCount]
                curr[tCount] = Math.max(buy, notBuy)
            } else {

                const sell = prices[i] + prev[tCount + 1]
                const notSell = prev[tCount]
                curr[tCount] = Math.max(sell, notSell)
            }
        }
        prev = [...curr]
    }
    return prev[0]
};


var maxProfit = function (k, prices) {
    const n = prices.length

    let dp = new Array(k * 2 + 1).fill(0)

    let prev, temp
    for (let i = n - 1; i >= 0; i--) {
        prev = 0
        for (let tCount = k * 2 - 1; tCount >= 0; tCount--) {
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