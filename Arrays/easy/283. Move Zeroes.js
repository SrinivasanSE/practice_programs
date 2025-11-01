// https://leetcode.com/problems/move-zeroes/description/
// https://leetcode.com/problems/apply-operations-to-an-array/description/

// Move zeros to end

/*

Brute - Using extra array

O(n) & O(n)

*/

var moveZeroes = function (nums) {
    const n = nums.length
    const temp = new Array(n).fill(0) // fill all with zero
    let j = 0
    for (let i = 0; i < n; i++) {
        if (nums[i] != 0) {
            temp[j] = nums[i]
            j++
        }
    }

    for (let i = 0; i < n; i++) {
        nums[i] = temp[i]
    }
};

/*

Better - Modifying same array

O(n) & O(1)

*/

var moveZeroes = function (nums) {

    let position = 0;
    for (let i = 0; i < nums.length; i++) {
        if (nums[i] !== 0) {
            nums[position] = nums[i];
            position++;
        }
    }
    for (let i = position; i < nums.length; i++) {
        nums[i] = 0;
    }
};


/*

Optimal

O(n) & O(1)

*/

var moveZeroes = function (nums) {
    const n = nums.length
    let j = 0 // Tracks the next available spot to place the nonzero element

    for (let i = 0; i < n; i++) {  // [1, 2, 0, 0, 3, 4, 0, 5]
        //        j     i
        if (nums[i] != 0) {
            [nums[i], nums[j]] = [nums[j], nums[i]]
            j++
        }
    }
};