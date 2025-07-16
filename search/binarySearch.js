// https://leetcode.com/problems/binary-search/description/



var search = function(nums, target) {
    const n = nums.length
    let l = 0
    let r = n - 1

    while (l <= r) {
        let mid = l + Math.floor((r - l)/2)

        if (nums[mid] === target) {
            return mid
        }

        if (nums[mid] < target) {
            l = mid + 1
        } else {
            r = mid - 1
        }
    }

    return -1
};



const binarySearch = (nums, l, r, target) => {

    if (l > r) return -1
    const mid = l + Math.floor((r - l)/2)
    if (nums[mid] === target) return mid

    if (nums[mid] < target) return binarySearch(nums, mid + 1, r, target)

    return binarySearch(nums, l, mid - 1, target)
}
var search = function(nums, target) {
    const n = nums.length
    let l = 0
    let r = n - 1

    return binarySearch(nums, l, r, target)
};