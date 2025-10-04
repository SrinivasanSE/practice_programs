// https://leetcode.com/problems/jump-game/description/


/*

Optimal - Greedy
O(n) & O(1)

*/


var canJump = function(nums) {
    let maxReach = 0

    const n = nums.length

    for (let i = 0; i < n; i++) {
        if (maxReach < i) return false
        maxReach = Math.max(maxReach, i + nums[i])
        if (maxReach >= n - 1) return true
        
    }

    return true
};