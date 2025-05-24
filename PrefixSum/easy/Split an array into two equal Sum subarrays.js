// https://www.geeksforgeeks.org/split-array-two-equal-sum-subarrays/


class Solution {
    canSplit(arr) {
        // code here
        let prefix = 0, suffix = 0
        const total = arr.reduce((accum, curr) => accum + curr, 0)
        const n = arr.length
        
        for(let i = 0; i < n; i++) {
            prefix += arr[i]
            suffix = total  - prefix
            if (prefix === suffix) {
                return true
            }
        }
        
        return false
    }
}