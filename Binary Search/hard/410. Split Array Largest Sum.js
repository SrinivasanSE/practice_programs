// https://leetcode.com/problems/split-array-largest-sum/description/

// Similar to book allocation program
// Same for Painter's partition

const isPossible = (arr, s, k, n) => {
    let sum = arr[0]
    let count = 1
    for(let i = 1; i < n; i++) {
        if (sum + arr[i] > s) {
            count+=1
            sum = arr[i]
        } else {
            sum += arr[i]
        }
        if (count > k) return false
    }

    return true
}
var splitArray = function(nums, k) {
    const n = nums.length
    if (n < k) {
        return -1
    }
    let l = Math.max(...nums)
    let r = nums.reduce((accum, curr) => accum + curr, 0)
    for(let i = l; i <= r; i++) {
        if (isPossible(nums, i, k, n)) {
            return i
        }
    }

    return -1
};


const isPossibleV2 = (arr, s, k, n) => {
    let sum = 0
    let count = 1
    for(let i = 0; i < n; i++) {
        sum += arr[i]
        if (sum > s) {
            count+=1
            sum = arr[i]
        }
        if (count > k) return false
    }

    return true
}

var splitArray = function(nums, k) {
    const n = nums.length
    if (n < k) {
        return -1
    }
    let l = Math.max(...nums)
    let r = nums.reduce((accum, curr) => accum + curr, 0)
    while (l <= r) {
        const mid = l + Math.floor((r - l)/2)
        if (isPossible(nums, mid, k, n)) {
            r = mid - 1
        } else {
            l = mid + 1
        }
    }

    return l
};