// https://www.geeksforgeeks.org/best-time-to-buy-and-sell-stock/
// https://www.geeksforgeeks.org/all-variations-of-stock-problems/
// https://leetcode.com/problems/best-time-to-buy-and-sell-stock/description/



class Solution {
    // Function to find the maximum profit.
    maximumProfit(prices) {
        // your code here
        let maxProfit = 0
        
        const n = prices.length
        let minPrice = prices[0]
        for(let i = 1; i < n; i++) {
            maxProfit = Math.max(maxProfit, prices[i] - minPrice)
            minPrice = Math.min(prices[i], minPrice)
        }
        
        return maxProfit
    }
}

// Two Pointer approach


var maxProfit = function(prices) {
    if (!prices || prices.length < 2) {
        return 0;
    }
    
    let maxProfit = 0;
    let leftBuy = 0;
    let rightSell = 1;
    
    while (rightSell < prices.length) {
        const currentPrice = prices[rightSell];
        const buyPrice = prices[leftBuy];
        
        if (buyPrice < currentPrice) {
            const currentProfit = currentPrice - buyPrice;
            maxProfit = Math.max(maxProfit, currentProfit);
        } else { // if buyPrice is greater, buy at the currentPrice
            leftBuy = rightSell;
        }
        
        rightSell++;
    }
    
    return maxProfit;
};

class Solution {
    // Function to find the maximum profit.
    maximumProfit(prices) {
        // your code here
        let maxProfit = 0
        
        const n = prices.length
        
        for(let i = 0; i < n; i++) {
            for(let j = i + 1; j < n; j++) {
                if (prices[i] < prices[j]) {
                    maxProfit = Math.max(maxProfit, prices[j] - prices[i])
                }
            }
        }
        
        return maxProfit
    }
}