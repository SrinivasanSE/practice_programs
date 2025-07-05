// https://www.geeksforgeeks.org/longest-sub-array-sum-k/


class Solution {
    longestSubarray(arr, k) {
        // code here
        let sum = 0
        const n = arr.length
        let prefix = new Map()
        let max = 0
        for(let i = 0; i < n; i++) {
            sum += arr[i]
            const req = sum - k
            
            if (req === 0) {
                max = Math.max(max, i + 1)
            } else if (prefix.has(req)) {
                max = Math.max(max, i - prefix.get(req))
            }
            
            if(!prefix.has(sum)) {
                prefix.set(sum, i)
            }
        }
        
        return max
        
    }
}

