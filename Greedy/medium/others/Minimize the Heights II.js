// https://www.geeksforgeeks.org/minimize-the-maximum-difference-between-the-heights/


class Solution {
    // Function to get the minimum difference between the heights.
    getMinDiff(arr, k) {
        // your code here
        let low, high
        arr.sort((a, b) => a - b) // sort by asc
        const n = arr.length
        let res = arr[n - 1] - arr[0]
        for(let i = 0; i < n - 1; i++) { // to n - 1 only
            low = Math.min(arr[0] + k, arr[i + 1] - k)
            high = Math.max(arr[i] + k, arr[n - 1] - k)
            
            if (low < 0) { // we don't want the height to be in negative, so skip
                continue
            }
            res = Math.min(res, high - low)
        }
        
        return res
        
        
    }
}

/*

The optimal configuration always looks like this:

All smaller towers (on the left) → increased by k

All larger towers (on the right) → decreased by k

because:

Increasing small towers lifts the bottom

Decreasing tall towers lowers the top

Both actions shrink the overall range


The new maximum is either the largest increased value (arr[i] + K) or the smallest decreased value (arr[n - 1] - K).
The new minimum is either the smallest increased value (arr[0] + K) or the first decreased value (arr[i+1] - K).

*/