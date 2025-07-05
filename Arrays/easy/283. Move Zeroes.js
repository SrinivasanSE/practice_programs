// https://leetcode.com/problems/move-zeroes/description/


// Brute force
// O(n) & O(n)
var moveZeroes = function(nums) {
    const n = nums.length
    const temp = new Array(n).fill(0)
    let j = 0
    for(let i = 0; i < n; i++) {
        if (nums[i] != 0) {
            temp[j] = nums[i]
            j++
        }
    }

    for(let i = 0; i < n; i++) {
        nums[i] = temp[i]
    }
};


// Optimal

// O(n) & O(1)

var moveZeroes = function(nums) {
    const n = nums.length
    let j = 0 // Tracks the next available spot to place the nonzero element

    for(let i = 0; i < n; i++) {
        if (nums[i] != 0) {
            [nums[i], nums[j]] = [nums[j], nums[i]]
            j++
        }
    }
};