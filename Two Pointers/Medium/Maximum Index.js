// https://www.geeksforgeeks.org/given-an-array-arr-find-the-maximum-j-i-such-that-arrj-arri/


class Solution {
    maxIndexDiff(arr) {
        // code here
        const n = arr.length
        
        if (n < 2) {
            return 0
        }
        
        const minLeft = new Array(n).fill(0)
        const maxRight = new Array(n).fill(0)
        
        minLeft[0] = arr[0]
        
        for(let i = 1; i < n; i++) {
            minLeft[i] = Math.min(minLeft[i - 1], arr[i])
        }
        
        maxRight[n - 1] = arr[n - 1]
        
        for(let i = n - 2; i >= 0; i--) {
            maxRight[i] = Math.max(maxRight[i + 1], arr[i])
        }
        
        let i = 0, j = 0, max = 0
        
        while (i < n && j < n) {
            if (minLeft[i] <= maxRight[j]) { // j will be incremented to increase the max value
                max = Math.max(max, j - i)
                j++ 
            } else {
                i++   // j need not be reset because max will decrease if j decreases
            }
        }
        
        return max
    }
}


// Optimized approach
class Solution {
    maxIndexDiff(arr) {
        // code here
        const n = arr.length
        
        if (n < 2) {
            return 0
        }
        
        
        const maxRight = new Array(n).fill(0)
    
        
        maxRight[n - 1] = arr[n - 1]
        
        for(let i = n - 2; i >= 0; i--) {
            maxRight[i] = Math.max(maxRight[i + 1], arr[i])
        }
        
        let i = 0, j = 0, max = 0, lmin = arr[0]
        
        while (i < n && j < n) {
            if (lmin <= maxRight[j]) {
                max = Math.max(max, j - i)
                j++
            } else {
                i++
                if (i < n) {
                    lmin = Math.min(lmin, arr[i])
                }
            }
        }
        
        return max
    }
}