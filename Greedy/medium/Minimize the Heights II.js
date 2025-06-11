// https://www.geeksforgeeks.org/minimize-the-maximum-difference-between-the-heights/


class Solution {
    // Function to get the minimum difference between the heights.
    getMinDiff(arr, k) {
        // your code here
        let low, high
        arr.sort((a, b) => a - b)
        const n = arr.length
        let res = arr[n - 1] - arr[0]
        for(let i = 0; i < n - 1; i++) {
            low = Math.min(arr[0] + k, arr[i + 1] - k)
            high = Math.max(arr[i] + k, arr[n - 1] - k)
            
            if (low < 0) {
                continue
            }
            res = Math.min(res, high - low)
        }
        
        return res
        
        
    }
}

/*
The new maximum is either the largest increased value (arr[i] + K) or the smallest decreased value (arr[-1] - K).
The new minimum is either the smallest increased value (arr[0] + K) or the first decreased value (arr[i+1] - K).
*/