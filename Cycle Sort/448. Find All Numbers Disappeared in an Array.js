// https://leetcode.com/problems/find-all-numbers-disappeared-in-an-array/description/


/*

Optimal - Cycle sort

O(n) & O(1)

*/


var findDisappearedNumbers = function (nums) {
    const n = nums.length

    let i = 0, correctIndex

    while (i < n) {
        correctIndex = nums[i] - 1
        if (nums[i] != nums[correctIndex]) {
            [nums[i], nums[correctIndex]] = [nums[correctIndex], nums[i]]
        } else {
            i++
        }
    }

    let res = []

    for (let i = 0; i < n; i++) { // the arr would be in sorted state now
        if (nums[i] != i + 1) res.push(i + 1)
    }

    return res
};


/*

Optimal 

O(n) & O(1)

*/


var findDisappearedNumbers = function (nums) {
    const n = nums.length

    for (let i = 0; i < n; i++) {

        let index = Math.abs(nums[i]) - 1;
        if (nums[index] > 0) {
            nums[index] = -nums[index];
        }
    }

    // nums - [-4, -3, -2, -7, 8, 2, -3, -1], 5,6 is missing here, so at that place, the number will be still positive, so using that logic, we can get the missing numbers

    let res = []

    for (let i = 0; i < n; i++) {
        if (nums[i] > 0) res.push(i + 1)
    }

    return res
};