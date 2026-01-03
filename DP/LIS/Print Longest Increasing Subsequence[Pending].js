// https://www.geeksforgeeks.org/dsa/construction-of-longest-increasing-subsequence-using-dynamic-programming/

// TODO: Explore the binary search approach

/*

Brute

O(n^2) & O(n)

*/

class Solution {
  getLIS(arr) {
    // Get the length of the input array
    const n = arr.length;

    // dp[i] = length of LIS ending at index i
    const dp = new Array(n).fill(1);

    // hash[i] = index of the previous element in the LIS ending at i
    // (used later for reconstructing the actual subsequence)
    const hash = new Array(n).fill(-1);

    // lastIndex will store the index of the last element of the LIS
    let lastIndex = -1;

    // max keeps track of the maximum LIS length found so far
    let max = 1;

    // Step 1: Build the dp[] and hash[] arrays
    // Outer loop → current element
    for (let i = 1; i < n; i++) {
      // Inner loop → check all previous elements
      for (let prev = 0; prev < i; prev++) {
        // If we can extend the LIS ending at 'prev'
        // and that gives a longer LIS ending at 'i'
        if (arr[prev] < arr[i] && dp[i] < 1 + dp[prev]) {
          dp[i] = 1 + dp[prev]; // Update LIS length for index i
          hash[i] = prev; // Store the previous index (link)
        }
      }

      // Update max length and track the last index of LIS
      if (max < dp[i]) {
        max = dp[i];
        lastIndex = i;
      }
    }

    // Step 2: Reconstruct the LIS using hash[]
    const res = [];

    // Edge case: if array has only one element
    if (lastIndex === -1) return [arr[0]];

    // Follow the chain of previous indices stored in hash[]
    // Start from lastIndex and go backward until -1
    while (lastIndex != -1) {
      res.push(arr[lastIndex]); // Collect the LIS elements
      lastIndex = hash[lastIndex]; // Move to previous element in LIS
    }

    // Step 3: Reverse the array since we built it backward
    return res.reverse();
  }
}
