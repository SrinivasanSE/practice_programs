// https://www.geeksforgeeks.org/largest-sum-subarray-least-k-numbers/

/*
he idea is to maintain two sliding counters - one for calculating the sum of the current k-sized window,
 and another for tracking the sum of elements before the window (like Kadane's algorithm).
  As we slide through the array, we update both sums, and whenever the sum of elements before the window becomes negative,
   we discard it since it won't contribute positively to our overall sum. 
   The maximum sum with at least k elements will either be just the k-sized window sum or the window sum plus some positive sum of elements before it.
*/

class Solution {
    // Function to find maximum sum subarray by removing at most k elements.
    maxSumWithK(arr, n, k) {
        // your code here
        
        let last = 0, j = 0
        
        let sum = 0, res
        
        for(let i = 0; i <k; i++) {
            sum += arr[i]
        }
        
        res = sum
        
        for(let i = k; i < n; i++) {
            sum += arr[i]
            
            last += arr[j++]
            
            res = Math.max(res, sum)
            
            if (last < 0) {
                sum-=last
                res = Math.max(res, sum)
                last = 0
            }
        
        }
        
        
        return res
    }
}

class Solution {
    // Function to find maximum sum subarray by removing at most k elements.
    maxSumWithK(arr, n, k) {
        // your code here
        let maxPrefixSum = new Array(n).fill(0), currMax
        currMax = maxPrefixSum[0] = arr[0]
        for(let i = 1 ; i < n; i++) {
            maxPrefixSum[i] = Math.max(maxPrefixSum[i - 1] + arr[i], arr[i])
        }
        let currSum = 0
        for(let i = 0 ; i <k; i++) {
            currSum += arr[i]
        }
        let res = currSum
        for(let i = k; i < n; i++) {
            currSum = currSum + arr[i] - arr[i - k]
            
            res = Math.max(res, currSum)
            
            let extendedSum = currSum + maxPrefixSum[i - k]
            res = Math.max(res, extendedSum)
        }
        
        
        
        return res
    }
}

class Solution {
    // Function to find maximum sum subarray by removing at most k elements.
    maxSumWithK(arr, n, k) {
        // your code here
        let res = -Infinity
        
        for(let i = 0; i <= n - k; i++) {
            let currSum = 0
            for(let j = i; j < n; j++) {
                currSum += arr[j]
                //console.log(currSum)
                if (j - i >= k - 1) {
                    res = Math.max(res, currSum)
                }
            }
        }
        
        return res
    }
}