// https://www.geeksforgeeks.org/minimum-number-of-jumps-to-reach-end-of-a-given-array/

class Solution {
    minJumps(arr) {
        // code here
        const n = arr.length
        if (n <= 1) {
            return 0
        }
        if (arr[0] === 0) {
            return -1
        }
        let jumps = 0, currentEnd = 0, farthest = 0
        for (let i = 0; i < n - 1; i++) {
            farthest = Math.max(farthest, i + arr[i])
            if (i === currentEnd) {
                 if (i === farthest) {
                    return -1
                }
                jumps++
                currentEnd = farthest
                
            }
            
            if (currentEnd >= n - 1) {
                return jumps
            }
        }
        
        return -1
    }
}

class Solution {
    // Function to check if we can reach the last index from the 0th index.
    canReach(arr) {
        // code here
        let currLast = 0
        let farthest = 0
        const n = arr.length
        for(let i = 0; i < n; i++) {
            if (i > farthest) return false
            farthest = Math.max(farthest, arr[i] + i)
        }
        
        return true
    }
}