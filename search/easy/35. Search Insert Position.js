// https://leetcode.com/problems/search-insert-position/description/


var searchInsert = function(nums, target) {
    const n = nums.length
    let l = 0
    let r = n - 1, mid

    while (l <= r) {
        mid = l + Math.floor((r - l)/2)

        if (nums[mid] >= target) {
            r = mid - 1
        } else {
            l = mid + 1
        }
    }
    return l
};