// https://www.geeksforgeeks.org/problems/boolean-parenthesization5610/1


/*

Recursion/Memo

O(n^3 & O(n^2) & O(n)

*/

// User function Template for JavaScript
/**
 * @param {string} s - Boolean expression consisting of 'T', 'F', '&', '|', '^'
 * @returns {number} - Number of ways the expression can be parenthesized to evaluate to True
 */

class Solution {
    countWays(s) {
        const n = s.length;

        // 3D DP array: dp[i][j][isTrue]
        // dp[i][j][1] → number of ways substring s[i..j] evaluates to True
        // dp[i][j][0] → number of ways substring s[i..j] evaluates to False
        const dp = Array.from({ length: n },
            () => Array.from({ length: n }, () => new Array(2).fill(-1))
        );

        // Recursive helper function
        const f = (i, j, isTrue) => {
            // Base case: invalid substring
            if (i > j) return 0;

            // Base case: single operand (T or F)
            if (i === j) {
                if (isTrue) return s[i] === 'T' ? 1 : 0;
                else return s[i] === 'F' ? 1 : 0;
            }

            // If result is already computed, reuse it (Memoization)
            if (dp[i][j][isTrue] !== -1) return dp[i][j][isTrue];

            let count = 0;

            // Loop over operator positions (operators are at odd indices)
            // Each operator divides the expression into two parts:
            // Left  = s[i..k-1], Right = s[k+1..j]
            for (let k = i + 1; k <= j - 1; k += 2) {
                const lT = f(i, k - 1, 1); // Left True count
                const lF = f(i, k - 1, 0); // Left False count
                const rT = f(k + 1, j, 1); // Right True count
                const rF = f(k + 1, j, 0); // Right False count

                // Evaluate based on current operator s[k]
                if (s[k] === '&') {
                    if (isTrue) {
                        // To be True: both sides must be True
                        count += lT * rT;
                    } else {
                        // To be False: any one side False
                        count += lT * rF + lF * rT + lF * rF;
                    }
                } else if (s[k] === '|') {
                    if (isTrue) {
                        // To be True: any one True
                        count += lT * rT + lT * rF + lF * rT;
                    } else {
                        // To be False: both False
                        count += lF * rF;
                    }
                } else if (s[k] === '^') {
                    if (isTrue) {
                        // To be True: exactly one True
                        count += lT * rF + lF * rT;
                    } else {
                        // To be False: both same
                        count += lT * rT + lF * rF;
                    }
                }
            }

            // Store and return result
            return (dp[i][j][isTrue] = count);
        };

        // Start recursion for entire string, wanting True outcome
        return f(0, n - 1, 1);
    }
}



/*

Tabulation

O(n^3) & O(n^2)

*/


/**
 * Bottom-up DP version of Boolean Parenthesization
 */
var countWays = function (s) {
    const n = s.length;

    // dp[i][j][0/1] same meaning as before
    const dp = Array.from({ length: n },
        () => Array.from({ length: n }, () => new Array(2).fill(0))
    );

    // Base case: single symbols
    for (let i = 0; i < n; i++) {
        if (s[i] === 'T') dp[i][i][1] = 1;
        if (s[i] === 'F') dp[i][i][0] = 1;
    }

    // len = length of substring (always odd: operand op operand ...)
    for (let len = 3; len <= n; len += 2) {
        for (let i = 0; i + len - 1 < n; i++) {
            let j = i + len - 1;

            // Try every operator as the last split
            for (let k = i + 1; k < j; k += 2) {
                const op = s[k];
                const lT = dp[i][k - 1][1];
                const lF = dp[i][k - 1][0];
                const rT = dp[k + 1][j][1];
                const rF = dp[k + 1][j][0];

                if (op === '&') {
                    dp[i][j][1] += lT * rT;
                    dp[i][j][0] += lT * rF + lF * rT + lF * rF;
                } else if (op === '|') {
                    dp[i][j][1] += lT * rT + lT * rF + lF * rT;
                    dp[i][j][0] += lF * rF;
                } else if (op === '^') {
                    dp[i][j][1] += lT * rF + lF * rT;
                    dp[i][j][0] += lT * rT + lF * rF;
                }
            }
        }
    }

    return dp[0][n - 1][1];
};

