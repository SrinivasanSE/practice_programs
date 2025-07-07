// https://leetcode.com/problems/majority-element-ii/description/

// Similar to Arrays/easy/169. Majority Element.js

/*

Optimal - Moore voting algo
O(N) & O(1)

*/

// There can be at most max 2 elements with the frequency greater than n/3, so we can keep two pointers and track

var majorityElement = function(nums) {
    let cnt1 = 0, cnt2 = 0, ele1, ele2

    const n = nums.length

    for(let i = 0; i < n; i++) {

        if (cnt1 === 0 && nums[i] != ele2) {
            cnt1++
            ele1 = nums[i]
        } else if (cnt2 === 0 && nums[i] != ele1) {
            cnt2++
            ele2 = nums[i]
        } else if (ele1 === nums[i]) {
            cnt1++
        } else if (ele2 === nums[i]) {
            cnt2++
        } else {
            cnt1--
            cnt2--
        }
    }

    cnt1 = 0, cnt2 = 0

    for(let i = 0; i < n; i++) {
        if (nums[i] === ele1) {
            cnt1++
        } else if (nums[i] === ele2) {
            cnt2++
        }
    }
    const res = []
    if (cnt1 > Math.floor(n/3)) {
        res.push(ele1)
    } 
    if (cnt2 > Math.floor(n/3)) {
        res.push(ele2)
    }

    return res
};