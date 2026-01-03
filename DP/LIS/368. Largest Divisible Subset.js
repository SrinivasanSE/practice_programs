// https://leetcode.com/problems/largest-divisible-subset/description/

/*

Uses the same logic as LIS, we just need to sort the array, so they will be in increasing order and just need to check if the current element is divided by the previous element

*/

var largestDivisibleSubset = function (nums) {
  const n = nums.length;
  // If array has 0 or 1 element, it's already the largest divisible subset
  if (n <= 1) return nums;

  // Sort the array in ascending order to make divisibility checks easier
  nums.sort((a, b) => a - b);

  // dp[i] will store the length of the largest divisible subset ending with nums[i]
  const dp = new Array(n).fill(1);
  // parent[i] will store the previous index in the subset for backtracking
  const parent = new Array(n).fill(-1);

  // Variables to track the index and length of the maximum subset found
  let maxIndex = 0,
    maxLength = 1;

  // Build the dp and parent arrays
  for (let i = 1; i < n; i++) {
    for (let prev = 0; prev < i; prev++) {
      // Check if nums[i] is divisible by nums[prev]
      // and if adding nums[i] would increase the subset length
      if (nums[i] % nums[prev] === 0 && dp[i] < 1 + dp[prev]) {
        dp[i] = 1 + dp[prev]; // Update the length
        parent[i] = prev; // Store the previous index
      }
    }

    // Update the maximum length and its corresponding index
    if (maxLength < dp[i]) {
      maxLength = dp[i];
      maxIndex = i;
    }
  }

  // Reconstruct the largest divisible subset by backtracking
  const res = [];
  while (maxIndex >= 0) {
    res.push(nums[maxIndex]);
    maxIndex = parent[maxIndex];
  }

  // The subset is constructed in reverse order, but returning as is is fine
  return res;
};
