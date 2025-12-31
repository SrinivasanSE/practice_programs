// https://leetcode.com/problems/partition-equal-subset-sum/description/

/*

To have equal partition sum, the sum of the array elements should be even.

If it's even, we need to check if the array has a subset with sum of sum/2. If it has, that means there will be another subset with the same sum for sure.

We can use the subset sum problem logic

*/

var canPartition = function (nums) {
  const n = nums.length;
  const sum = nums.reduce((accum, curr) => accum + curr, 0);

  if (sum % 2 === 1) return false;

  return subsetSum(n - 1, sum / 2); // use the same logic as DP/medium/Subset Sum Problem.js
};

/*

Optimal

O(n*k) & O(k)

*/

var canPartition = function (nums) {
  const sum = nums.reduce((acc, cur) => acc + cur, 0);
  if (sum % 2 !== 0) return false;
  const target = sum / 2;

  for (const x of nums) if (x > target) return false; // if any of the num is greater than the target, it's not possible to partition since all numbers are only positive,
  // that number will cause the subset sum to not match with the target

  const dp = new Array(target + 1).fill(false);
  dp[0] = true;

  for (const x of nums) {
    for (let t = target; t >= x; t--) {
      if (dp[t - x]) {
        dp[t] = true;
      }
    }

    if (dp[target]) return true;
  }

  return dp[target];
};
