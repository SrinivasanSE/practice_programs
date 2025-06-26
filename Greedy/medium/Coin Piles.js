// https://www.geeksforgeeks.org/dsa/remove-minimum-coins-such-that-absolute-difference-between-any-two-piles-is-less-than-k/

class Solution {
    minimumCoins(arr, k) {
        // code here
        arr.sort((a, b) => a - b)
        const n = arr.length
        let prefix = 0
        const total = arr.reduce((accum, curr) => accum + curr, 0)
        let minCoins = total, end = 0, windowSum = 0
        for(let start = 0; start < n; start++) {
           while (end < n && arr[end] - arr[start] <= k) {
               windowSum += arr[end]
               end++
           }
           
           let removed = prefix + ((total - prefix - windowSum) - (n - end)*(arr[start] + k)) // startingSum - (currentSum - expectedSum) start - end
           minCoins = Math.min(minCoins,  removed)
           
           if (start === end) { // if there is no window, move the end
               end++
           } else {
               windowSum-=arr[start]
           }
           
           prefix += arr[start]
           
        }
        return minCoins  
    }

}

class Solution {
    minimumCoins(arr, k) {
        // code here
        arr.sort((a, b) => a - b)
        const n = arr.length
        let prefix = new Array(n + 1).fill(0)
        
        for(let i = 1; i <= n; i++) {
            prefix[i] = prefix[i - 1] + arr[i - 1]
        }
        
        let minCoins = prefix[n], j
        for(let i = 0; i < n; i++) {
            j = this.upperBound(arr, arr[i] + k)
            let coinsRemoved = prefix[i] + ((prefix[n] - prefix[j]) - (n - j)*(arr[i] + k))
            
            minCoins = Math.min(minCoins, coinsRemoved)
        }
        return minCoins
        
    }
    
    upperBound(arr, target) {
        let l = 0
        let r = arr.length - 1
        
        while (l <= r) {
            const mid = l + Math.floor((r - l)/2)
            
            if (arr[mid] <= target) {
                l = mid + 1
            } else {
                r = mid - 1
            }
        }
        return l
    }
}