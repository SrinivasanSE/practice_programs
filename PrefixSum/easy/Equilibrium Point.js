// https://www.geeksforgeeks.org/equilibrium-index-of-an-array/



class Solution {
    // Function to find equilibrium point in the array.
    findEquilibrium(arr) {
        // code here
        const total = arr.reduce((accum, curr) => accum + curr, 0)
        let prefixSum = 0, suffixSum = 0
        
        const n = arr.length
        
        for(let i = 0; i < n; i++) {
            suffixSum = total - arr[i] - prefixSum
            
            if (prefixSum === suffixSum) {
                return i
            }
            
            prefixSum += arr[i]
        }
        
        return -1
    }
}


class Solution {
    // Function to find equilibrium point in the array.
    findEquilibrium(arr) {
        // code here
        const n = arr.length
        const preSum = new Array(n).fill(0)
        preSum[0] = arr[0]
        for(let i = 1; i < n; i++) {
            preSum[i] = preSum[i - 1] + arr[i]
        }
        
        for(let i = 1; i < n; i++) {
            if (preSum[i - 1] === (preSum[n - 1] - preSum[i])) {
                return i
            }
        }
        
        return -1
    }
}