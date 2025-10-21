// https://www.geeksforgeeks.org/problems/knapsack-with-duplicate-items4201/1


/*

Recursion

O(2^n) & O(n)

*/



class Solution {

    knapSack(val, wt, W) {
        // code here
        const n = val.length

        const findProfit = (ind, capacity) => {
            if (ind === 0) {
                if (wt[ind] <= capacity) // this condition is not needed, if the wt[ind] is greater, 0 will be returned anyway
                    return Math.floor((capacity / wt[ind])) * val[ind]
                return 0
            }

            const notPick = findProfit(ind - 1, capacity)
            let pick = Number.MIN_SAFE_INTEGER
            if (wt[ind] <= capacity) {
                pick = val[ind] + findProfit(ind, capacity - wt[ind])
            }
            return Math.max(notPick, pick)
        }

        return findProfit(n - 1, W)
    }
}

/*

Memo

O(n*w) & O(n) + O(n*w)

*/

class Solution {

    knapSack(val, wt, W) {
        // code here
        const n = val.length
        const dp = Array.from({ length: n }, () => new Array(W + 1).fill(-1))
        const findProfit = (ind, capacity) => {
            if (ind === 0) {
                if (wt[ind] <= capacity)
                    return Math.floor((capacity / wt[ind])) * val[ind]
                return 0
            }

            if (dp[ind][capacity] != -1) return dp[ind][capacity]

            const notPick = findProfit(ind - 1, capacity)
            let pick = Number.MIN_SAFE_INTEGER
            if (wt[ind] <= capacity) {
                pick = val[ind] + findProfit(ind, capacity - wt[ind])
            }
            return dp[ind][capacity] = Math.max(notPick, pick)
        }

        return findProfit(n - 1, W)
    }
}


/*

Tabulation

O(n*w) & O(n*w)

*/


class Solution {

    knapSack(val, wt, W) {
        // code here
        const n = val.length
        const dp = Array.from({ length: n }, () => new Array(W + 1).fill(0))

        for (let i = wt[0]; i <= W; i++) {
            dp[0][i] = Math.floor((i / wt[0])) * val[0]
        }

        for (let i = 1; i < n; i++) {
            for (let capacity = 0; capacity <= W; capacity++) {
                const notPick = dp[i - 1][capacity]
                let pick = Number.MIN_SAFE_INTEGER
                if (wt[i] <= capacity) {
                    pick = val[i] + dp[i][capacity - wt[i]]
                }
                dp[i][capacity] = Math.max(notPick, pick)
            }
        }


        return dp[n - 1][W]
    }
}


/*

Space ops

O(n*w) & O(w)

*/


class Solution {

    knapSack(val, wt, W) {
        // code here
        const n = val.length
        const prev = new Array(W + 1).fill(0)

        //  for (let i = wt[0]; i <= W; i++) { // this is not needed if we start the for loop below from 0
        //     prev[i] = Math.floor((i / wt[0])) * val[0]
        // }


        for (let i = 0; i < n; i++) { // run i from 0 if prev is not initialized
            for (let capacity = wt[i]; capacity <= W; capacity++) {
                const notPick = prev[capacity]
                let pick = val[i] + prev[capacity - wt[i]]
                prev[capacity] = Math.max(notPick, pick)
            }
        }

        return prev[W]
    }
}