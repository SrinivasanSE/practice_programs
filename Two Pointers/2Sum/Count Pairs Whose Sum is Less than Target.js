// https://leetcode.com/problems/count-pairs-whose-sum-is-less-than-target/

var countPairs = function(nums, target) {
    let count = 0
    nums.sort((a, b) => a - b)
    const n = nums.length
    let i = 0, j = n - 1
    while (i < j) {
        let sum = nums[i] + nums[j]
        if (sum < target) {
            count += (j - i)
            i++
        }
        else {
            j--
        }
    }

    return count
};
