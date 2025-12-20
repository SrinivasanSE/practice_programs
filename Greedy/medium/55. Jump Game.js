// https://leetcode.com/problems/jump-game/description/

/*

Optimal - Greedy
O(n) & O(1)

*/

var canJump = function (nums) {
  let maxReach = 0;

  const n = nums.length;

  for (let i = 0; i < n; i++) {
    if (maxReach < i) return false;
    maxReach = Math.max(maxReach, i + nums[i]);
    if (maxReach >= n - 1) return true;
  }

  return true;
};

// Traversing from backwards to reach first index

var canJump = function (nums) {
  // The index we need to reach (initially the last index)
  let goal = nums.length - 1;

  // Traverse the array from right to left
  // We check which indices can reach the current goal
  for (let i = nums.length - 2; i >= 0; i--) {
    // If from index i we can jump to or beyond the goal,
    // then index i itself becomes the new goal
    if (i + nums[i] >= goal) {
      goal = i;
    }
  }

  // If we managed to move the goal back to index 0,
  // it means we can reach the last index from the start
  return goal === 0;
};
