// https://leetcode.com/problems/single-element-in-a-sorted-array/description/

/*
Brute
O(n) & O(1)
*/

var singleNonDuplicate = function(nums) {
    const n = nums.length

    for(let i = 0; i < nums.length; i+=2) {
        if (nums[i] != nums[i + 1]) {
            return nums[i]
        }
    }

    return nums[n - 1]
};


/*
Optimal - Binary search
O(logn) & O(1)
*/


var singleNonDuplicate = function(nums) {
    const n = nums.length

    if (n === 1) return nums[0]
    if (nums[0] != nums[1]) return nums[0]
    if (nums[n - 1] != nums[n - 2]) return nums[n - 1]
    let l = 1, r = n - 2

    while (l <= r) {
        const mid = l + Math.floor((r - l)/2)

        if (nums[mid] != nums[mid + 1] && nums[mid] != nums[mid - 1]) {
            return nums[mid]
        }
        /*
        left side - even, odd (single element will be in the right side)
        right side - odd, even (single element will be in the left side)
        */

        if ((mid % 2 === 0 && nums[mid] === nums[mid + 1]) || (mid % 2 === 1 && nums[mid] === nums[mid - 1])) { // if mid is even, next element is same or mid is odd and previous ele is same, we are in the left side
            l = mid + 1
        } else {
            r = mid - 1
        }
    }

    return -1
};
