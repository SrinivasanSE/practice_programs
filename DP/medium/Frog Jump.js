// https://www.geeksforgeeks.org/minimum-cost-for-hopping-frog-to-reach-stair-n/

/*

Recursion

O(2^n) & O(n)

*/


class Solution {
    minCost(height) {
        // code here
        const n = height.length
        return this.findCost(n - 1, height)
    }
    
    findCost(ind, heights) {
        if (ind === 0) return 0
        
        const left = this.findCost(ind - 1, heights) + Math.abs(heights[ind - 1] - heights[ind]) // finding the cost for jumping one step
        let right = Number.MAX_SAFE_INTEGER
        if (ind > 1) {
        right = this.findCost(ind - 2, heights) + Math.abs(heights[ind - 2] - heights[ind] ) // // finding the cost for jumping 2 steps
        }
        
        return Math.min(left, right)
    }
}


/*

Memoization

O(n) & O(n)

*/


class Solution {
    minCost(height) {
        // code here
        const n = height.length
        const dp = new Array(n + 1).fill(-1)
        return this.findCost(n - 1, height, dp)
    }
    
    findCost(ind, heights, dp) {
        if (ind === 0) return 0
        
        if (dp[ind] != -1) return dp[ind]
        const left = this.findCost(ind - 1, heights, dp) + Math.abs(heights[ind - 1] - heights[ind], dp)
        let right = Number.MAX_SAFE_INTEGER
        if (ind > 1) {
        right = this.findCost(ind - 2, heights, dp) + Math.abs(heights[ind - 2] - heights[ind], dp)
        }
        
        dp[ind] = Math.min(left, right)
        
        return dp[ind]
    }
}

/*

Tabulation

O(n) & O(n)

*/


class Solution {
    minCost(height) {
        // code here
        const n = height.length
        const dp = new Array(n).fill(-1)
        dp[0] = 0
        let first, second
        for (let i = 1; i < n; i++) {
            first = dp[i - 1] + Math.abs(height[i - 1] - height[i])
            second = Number.MAX_SAFE_INTEGER
            if (i > 1)
            second = dp[i - 2] + Math.abs(height[i - 2] - height[i])
            
            dp[i] = Math.min(first, second)
            
        }
        return dp[n - 1]
    }
    
    
}


/*

Space Optimised

O(n) & O(1)

*/

class Solution {
    minCost(height) {
        // code here
        const n = height.length
        let first, second
        let prev1 = 0, prev2 = 0
        for (let i = 1; i < n; i++) {
            first = prev1 + Math.abs(height[i - 1] - height[i])
            second = Number.MAX_SAFE_INTEGER
            if (i > 1)
            second = prev2 + Math.abs(height[i - 2] - height[i])
            
            prev2 = prev1
            prev1 = Math.min(first, second)
            
        }
        return prev1
    }
    
    
}