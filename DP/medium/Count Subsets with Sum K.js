// https://www.geeksforgeeks.org/problems/perfect-sum-problem5633/1

// Check for negative numbers

// Similar to subset sum problem, need to add the pick and not pick, instead of boolean check

/*

Recursion

O(2^n) & O(n)

*/


class Solution {
    perfectSum(arr, k) {
        // code here
        const n = arr.length

        const findCount = (ind, target) => {
            if (target < 0) return 0
            if (ind === 0) {
                if (target === 0 && arr[0] === 0) return 2; // if the arr[0] is 0, that means, we can pick it or not pick it, so there will be 2 ways
                if (target === 0 || arr[0] === target) return 1;
                return 0;
            }


            const notPick = findCount(ind - 1, target)
            let pick = 0

            if (target >= arr[ind]) {
                pick = findCount(ind - 1, target - arr[ind])
            }

            return notPick + pick

        }

        return findCount(n - 1, k)
    }
}

/*

Memo

O(n*k) & O(n) + O(n*k)

*/

class Solution {
    perfectSum(arr, k) {
        // code here
        const n = arr.length
        const dp = Array.from({ length: n }, () => new Array(k + 1).fill(-1))
        const findCount = (ind, target) => {
            if (target < 0) return 0
            if (ind === 0) {
                if (target === 0 && arr[0] === 0) return 2;
                if (target === 0 || arr[0] === target) return 1;
                return 0;
            }

            if (dp[ind][target] != -1) return dp[ind][target]


            const notPick = findCount(ind - 1, target)
            let pick = 0

            if (target >= arr[ind]) {
                pick = findCount(ind - 1, target - arr[ind])
            }

            return dp[ind][target] = notPick + pick

        }

        return findCount(n - 1, k)
    }
}


/*

Tabulation

O(n*k) & O(n*k)

*/




class Solution {
    perfectSum(arr, k) {
        // code here
        const n = arr.length
        const dp = Array.from({ length: n }, () => new Array(k + 1).fill(0))

        for (let i = 0; i < n; i++) { // if the target is 0, it will be 1
            dp[i][0] = 1
        }
        if (arr[0] <= k) {
            dp[0][arr[0]] = 1
            if (arr[0] === 0) { // if the arr[0] is 0, there will be one extra way, we can pick it or not pick it
                dp[0][arr[0]] += 1
            }
        }

        for (let i = 1; i < n; i++) {
            for (let target = 0; target <= k; target++) {
                dp[i][target] = dp[i - 1][target] + (target >= arr[i] ? dp[i - 1][target - arr[i]] : 0)

            }
        }


        return dp[n - 1][k]
    }
}

/*

Space ops

O(n*k) & O(k)

*/

class Solution {
    perfectSum(arr, k) {
        // code here
        const n = arr.length
        const prev = new Array(k + 1).fill(0)
        
        if (arr[0] === 0) {
            prev[0] = 2 // two ways, pick or not pick, it it's 0
        } else {
            prev[arr[0]] = 1
            prev[0] = 1
        }
        
        for (let i = 1; i < n; i++) {
            for (let target = k; target >= 0; target--) {
                prev[target] = prev[target] + (target >= arr[i] ? prev[target - arr[i]] : 0)
            
            }
        }
        
        return prev[k]
    }
}