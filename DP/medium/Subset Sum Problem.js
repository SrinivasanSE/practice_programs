// https://www.geeksforgeeks.org/problems/subset-sum-problem-1611555638/1


/*

Recursion

O(2^n) & O(n)

*/

class Solution {
    isSubsetSum(arr, sum) {
        // code here
        const n = arr.length
        
        const isSubset = (ind, target) => {
            if (target === 0 ) {
                return true
            }
            if (ind === 0) {
                return false
            }
            
            return isSubset(ind - 1, target) || isSubset(ind - 1, target - arr[ind]) // not pick the current element and pick the current element and see if it's giving target as 0
        }
        
        
        return isSubset(n - 1, sum) // start from end with sum as target
    }
}


/*

Memo

O(n*k) & O(n) + O(n*k)

*/



class Solution {
    isSubsetSum(arr, sum) {
        // code here
        const n = arr.length
        const dp = Array.from({length: n}, () => new Array(sum + 1).fill(-1))
        const isSubset = (ind, target) => {
            if (target === 0 ) {
                return true
            }
            if (ind === 0) {
                return arr[ind] === target
            }
            
            if (dp[ind][target] != -1) return dp[ind][target]
            
            const notPick = isSubset(ind - 1, target) 
            
            if (notPick) return dp[ind][target] = true
            
            let pick = false
            
            if (target >= arr[ind]) {
                pick = isSubset(ind - 1, target - arr[ind])
            }
            
            return dp[ind][target] = pick
        }
        
        
        return isSubset(n - 1, sum)
    }
}


/*

Tabulation

O(n*k) & O(n*k)

*/


class Solution {
    isSubsetSum(arr, sum) {
        // code here
        const n = arr.length
        const dp = Array.from({length: n}, () => new Array(sum + 1).fill(false)) // create an array with n & sum size
        
        for (let i = 0; i < n; i++) { // base case - for target 0, the dp will be true
            dp[i][0] = true
        }
        
        if (arr[0] <= sum) dp[0][arr[0]] = true // at index 0, arr[0] will be true
        
        for (let i = 1; i < n; i++) { // run from i = 1 and check for each target, 
            for (let target = 0; target <= sum; target++) {
                dp[i][target] = dp[i - 1][target] || (target >= arr[i] ? dp[i - 1][target - arr[i]] : false) // not pick || pick
            }
        }
        
        return dp[n - 1][sum]
        
    }
}


/*

Space ops

O(n*k) & O(k)

*/


class Solution {
    isSubsetSum(arr, sum) {
        // code here
        const n = arr.length
        const prev = new Array(sum + 1).fill(false)
        prev[0] = true
        if (arr[0] <= sum) prev[arr[0]] = true
        
        for (let i = 1; i < n; i++) {
            for (let target = sum; target >= 0; target--) { // run in reverse to use the single array itself and so that we don't overwrite it
                prev[target] = prev[target] || (target >= arr[i] ? prev[target - arr[i]] : false)
            }
        }
        
        return prev[sum]
        
    }
}