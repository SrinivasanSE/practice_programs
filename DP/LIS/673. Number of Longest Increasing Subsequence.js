// https://leetcode.com/problems/number-of-longest-increasing-subsequence/description/


// O(n^2) & O(n)

var findNumberOfLIS = function (nums) {
    const n = nums.length;
    if (n === 0) return 0; // edge case: empty array

    // dp[i] = length of the Longest Increasing Subsequence (LIS) ending at index i
    // count[i] = number of ways to reach dp[i] ending at i
    const dp = new Array(n).fill(1);
    const count = new Array(n).fill(1);

    let maxLen = 1; // keeps track of the global LIS length

    // Step 1: Build LIS and count arrays
    for (let i = 0; i < n; i++) {
        for (let prev = 0; prev < i; prev++) {
            if (nums[prev] < nums[i]) {
                // Case 1: Found a longer subsequence ending at i
                if (dp[prev] + 1 > dp[i]) {
                    dp[i] = dp[prev] + 1;
                    count[i] = count[prev]; // start a new count from prev
                } 
                // Case 2: Found another subsequence of the same best length
                else if (dp[prev] + 1 === dp[i]) { // important step, we found another subsequence which gives the same length, so we need to add the count of prev
                    count[i] += count[prev]; // add number of ways from prev
                }
            }
        }
        maxLen = Math.max(maxLen, dp[i]); // update global LIS length
    }

    // Step 2: Count total LIS of maximum length
    let total = 0;
    for (let i = 0; i < n; i++) {
        if (dp[i] === maxLen) {
            total += count[i];
        }
    }

    return total;
};


/*

Think of each LIS as a path up a hill.

When you find a taller mountain (longer LIS),
you start fresh with only those climbers who reached the new highest peak (count[i] = count[prev]).

When another route reaches the same height,
you add its climbers to the total (count[i] += count[prev]).

*/