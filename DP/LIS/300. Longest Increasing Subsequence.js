// https://leetcode.com/problems/longest-increasing-subsequence/description/

/*

Recursion/Memo

O(2^n) & O(n)

*/

var lengthOfLIS = function (nums) {
  const n = nums.length;

  const dp = Array.from({ length: n }, () => new Array(n + 1).fill(-1)); // n + 1

  const findLength = (i, prev) => {
    if (i === n) return 0;

    if (dp[i][prev + 1] != -1) return dp[i][prev + 1]; // prev + 1 and not prev

    const notPick = findLength(i + 1, prev); // we don't pick the current element, so the prev will remain as it is and move to the next element
    let pick = 0;
    if (prev === -1 || nums[prev] < nums[i]) {
      // if there is no previous or if the current element is greater than the prev element,then it can be part of the LIS,
      // so we add 1 and move to the next element and mark the current element as prev
      pick = 1 + findLength(i + 1, i);
    }

    return (dp[i][prev + 1] = Math.max(pick, notPick)); // we should prev + 1 to offset the negative index
  };

  return findLength(0, -1); //initially the prev will be -1 as we are just starting
};

/*

Tabulation

O(n^2) & O(n^2)

*/

var lengthOfLIS = function (nums) {
  const n = nums.length;

  const dp = Array.from({ length: n + 1 }, () => new Array(n + 1).fill(0));

  for (let i = n - 1; i >= 0; i--) {
    // start from reverse as we need i + 1
    for (prev = i - 1; prev >= -1; prev--) {
      // start from i - 1 as the prev can be only before the ith element and it should be till -1
      const notPick = dp[i + 1][prev + 1];
      let pick = 0;
      if (prev === -1 || nums[prev] < nums[i]) {
        pick = 1 + dp[i + 1][i + 1]; // why i + 1 for prev?
      }

      dp[i][prev + 1] = Math.max(pick, notPick);
    }
  }

  return dp[0][0]; // -1 will be stored at the 0 index as we do -1 + 1 inside the loop
};

/*

Space ops

O(n^2) & O(n)

*/

var lengthOfLIS = function (nums) {
  const n = nums.length;

  let next = new Array(n + 1).fill(0),
    curr = new Array(n + 1).fill(0);

  for (let i = n - 1; i >= 0; i--) {
    for (prev = i - 1; prev >= -1; prev--) {
      const notPick = next[prev + 1];
      let pick = 0;
      if (prev === -1 || nums[prev] < nums[i]) {
        pick = 1 + next[i + 1];
      }

      curr[prev + 1] = Math.max(pick, notPick);
    }
    next = [...curr];
  }

  return next[0];
};

/*

Better

O(n^2) & O(n)

*/

var lengthOfLIS = function (nums) {
  const n = nums.length; // Get the total number of elements in the input array

  let max = 1; // This will store the length of the longest increasing subsequence (LIS) found so far

  // dp[i] will store the length of the longest increasing subsequence ending at index i
  // Initially, each element is itself an LIS of length 1
  const dp = new Array(n).fill(1);

  // Start checking subsequences from the 2nd element (index 1)
  for (let i = 1; i < n; i++) {
    // For each element nums[i], look at all elements before it (nums[0..i-1])
    for (let prev = 0; prev < i; prev++) {
      // If nums[prev] < nums[i], it means nums[i] can extend the subsequence ending at prev
      if (nums[prev] < nums[i]) {
        // Update dp[i] with the maximum LIS length ending at i
        // Either keep current dp[i], or take 1 + dp[prev] (extend LIS at prev)
        dp[i] = Math.max(dp[i], 1 + dp[prev]);
      }
    }

    // Update the global maximum LIS length found so far
    max = Math.max(max, dp[i]);
  }

  // Return the final longest increasing subsequence length
  return max;
};

/*

Optimised - Binary Search

O(nlogn) & O(n)

*/

var lengthOfLIS = function (nums) {
  const n = nums.length;
  if (n === 0) return 0; // Edge case: empty array

  const dp = []; // dp array will store the smallest possible tail elements
  // for increasing subsequences of different lengths

  dp.push(nums[0]); // Start with the first element as the smallest tail
  let len = 1; // Length of LIS so far
  let index; // Variable to store the position returned by binary search

  // Iterate through all elements in the array
  for (let i = 1; i < n; i++) {
    // If current number is greater than the largest element in dp,
    // it extends the LIS — so we push it to dp
    if (dp[dp.length - 1] < nums[i]) {
      dp.push(nums[i]);
      len++;
    }
    // Otherwise, we find the correct position to replace in dp
    // (to maintain smallest possible tail for subsequence of same length)
    else {
      index = lowerBound(dp, 0, dp.length - 1, nums[i]);
      dp[index] = nums[i]; // Replace dp[index] with current element
    }
  }

  // The length of dp array gives the length of the longest increasing subsequence
  return len;
};

const lowerBound = (arr, l, r, target) => {
  while (l <= r) {
    const mid = l + Math.floor((r - l) / 2);

    if (arr[mid] >= target) {
      r = mid - 1;
    } else {
      l = mid + 1;
    }
  }

  return l;
};
