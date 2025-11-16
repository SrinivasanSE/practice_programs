// https://leetcode.com/problems/find-target-indices-after-sorting-array/description/


var findOccurence = (nums, target, isLeft) => {
    let l = 0, r = nums.length - 1, mid, res = -1

    while (l <= r) {
        mid = l + Math.floor((r - l)/2)

        if (nums[mid] === target) {
            res = mid
            if (isLeft) {
                r = mid - 1
            } else {
                l = mid + 1
            }
        } else if (nums[mid] < target) {
            l = mid + 1
        } else {
            r = mid - 1
        }
    }

    return res
}
var targetIndices = function(nums, target) {
    const res = []
    nums.sort((a, b) => a - b)
    const first = findOccurence(nums, target, true)
    if (first === -1) return res
    const last = findOccurence(nums, target)
    for (let i = first; i <= last; i++) {
        res.push(i)
    }

    return res
};


const findOccurence = (nums, target) => {
    let l = 0, r = nums.length - 1, mid, res = [], found = -1

    while (l <= r) {
        mid = l + Math.floor((r - l) / 2)

        if (nums[mid] === target) {
            found = mid
            break
        } else if (nums[mid] < target) {
            l = mid + 1
        } else {
            r = mid - 1
        }
    }

    if (found === -1) return res

    let i = found
    // go to left to find the first occurence
    while (i >= 0 && nums[i] === target) i--

    i++
    // go from first occurence to the last occurence
    while (i < nums.length && nums[i] === target) {
        res.push(i)
        i++
    }

    return res
}
var targetIndices = function (nums, target) {
    nums.sort((a, b) => a - b)

    return findOccurence(nums, target)
};