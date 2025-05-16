// https://www.geeksforgeeks.org/find-maximum-minimum-sum-subarray-size-k/


class Solution {
    maximumSumSubarray(arr, k) {
        // code here
        let sum = 0
        const n = arr.length
        for(let i = 0; i < k; i++) {
            sum += arr[i]
        }
        
        let maxSum = sum
        
        for(let i = k; i < n; i++) {
            sum -= arr[i - k]
            sum += arr[i]
            maxSum = Math.max(sum, maxSum)
        }
        
        return maxSum
    }
}

class Solution {
    maximumSumSubarray(arr, k) {
        // code here
        let sum
        const n = arr.length
        let maxSum = 0
        for(let i = 0; i <= n - k; i++) {
            sum = 0
            for(let j = i; j < i + k; j++) {
                sum += arr[j]
                maxSum = Math.max(sum, maxSum)
            }
        }
        
        return maxSum
    }
}