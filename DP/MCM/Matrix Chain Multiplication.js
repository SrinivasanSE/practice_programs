// https://www.geeksforgeeks.org/problems/matrix-chain-multiplication0303/1

/*

Recursion/Memo

O(n^3) & O(n^2) + O(n)

*/


class Solution {

    matrixMultiplication(arr) {
        // 'arr' represents the dimensions of the matrices.
        // If there are n matrices, arr[] has n+1 elements.
        // Example: arr = [10, 20, 30] means:
        // Matrix A1 = 10x20, Matrix A2 = 20x30

        const n = arr.length;  // Number of dimensions (number of matrices = n - 1)

        // dp[i][j] will store the minimum number of multiplications
        // needed to multiply matrices from index i to j.
        const dp = Array.from({ length: n }, () => new Array(n).fill(-1));

        // Recursive helper function to compute min cost from matrix i to j
        const f = (i, j) => {
            // Base case: Only one matrix, no multiplication needed
            if (i === j) return 0;

            // If already computed, return the cached value
            if (dp[i][j] !== -1) return dp[i][j];

            let steps = 0;
            let min = Number.MAX_SAFE_INTEGER; // To track the minimum cost

            // Try every possible partition point 'k'
            // between i and j, and choose the one that gives min cost
            for (let k = i; k < j; k++) {
                // Cost of multiplying the resulting two parts:
                // arr[i-1]*arr[k]*arr[j] = scalar multiplications for combining the two results
                // f(i, k) = cost of multiplying left half (A_i ... A_k)
                // f(k+1, j) = cost of multiplying right half (A_(k+1) ... A_j)
                steps = arr[i - 1] * arr[k] * arr[j] + f(i, k) + f(k + 1, j);

                // Keep track of the minimum among all partitions
                min = Math.min(min, steps);
            }

            // Store result in dp table (memoization)
            return dp[i][j] = min;
        };

        // Call the function for the full chain: from first matrix (1) to last (n-1)
        return f(1, n - 1);
    }
}


/*

Tabulation

O(n^3) & O(n^2)

*/


class Solution {

    matrixMultiplication(arr) {
        // code here
        const n = arr.length
        const dp = Array.from({ length: n }, () => new Array(n))

        for (let i = 0; i < n; i++) dp[i][i] = 0 // Base case

        for (let i = n - 2; i >= 1; i--) { // start from end and go till 1 only as we are doing i - 1 inside
            for (let j = i + 1; j < n; j++) { // j should be bigger than i, so j should start from i + 1
                let steps = 0, min = Number.MAX_SAFE_INTEGER
                for (let k = i; k < j; k++) {
                    steps = arr[i - 1] * arr[k] * arr[j] + dp[i][k] + dp[k + 1][j]
                    min = Math.min(min, steps)
                }
                dp[i][j] = min
            }
        }


        return dp[1][n - 1]
    }
}