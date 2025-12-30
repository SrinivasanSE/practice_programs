// https://leetcode.com/problems/house-robber-ii/description/

/*

So the valid robbery plans are only in two possible ranges:

Exclude the last house → rob from index [0 … n-2]

Exclude the first house → rob from index [1 … n-1]

Then take the maximum of those two.


*/


/*

Recursion

O(2^n) & O(n)

*/


var rob = function (nums) {
    const n = nums.length
    if (n === 1) return nums[0]

    const find = (ind, start) => {
        if (ind < start) return 0
        if (ind === start) return nums[ind]

        let skip = find(ind - 1, start)
        let rob = find(ind - 2, start) + nums[ind]

        return Math.max(skip, rob)
    }

    const excludeLast = find(n - 2, 0)
    const excludeFirst = find(n - 1, 1)

    return Math.max(excludeLast, excludeFirst)

};


/*

Memoization

O(n) & O(n)

*/


var rob = function (nums) {
    const n = nums.length
    if (n === 1) return nums[0]

    const dp = new Array(n + 1).fill(-1)

    const find = (ind, start) => {
        if (ind < start) return 0
        if (ind === start) return nums[ind]

        if (dp[ind] != -1) return dp[ind]

        let skip = find(ind - 1, start)
        let rob = find(ind - 2, start) + nums[ind]

        return dp[ind] = Math.max(skip, rob)
    }

    const excludeLast = find(n - 2, 0)
    dp.fill(-1)
    const excludeFirst = find(n - 1, 1)

    return Math.max(excludeLast, excludeFirst)


};


/*

Tabulation

O(n) & O(n)

*/



var rob = function(nums) {
    const n = nums.length
    if (n === 1) return nums[0]
    const find = (start, end) => {
        let len = end - start + 1
        const dp = new Array(len).fill(-1)
        dp[0] = nums[start]

        if (len > 1) dp[1] = Math.max(nums[start], nums[start + 1]) // use start index here

        for (let i = 2; i < len; i++) {
            dp[i] = Math.max(dp[i - 1], dp[i - 2] + nums[start + i]) // use start index here
        }

        return dp[len - 1]
      
    }

    const excludeLast = find(0, n - 2)
    const excludeFirst = find(1, n - 1)

    return Math.max(excludeLast, excludeFirst)


};



/*

Space Optimization

O(n) & O(1)

*/


var rob = function(nums) {
    const n = nums.length
    if (n === 1) return nums[0]
    const find = (start, end) => {
        let curr, prev1 = 0, prev2 = 0
        for (let i = start; i <= end; i++) { // iterate from start to end (inclusive)
            curr = Math.max(prev1, prev2 + nums[i])
            prev2 = prev1
            prev1 = curr
        }

        return prev1
      
    }

    const excludeLast = find(0, n - 2)
    const excludeFirst = find(1, n - 1)

    return Math.max(excludeLast, excludeFirst)

};
