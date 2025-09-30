// https://leetcode.com/problems/subarrays-with-k-different-integers/description/


/*

Better

O(2n) & O(1)

*/

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */


const atMost = (nums, k) => {
    const n = nums.length
    const map = new Map()
    let count = 0, start = 0
    for (let end = 0; end < n; end++) {
        map.set(nums[end], (map.get(nums[end]) || 0) + 1)

        while (map.size > k) {
            map.set(nums[start], map.get(nums[start]) - 1)
            if (map.get(nums[start]) === 0) {
                map.delete(nums[start])
            }
            start++
        }

        count += (end - start + 1)
    }

    return count
}
var subarraysWithKDistinct = function (nums, k) {
    return atMost(nums, k) - atMost(nums, k - 1) // we can find exactly k by this logic
};


/*

Optimal
O(n) & O(n)

*/

var subarraysWithKDistinct = function (nums, k) {
    const n = nums.length
    let hashmap = new Map()
    let totalCount = 0, currCount = 0, start = 0

    for (let end = 0; end < n; end++) {
        hashmap.set(nums[end], (hashmap.get(nums[end]) || 0) + 1)

        if (hashmap.get(nums[end]) === 1) k--

        if (k < 0) { // only k distinct allowed, shrink the window
            hashmap.set(nums[start], hashmap.get(nums[start]) - 1)
            if (hashmap.get(nums[start]) === 0) k++
            start++
            currCount = 0 // it is reset here since the window changes 
        }

        if (k === 0) { // if we have exactly k distinct, we need to check how many duplicates are there and calculate the sub arr
            while (hashmap.get(nums[start]) > 1) {
                hashmap.set(nums[start], hashmap.get(nums[start]) - 1)
                start++
                currCount++
            }

            totalCount += (currCount + 1) // add the count, 
        }
    }

    return totalCount
};