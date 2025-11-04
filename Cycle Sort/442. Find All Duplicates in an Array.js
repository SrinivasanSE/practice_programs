// https://leetcode.com/problems/find-all-duplicates-in-an-array/description/


/*

Brute

O(n) & O(n)

*/


var findDuplicates = function(nums) {
    const n = nums.length
    const freq = new Array(n + 1)

    let res = []

    for (let num of nums) {
        freq[num] = (freq[num] || 0) + 1
        if (freq[num] > 1) res.push(num)
    }

    return res
};

/*

Optimal - Position tracking

O(n) & O(1)

*/


var findDuplicates = function(nums) {
    const n = nums.length
    let res = []

    for (let i = 0; i < n; i++) {
        let ind = Math.abs(nums[i])
        if (nums[ind - 1] > 0) nums[ind - 1] *= -1
        else res.push(ind)
    }

    return res
};

/*

Optimal - Cycle sort

*/

var findDuplicates = function (nums) {
    const n = nums.length
    let res = [], correctIndex

    let i = 0

    while (i < n) {
        correctIndex = nums[i] - 1
        if (nums[i] != nums[correctIndex]) {
            [nums[i], nums[correctIndex]] = [nums[correctIndex], nums[i]]
        } else {
            i++
        }
    }

    for (let i = 0; i < n; i++) {
        if (nums[i] != i + 1) {
            res.push(nums[i])
        }
    }

    return res
};