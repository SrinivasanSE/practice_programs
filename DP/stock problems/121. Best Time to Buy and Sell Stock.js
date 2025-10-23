// https://www.geeksforgeeks.org/best-time-to-buy-and-sell-stock/
// https://www.geeksforgeeks.org/all-variations-of-stock-problems/
// https://leetcode.com/problems/best-time-to-buy-and-sell-stock/description/


/*

Brute

O(n^2) & O(1)

*/

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

/*

Optimal

O(n) & O(1)

*/



class Solution {
    // Function to find the maximum profit.
    maximumProfit(prices) {
        // your code here
        let maxProfit = 0
        
        const n = prices.length
        let minPrice = prices[0]
        for(let i = 1; i < n; i++) { // we keep tracking the minPrice while we move right
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
    
    while (rightSell < prices.length) { // not l < r, run till n
        const currentPrice = prices[rightSell];
        const buyPrice = prices[leftBuy];
        
        if (buyPrice < currentPrice) { // we will stay at the same buyPrice
            const currentProfit = currentPrice - buyPrice;
            maxProfit = Math.max(maxProfit, currentProfit);
        } else { // if buyPrice is greater, buy at the currentPrice and change the buyPrice
            leftBuy = rightSell;
        }
        
        rightSell++; // keep moving
    }
    
    return maxProfit;
};

