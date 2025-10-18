// https://leetcode.com/problems/house-robber/description/


/*

Think choice at each house: when you stand at house i you have exactly two meaningful options:

Skip house i — then your best total is whatever you had up to house i-1.

Rob house i — then you cannot have robbed house i-1, so your total is the best you had up to i-2 plus nums[i].

So the core insight: the optimum at position i is the better of those two choices.


*/


/*

Recursion

O(2^n) & O(n)

*/


var rob = function(nums) {
    let n = nums.length
    const find = (ind) => {
        if (ind < 0) return 0
        if (ind === 0) {
            return nums[ind]
        }

        let skip = find(ind - 1)
        let rob = find(ind - 2) + nums[ind]
        return Math.max(skip, rob)
    }

    return find(n - 1)
};

/*

Memoization

O(n) & O(n)

*/

var rob = function(nums) {
    let n = nums.length
    const dp = new Array(n + 1).fill(-1)
    const find = (ind) => {
        if (ind < 0) return 0
        if (ind === 0) {
            return nums[ind]
        }

        if (dp[ind] != -1) return dp[ind]

        let skip = find(ind - 1)
        let rob = find(ind - 2) + nums[ind]
        return dp[ind] = Math.max(skip, rob)
    }

    return find(n - 1)
};


/*

Tabulation

O(n) & O(n)

*/


var rob = function (nums) {
    let n = nums.length
    if (n === 1) return nums[0]
    const dp = new Array(n)
    dp[0] = nums[0]
    dp[1] = Math.max(nums[0], nums[1])
    
    for (let i = 2; i < n; i++) {
        dp[i] = Math.max(dp[i - 1], dp[i - 2] + nums[i])
    }

    return dp[n - 1]
};


/*

Space Optimization

O(n) & O(1)

*/


var rob = function (nums) {
    let n = nums.length
    let prev1 = nums[0], prev2 = null
    let skip, rob
    for (let i = 1; i < n; i++) {
        skip = prev1
        rob = i > 1 ? prev2 + nums[i] : nums[i]
        prev2 = prev1
        prev1 = Math.max(skip, rob)
    }

    return prev1
};



// Greedy approach won't give the correct ans for this, but the approach is this

/*

Example:

[5, 1, 1, 5]

Greedy picks the first 5, skips next 1s, then skips last 5 because it’s adjacent?
→ Total = 5
But the optimal choice (DP approach) picks both 5s → Total = 10

So greedy fails since it doesn’t look ahead.

*/

var rob = function(nums) {
    if (nums.length === 0) return 0;
    if (nums.length === 1) return nums[0];

    let total = nums[0];
    let prevRobbed = true;

    for (let i = 1; i < nums.length; i++) {
        if (prevRobbed) {
            // Can't rob this one
            prevRobbed = false;
        } else {
            if (nums[i] > nums[i - 1]) {
                total += nums[i];
                prevRobbed = true;
            } else {
                prevRobbed = false;
            }
        }
    }

    return total;
};
