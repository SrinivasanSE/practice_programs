// https://leetcode.com/problems/majority-element-ii/description/

// Similar to Arrays/easy/169. Majority Element.js

/*
Better - use hashmap
O(N) & O(N)
*/

/*

Optimal - Moore voting algo
O(N) & O(1)

*/

// There can be at most max 2 elements with the frequency greater than n/3, so we can keep two pointers and track

var majorityElement = function (nums) {
    const n = nums.length

    let count1 = 0, count2 = 0
    let candidate1, candidate2

    for (let num of nums) {
        if (candidate1 === num) {
            count1++
        }
        else if (candidate2 === num) {
            count2++
        }
        else if (count1 === 0) {
            count1 = 1
            candidate1 = num

        } else if (count2 === 0) {
            count2 = 1
            candidate2 = num
        } else {
            count1--
            count2--
        }
    }

    count1 = 0, count2 = 0
    for (let num of nums) {
        if (num === candidate1) count1++
        if (num === candidate2) count2++
    }

    const res = []

    if (count1 > Math.floor(n / 3)) {
        res.push(candidate1)
    }

    if (count2 > Math.floor(n / 3)) {
        res.push(candidate2)
    }

    return res
};