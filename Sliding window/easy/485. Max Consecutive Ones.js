// https://leetcode.com/problems/max-consecutive-ones/description/

// Optimal
// O(n) & O(1)
var findMaxConsecutiveOnes = function (nums) {

    let max = 0
    let count = 0

    for (let i = 0; i < nums.length; i++) {
        if (nums[i] === 0) {
            count = 0
        } else {
            count++
            max = Math.max(count, max)
        }
    }

    return max
};


// Optimal - Sliding window
// O(n) & O(1)

var findMaxConsecutiveOnes = function (nums) {
    let res = 0;
    let left = 0;

    for (let right = 0; right < nums.length; right++) {
        if (nums[right] === 0) { // if we find 0, we move the left after right, to check the next consecutive grp
            left = right + 1;
        } else {
            res = Math.max(res, right - left + 1); // if we keep finding 1, right - left + 1 will give the length
        }
    }

    return res;
};