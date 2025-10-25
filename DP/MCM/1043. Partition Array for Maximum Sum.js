// https://leetcode.com/problems/partition-array-for-maximum-sum/description/

/*

Recursion/Memo

O(n*k) & O(n) + O(n)

*/



var maxSumAfterPartitioning = function(arr, k) {
    const n = arr.length;

    // dp[i] stores the maximum sum we can get starting from index i
    const dp = new Array(n).fill(-1);

    // Recursive function to calculate max sum from index i to end
    const f = (i) => {
        if (i === n) return 0; // Base case: reached end of array → no sum to add

        if (dp[i] != -1) return dp[i]; // Return memoized result if already computed

        let max = Number.MIN_SAFE_INTEGER; // Max value in current partition
        let sum, maxSum = Number.MIN_SAFE_INTEGER; // sum = current partition sum, maxSum = best sum so far

        // Try all partitions starting at i with length 1 to k
        for (let j = i; j < Math.min(i + k, n); j++) { // Ensure partition does not exceed array length
            max = Math.max(max, arr[j]); // Update max in current partition
            // Current partition length = j - i + 1
            // Partition sum = length * max value in partition + max sum for remaining array
            sum = (j - i + 1) * max + f(j + 1);

            // Keep track of maximum sum among all possible partitions
            maxSum = Math.max(sum, maxSum);   
        }

        dp[i] = maxSum; // Memoize result
        return dp[i];
    }

    return f(0); // Start from index 0
};



/*

Tabulation

O(n*k) & O(n)

*/


var maxSumAfterPartitioning = function (arr, k) {
    const n = arr.length
    const dp = new Array(n + 1).fill(0)
    for (let i = n - 1; i >= 0; i--) {
        let max = Number.MIN_SAFE_INTEGER, sum, maxSum = Number.MIN_SAFE_INTEGER
        for (let j = i; j < Math.min(i + k, n); j++) {
            max = Math.max(max, arr[j])
            sum = (j - i + 1) * max + dp[j + 1]
            maxSum = Math.max(sum, maxSum)
        }

        dp[i] = maxSum
    }

    return dp[0]
};