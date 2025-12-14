// https://leetcode.com/problems/count-number-of-nice-subarrays/

// Similar to 930

// O(n) & O(n)

var numberOfSubarrays = (nums, k) => {
  const n = nums.length;
  let sum = 0,
    count = 0;
  const prefixMap = new Map();
  prefixMap.set(0, 1);
  for (let right = 0; right < n; right++) {
    sum += nums[right] % 2;

    if (prefixMap.has(sum - k)) {
      count += prefixMap.get(sum - k);
    }

    prefixMap.set(sum, (prefixMap.get(sum) || 0) + 1);
  }

  return count;
};

// O(2n*2) & O(1)

const atMost = (nums, k) => {
  const n = nums.length;
  let left = 0,
    count = 0;

  for (let right = 0; right < n; right++) {
    k -= nums[right] % 2;

    while (k < 0) {
      k += nums[left] % 2;
      left++;
    }

    count += right - left + 1;
  }

  return count;
};

var numberOfSubarrays = function (nums, k) {
  return atMost(nums, k) - atMost(nums, k - 1);
};

// O(n) & O(1)

/*

In this algorithm, prefix represents the number of valid starting positions (left indices) for subarrays ending at the current right index that contain exactly k odd numbers.

More intuitively:

When the window [left, right] contains exactly k odd numbers, there may be multiple possible left positions that yield a valid subarray ending at right.
These are the positions where, if you started a subarray, it would include exactly k odds up to right.
prefix counts how many such left positions there are.


How does it work in the code?

Each time you increment right and the window reaches exactly k odds, you start moving left to the right (shrinking the window from the left).
For every left you move past an even number, the count of odds in the window doesn't change, so the window is still valid (still has k odds), and you increment prefix.
When you move past an odd, the window now has fewer than k odds, so you stop.
At this point, prefix is the number of valid ways you could start a subarray ending at right with exactly k odds.

*/

var numberOfSubarrays = (nums, k) => {
  const n = nums.length;
  let odd = 0,
    prefix = 0,
    count = 0,
    left = 0;
  for (let right = 0; right < n; right++) {
    if (nums[right] % 2) {
      odd++;
      prefix = 0; // we reset the prefix to calculate it again,
      // we don't reset if it's even, because the prefix is still valid and subarr contains only k odds,
      // we just extend the end [0, 1] -> [0, 2] if [0, 1] contains k odds and nums[right] is even, then [0, 2] also contains k odds only
    }

    while (odd === k && left <= right) {
      if (nums[left] % 2) odd--;
      left++;
      prefix++; // we calculate how many ways you could start a subarray ending at right with exactly k odds.
    }

    count += prefix;
  }

  return count;
};
