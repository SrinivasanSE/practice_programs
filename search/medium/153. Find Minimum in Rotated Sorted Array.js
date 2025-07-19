// https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/description/

// without duplicates

var findMin = function(nums) {
    const n = nums.length
    let l = 0, r = n - 1

    while (l < r) {
        let mid = l + Math.floor((r - l)/2)

        if (nums[l] <= nums[r]) {
            return nums[l]
        }

        if (nums[mid] < nums[r]) {
            r = mid
        } else {
            l = mid + 1
        }
    }

    return nums[l]
};

// with duplicates

var findMin = function(nums) {
    let l = 0, r = nums.length - 1;

    while (l < r) {
        let mid = l + Math.floor((r - l) / 2);

        if (nums[mid] < nums[r]) {
            r = mid;
        } else if (nums[mid] > nums[r]) {
            l = mid + 1;
        } else {
            // nums[mid] == nums[r], can't determine, reduce r
            r--;
        }
    }

    return nums[l];
};