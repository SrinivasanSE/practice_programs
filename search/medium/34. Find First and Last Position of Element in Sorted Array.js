// https://leetcode.com/problems/find-first-and-last-position-of-element-in-sorted-array/description/


const binarySearch = (nums, target, n, isSearchingLeft) => {
    let l = 0, r = n - 1, res = -1

    while (l <= r) {
        let mid = l + Math.floor((r - l)/2)
         if (nums[mid] < target) {
            l = mid + 1
        } else if (nums[mid] > target) {
            r = mid - 1
        } else {
            res = mid
            if (isSearchingLeft) {
                r = mid - 1
            } else {
                l = mid + 1
            }
        }
    }

    return res
}


var searchRange = function(nums, target) {
    const n = nums.length
    const first = binarySearch(nums, target, n, true)
    if (first === -1) return [-1, -1]
    const last = binarySearch(nums, target, n, false)
    return [first, last]
};


const firstOccurence = (nums, target, n) => {
    let l = 0, r = n - 1, res = -1

    while (l <= r) {
        let mid = l + Math.floor((r - l)/2)
        if (nums[mid] === target) {
            res = mid
            r = mid - 1
        } else if (nums[mid] < target) {
            l = mid + 1
        } else {
            r = mid - 1
        }
    }

    return res
}

const lastOccurence = (nums, target, n) => {
    let l = 0
    let r = n - 1

    let res = -1

    while (l <= r) {
        let mid = l + Math.floor((r - l)/2)
        if (nums[mid] === target) {
            res = mid
            l = mid + 1
        } else if (nums[mid] < target) {
            l = mid + 1
        } else {
            r = mid - 1
        }
    }

    return res
}

var searchRange = function(nums, target) {
    const n = nums.length
    const first = firstOccurence(nums, target, n)
    if (first === -1) return [-1, -1]
    const last = lastOccurence(nums, target, n)
    return [first, last]
};