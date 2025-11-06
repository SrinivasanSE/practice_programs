// https://leetcode.com/problems/remove-element/description/

var removeElement = function(nums, val) {
    const n = nums.length

    let i = 0
    for (let j = 0; j < n; j++) {
        if (nums[j] != val) {
            nums[i++] = nums[j]
        }
    }

    return i
};