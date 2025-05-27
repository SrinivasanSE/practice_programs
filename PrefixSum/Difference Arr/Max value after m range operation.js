// https://www.geeksforgeeks.org/maximum-value-array-m-range-increment-operations/

// User function Template for javascript
class Solution {
    findMax(n, a, b, k) {
        // code here
        let max = 0
        let diff = new Array(n + 1).fill(0)
        const m = a.length
        for(let i = 0; i < m; i++) {
            
            const l = a[i]
            const r = b[i]
            diff[l] += k[i]
            diff[r + 1] -= k[i]
        }
        let prefixSum = 0
        for(let i = 0 ; i < n; i++) {
            prefixSum += diff[i]
            max = Math.max(prefixSum, max)
        }
        return max
    }
}