// https://leetcode.com/problems/find-the-largest-almost-missing-integer/description/


var largestInteger = function(nums, k) {
    let freq = new Map();
    let n = nums.length;

    // Edge case
    if (n === k) {
        return Math.max(...nums);
    }

    for (let i = 0; i <= n - k; i++) {
        for (let j = 0; j < k; j++) {
            freq.set(nums[i + j], (freq.get(nums[i + j]) || 0) + 1) // count the frequencies in each window
        }
    }

    let max = -1

    for (let [key, count] of freq) {
        if (count == 1) {
            max = Math.max(key, max)
        }
    }

    return max
};