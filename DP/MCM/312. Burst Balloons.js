// https://leetcode.com/problems/burst-balloons/description/

/*

We assume the baloon to be bursted is the last baloon, so at each recursion flow, the last baloon which got bursted before becomes the left or right neighbour for the current baloon

*/


/*

Recursion/Memo

O(n^3) & O(n^2) + O(n)

*/


var maxCoins = function (nums) {
    // Add virtual balloons with value 1 at both ends
    // This simplifies boundary cases
    nums = [1, ...nums, 1];
    const n = nums.length;

    // dp[i][j] stores the maximum coins obtainable
    // by bursting all balloons between index i and j (exclusive)
    const dp = Array.from({ length: n }, () => new Array(n).fill(-1));

    // Recursive helper function
    const f = (i, j) => {
        // Base case: no balloons between i and j
        // (i.e., segment empty)
        if (j - i <= 1) return 0;

        // Memoization check: reuse already computed result
        if (dp[i][j] !== -1) return dp[i][j];

        let max = Number.MIN_SAFE_INTEGER;

        // Try every possible balloon 'k' between i and j
        // as the last one to burst in this subarray
        for (let k = i + 1; k < j; k++) {
            // Coins gained by bursting balloon 'k' last
            // + coins gained from left subarray (i,k)
            // + coins gained from right subarray (k,j)
            const coins = nums[i] * nums[k] * nums[j] + f(i, k) + f(k, j);  

            // Choose the maximum over all possible 'k'
            max = Math.max(max, coins);
        }

        // Store result for future use and return it
        return dp[i][j] = max;
    };

    // We compute for the full range (0, n-1)
    return f(0, n - 1);
};

/*

Tabulation

O(n^3) & O(n^2)

*/


var maxCoins = function (nums) {
    // Add virtual balloons at both ends
    nums = [1, ...nums, 1];
    const n = nums.length;

    // dp[i][j] = max coins from bursting balloons between i and j (exclusive)
    const dp = Array.from({ length: n }, () => new Array(n).fill(0));

    // We fill dp bottom-up, starting from smaller segments
    // i goes backward because smaller i means smaller intervals first
    for (let i = n - 1; i >= 0; i--) {
        for (let j = i + 2; j < n; j++) {
            // Only segments where j-i > 1 contain at least one balloon
            let max = Number.MIN_SAFE_INTEGER;

            // Try each possible last balloon 'k' between i and j
            for (let k = i + 1; k < j; k++) {
                const coins = nums[i] * nums[k] * nums[j] + dp[i][k] + dp[k][j];
                max = Math.max(max, coins);
            }

            dp[i][j] = max;
        }
    }

    // Final answer is the full segment (0, n-1)
    return dp[0][n - 1];
};



/*

Consider the array, [3, 1, 5, 8], for the last baloon, there will be no left and right values available, so we can assume it as 1. 

For the first recursion call, we consider that the last balloon to be burst is 3, we assume all the others baloons have been already burst,

so the cost = 1 * 3 * 1 + f(0, 1) + f(1, 5). Now the call will go to f(1, 5)

For this call, we assume 1 is the baloon to get burst now, we assumed 3 is the last to get busted, that means 3 would have been there when 1 got busted, so it could have been [3, 1] at this point,

so the cost = 3 * 1 * 1 + f(1, 2) + f(2, 5)

it goes on like this.


*/