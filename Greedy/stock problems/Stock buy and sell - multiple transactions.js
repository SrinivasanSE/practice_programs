// https://www.geeksforgeeks.org/dsa/stock-buy-sell/


class Solution {
    // Function to find the days of buying and selling stock for max profit.
    stockBuySell(arr) {
        // your code here
        let total = 0
        
        const n = arr.length
        for(let i = 0; i < n - 1; i++) {
            if (arr[i] < arr[i + 1]) { // we keep selling while the prices are going up
                total += (arr[i + 1] - arr[i])
            }
        }

        return total
    }
}


class Solution {
    // Function to find the days of buying and selling stock for max profit.
    stockBuySell(arr) {
        // your code here
        let total = 0
        
        const n = arr.length
        let lmin = arr[0]
        let lmax = arr[0]
        for(let i = 0; i < n - 1; i++) {
            while (i < n - 1 && arr[i] >= arr[i + 1]) i++ // Skip days while the price is going down & The day right after the last drop is a local minimum (buy here)
            lmin = arr[i]
            while (i < n - 1 && arr[i] <= arr[i + 1]) i++ // Keep going while price is going up &  The day just before it starts falling is a local maximum
            lmax = arr[i]
            
            total += (lmax - lmin)
        }
        return total
    }
}
