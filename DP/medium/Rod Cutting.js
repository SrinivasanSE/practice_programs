// https://www.geeksforgeeks.org/problems/rod-cutting0840/1


/*

Recursion

O(2^n) & O(n)

*/


class Solution {
    cutRod(price) {
        // code here
        const n = price.length
        const findMaxValue = (ind, inches) => {
            if (inches === 0) return 0
            if (inches < 0) return -1e9
            if (ind === 0) { // at index 0, the rod length is 1, so if the inches is 5, we can take 5 rods of length 1
                return inches * price[ind]
            }

            const notPick = findMaxValue(ind - 1, inches)
            let pick = -1e9
            const rodLength = ind + 1
            if (rodLength <= inches - 1)
                pick = price[ind] + findMaxValue(ind, inches - rodLength)
            return Math.max(pick, notPick)
        }

        return findMaxValue(n - 1, n)
    }
}


/*

Memo

O(n*n) & O(n) + O(n*n)

*/


class Solution {
    cutRod(price) {
        // code here
        const n = price.length
        const dp = Array.from({ length: n }, () => new Array(n + 1).fill(-1))
        const findMaxValue = (ind, inches) => {
            if (inches === 0) return 0
            if (inches < 0) return -1e9
            if (ind === 0) {
                return inches * price[ind]
            }

            if (dp[ind][inches] != -1) return dp[ind][inches]

            const notPick = findMaxValue(ind - 1, inches)
            let pick = -1e9
            const rodLength = ind + 1
            if (rodLength <= inches)
                pick = price[ind] + findMaxValue(ind, inches - rodLength)
            return dp[ind][inches] = Math.max(pick, notPick)
        }

        return findMaxValue(n - 1, n)
    }
}


/*

Tabulation

O(n*n) & O(n*n)

*/



class Solution {
    cutRod(price) {
        // code here
        const n = price.length
        const dp = Array.from({ length: n }, () => new Array(n + 1).fill(0))

        for (let inch = 1; inch <= n; inch++) { // Base case, calc for all inches
            dp[0][inch] = inch * price[0]
        }

        for (let i = 1; i < n; i++) {
            for (let inch = 0; inch <= n; inch++) {
                const notPick = dp[i - 1][inch]
                let pick = -1e9
                const rodLength = i + 1
                if (rodLength <= inch)
                    pick = price[i] + dp[i][inch - rodLength]
                dp[i][inch] = Math.max(pick, notPick)
            }
        }

        return dp[n - 1][n]

    }
}


/*

Space ops

O(n*n) & O(n)

*/

class Solution {
    cutRod(price) {
        // code here
        const n = price.length
        const prev = new Array(n + 1).fill(0)

        for (let i = 0; i < n; i++) { // Start from 0
            for (let inch = 0; inch <= n; inch++) {
                const notPick = prev[inch]
                let pick = -1e9
                const rodLength = i + 1
                if (rodLength <= inch)
                    pick = price[i] + prev[inch - rodLength]
                prev[inch] = Math.max(pick, notPick)
            }
        }

        return prev[n]

    }
}