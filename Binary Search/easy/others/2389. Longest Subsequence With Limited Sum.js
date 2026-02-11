// https://leetcode.com/problems/longest-subsequence-with-limited-sum/description/

/*

We find upperBound on the prefixSum arr and find the index and use that as count 

*/

/*

Brute

O(q*n) & O(1)

*/

var answerQueries = function (nums, queries) {
  nums.sort((a, b) => a - b); // Sort nums so we always pick the smallest elements first (best for maximizing count)

  let arr = [];
  for (let query of queries) {
    // For each query, compute how many nums we can take
    let count = 0,
      sum = 0;

    // Keep adding numbers until we exceed the query
    for (let i = 0; i < nums.length; i++) {
      if (sum + nums[i] <= query) {
        // If adding nums[i] still <= query
        sum += nums[i]; // Include this number
        count++; // Increase count
      } else {
        break; // Stop because future numbers are bigger (array is sorted)
      }
    }

    arr.push(count); // Add result for this query
  }
  return arr;
};

/*

Optimal

O(n log n + q log n) & O(n)

*/

var answerQueries = function (nums, queries) {
  nums.sort((a, b) => a - b); // Sort so prefix sums make sense (smallest numbers first)

  const n = nums.length;
  const prefixSum = new Array(n);

  // Build prefix sum:
  // prefixSum[i] = sum of nums[0..i]
  prefixSum[0] = nums[0];
  for (let i = 1; i < n; i++) {
    prefixSum[i] = prefixSum[i - 1] + nums[i];
  }

  const ans = new Array(queries.length);

  for (let i = 0; i < queries.length; i++) {
    // Use binary search:
    // Find how many prefix elements have sum <= query, we use the index as the count
    ans[i] = upperBound(prefixSum, queries[i], n);
  }

  return ans;
};
