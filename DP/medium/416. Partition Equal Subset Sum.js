// https://leetcode.com/problems/partition-equal-subset-sum/description/


/*

To have equal partition sum, the sum of the array elements should be even.

If it's even, we need to check if the array has a subset with sum of sum/2. If it has, that means there will be another subset with the same sum for sure.

We can use the subset sum problem logic

*/


var canPartition = function (nums) {
    const n = nums.length
    const sum = nums.reduce((accum, curr) => accum + curr, 0)

    if (sum % 2 === 1) return false

    return subsetSum(n - 1, sum / 2) // use the same logic as DP/medium/Subset Sum Problem.js
};