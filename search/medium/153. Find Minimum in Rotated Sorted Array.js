// https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/description/
// https://leetcode.com/problems/find-minimum-in-rotated-sorted-array-ii/description/

// without duplicates

var findMin = function(nums) {
    let l = 0, r = nums.length - 1;
    while (l < r) { //should be l < r and not l <= r, when l === r, that's the min index
        let mid = l + Math.floor((r - l) / 2);
        if (nums[mid] < nums[r]) {
            // Minimum is in the left part including mid
            r = mid;
        } else {
            // Minimum is in the right part excluding mid
            l = mid + 1;
        }
    }
    return nums[l];
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