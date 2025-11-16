// https://leetcode.com/problems/find-the-smallest-divisor-given-a-threshold/description/


/*
Brute force
O(max(nums)*n) & O(1)
*/


const getTotalSum = (arr, num, n) => {
    let total = 0
    for(let i = 0; i < n; i++) {
        total += Math.ceil(arr[i]/num)
    }

    return total
}
var smallestDivisor = function(nums, threshold) {
    const n = nums.length
    let r = Math.max(...nums)

    for(let i = 1; i <= r; i++) {
        if (getTotalSum(nums, i, n) <= threshold) {
            return i
        }
    }
};


/*
Optimal - binary search
O(log(max)*n) & O(1)
*/


var smallestDivisor = function(nums, threshold) {
    const n = nums.length
    let l = 1, r = Math.max(...nums)

    while (l <= r) {
        const mid = l + Math.floor((r - l)/2)
        if (getTotalSum(nums, mid, n) <= threshold) {
            r = mid - 1
        } else {
            l = mid + 1
        }
    }

    return l
};