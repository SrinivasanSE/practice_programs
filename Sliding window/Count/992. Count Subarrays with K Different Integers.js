// https://leetcode.com/problems/subarrays-with-k-different-integers/description/

// For longest substring, refer Sliding window/medium/Longest Substring with K Uniques.js


/*

Better

O(2n) & O(1)

*/



var atMost = (nums, k) => {
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

// if only numbers from 1 to n will be in the array, we can use freq array instead of map


var atMost = (nums, k) => {
    const n = nums.length
    let count = 0, left = 0, distincts = 0
    const freq = new Array(n + 1).fill(0)

    for (let right = 0; right < n; right++) {
        freq[nums[right]]++
        if (freq[nums[right]] === 1) distincts++
        while (distincts > k) {
            freq[nums[left]]--

            if (freq[nums[left]] === 0) distincts--

            left++
        }

        count += right - left + 1
    }

    return count
}

var subarraysWithKDistinct = function (nums, k) {
    return atMost(nums, k) - atMost(nums, k - 1)
};


/*

Optimal

O(n) & O(n)

*/

var subarraysWithKDistinct = function (nums, k) {
    const n = nums.length
    let hashmap = new Map() // we can use array as well if the numbers will be only from 1 to nums.length
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
        // 
        if (k === 0) { // if we have exactly k distinct, we need to check how many duplicates are there and calculate the sub arr
            // Each time it moves start forward, the window still contains exactly k distinct numbers (since only duplicates are removed).
            while (hashmap.get(nums[start]) > 1) {
                hashmap.set(nums[start], hashmap.get(nums[start]) - 1)
                start++
                currCount++ //  counts the number of ways to choose a starting index for a valid subarray ending at end
            }

            totalCount += (currCount + 1) // add the count, 
        }
    }

    return totalCount
};