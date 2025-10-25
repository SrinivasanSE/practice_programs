// https://leetcode.com/problems/minimum-cost-to-cut-a-stick/description/


/*

Recursion/Memo

O(m^3) & O(m^2) + O(m)

*/


var minCost = function (n, cuts) {
    // Step 1: sort the cuts to maintain increasing order
    cuts.sort((a, b) => a - b)

    // Step 2: add the two boundaries (0 and n) as virtual cuts
    cuts.unshift(0)
    cuts.push(n)

    const m = cuts.length // total number of cut points (including ends)

    // Step 3: create a DP table initialized to -1
    // dp[i][j] stores the minimum cost to cut the stick between cuts[i] and cuts[j]
    const dp = Array.from({ length: m }, () => new Array(m).fill(-1))

    // Step 4: recursive function to find min cost between i and j
    const f = (i, j) => {
        // Base Case: no cut possible between i and j
        if (j - i <= 1) return 0

        // Return memoized result if already computed
        if (dp[i][j] !== -1) return dp[i][j]

        let min = Number.MAX_SAFE_INTEGER

        // Step 5: try making each possible cut (k) between i and j
        for (let k = i + 1; k < j; k++) {
            // cost of current cut = stick length + optimal cost of left + right parts
            const cost = (cuts[j] - cuts[i]) + f(i, k) + f(k, j)
            min = Math.min(min, cost)
        }

        // Step 6: store and return the result
        return dp[i][j] = min
    }

    // Step 7: compute the answer for the full stick (from 0 to n)
    return f(0, m - 1)
}


/*

Tabulation

O(m^3) & O(m^2)

*/


var minCost = function (n, cuts) {
    // Step 1: sort and add boundaries
    cuts.sort((a, b) => a - b)
    cuts.unshift(0)
    cuts.push(n)
    const m = cuts.length

    // Step 2: initialize dp table
    // dp[i][j] = min cost to cut between cuts[i] and cuts[j]
    const dp = Array.from({ length: m }, () => new Array(m).fill(0))

    // Step 3: fill table bottom-up
    // We go from smaller segments to larger ones
    for (let i = m - 2; i >= 0; i--) { // starts from m - 2, because j loop runs from i + 2 anyway, even if we start from m - 1, the inner loop won't run
        for (let j = i + 2; j < m; j++) { // we start from i + 2 because j - i should be greater than 1, if it's 1 that means, no cuts are possible
            // Only compute when there’s at least one cut between i and j
            let min = Number.MAX_SAFE_INTEGER

            // Try every possible cut position k between i and j
            for (let k = i + 1; k < j; k++) {
                const cost = (cuts[j] - cuts[i]) + dp[i][k] + dp[k][j]
                min = Math.min(min, cost)
            }

            dp[i][j] = min
        }
    }

    // Step 4: answer for full stick [0, n]
    return dp[0][m - 1]
}
