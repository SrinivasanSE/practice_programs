// https://www.geeksforgeeks.org/maximizing-merit-points-in-training-program/


/*

For each day, track the last selected activity and select the remaining two activities in the current day and find the max of them

*/


/*

Recursion

O(2^n) & O(n)

*/


class Solution {
    // Function to find the maximum points among all the possible ones.
    maximumPoints(arr) {
        // your code here
        const n = arr.length

        const findMaxPoints = (day, last) => {
            if (day === 0) { // for the first da
                let max = Number.MIN_SAFE_INTEGER
                for (let i = 0; i < 3; i++) {
                    if (i != last) {
                        max = Math.max(arr[day][i], max)
                    }
                }

                return max
            }
            let max = Number.MIN_SAFE_INTEGER
            let points
            for (let i = 0; i < 3; i++) { // 3 cases, selecting 0, 1 or 2
                if (i != last) { // ignore the last selected activity and select the remaining two activities
                    points = arr[day][i] + findMaxPoints(day - 1, i)
                    max = Math.max(max, points)
                }
            }

            return max
        }

        return findMaxPoints(n - 1, null)
    }
}


/*

Memoization

O(N) & O(1)


*/




class Solution {
    // Function to find the maximum points among all the possible ones.
    maximumPoints(arr) {
        // your code here
        const n = arr.length
        const dp = Array.from({ length: n + 1 }, () => new Array(4).fill(-1))
        const findMaxPoints = (day, last) => {
            if (day === 0) {
                let max = Number.MIN_SAFE_INTEGER
                for (let i = 0; i < 3; i++) {
                    if (i != last) {
                        max = Math.max(arr[day][i], max)
                    }
                }

                return max
            }
            if (dp[day][last] != -1) return dp[day][last]
            let max = Number.MIN_SAFE_INTEGER
            let points
            for (let i = 0; i < 3; i++) {
                if (i != last) {
                    points = arr[day][i] + findMaxPoints(day - 1, i)
                    max = Math.max(max, points)
                }
            }
            return dp[day][last] = max
        }

        return findMaxPoints(n - 1, 3)
    }
}


/*

Tabulation

O(n) & O(n)

*/




class Solution {
    // Function to find the maximum points among all the possible ones.
    maximumPoints(arr) {
        // your code here
        const n = arr.length

        const dp = Array.from({ length: n }, () => new Array(3).fill(-1))

        if (n === 1) {
            return Math.max(arr[0][0], arr[0][1], arr[0][2])
        }

        dp[0][0] = Math.max(arr[0][1], arr[0][2])
        dp[0][1] = Math.max(arr[0][0], arr[0][2])
        dp[0][2] = Math.max(arr[0][0], arr[0][1])

        let points

        for (let day = 1; day < n; day++) { // check for each day
            for (let last = 0; last < 3; last++) { // simulate selecting each activity, if we select 0, then we can't select that and check the remaining two activities
                dp[day][last] = 0
                for (let j = 0; j < 3; j++) {
                    if (j != last) {
                        points = arr[day][j] + dp[day - 1][j]
                        dp[day][last] = Math.max(dp[day][last], points)
                    }
                }
            }
        }
        return Math.max(...dp[n - 1]) // last index in the array holds the res
    }
}


/*

Space Optimisation - we need only the prev day details

O(n) & O(4)

*/


class Solution {
    // Function to find the maximum points among all the possible ones.
    maximumPoints(arr) {
        // your code here
        const n = arr.length

        
        if (n === 1) {
            return Math.max(arr[0][0], arr[0][1], arr[0][2])
        }
        
        let prev = new Array(3)
        
        prev[0] = Math.max(arr[0][1], arr[0][2])
        prev[1] = Math.max(arr[0][0], arr[0][2])
        prev[2] = Math.max(arr[0][0], arr[0][1])
        
        let points

        for (let i = 1; i < n; i++) {
            let temp = new Array(3).fill(0)
            for (let last = 0; last < 3; last++) {
            for (let j = 0; j < 3; j++) {
                if (j != last) {
                        points = arr[i][j] + prev[j]
                        temp[last] = Math.max(temp[last], points)
                    }
            }
            }
            prev = temp
        }
        return Math.max(...prev)
    }
}


