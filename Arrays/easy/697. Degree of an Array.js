// https://leetcode.com/problems/degree-of-an-array/description/


// Find the smallest subarray that contains all occurrences of at least one of the elements that reach the max frequency.


var findShortestSubArray = function (nums) {
    const n = nums.length

    // Maps to store frequency, first occurrence, and last occurrence of each number
    let freq = new Map()
    let first = new Map()
    let last = new Map()

    // 'degree' will store the maximum frequency (degree of the array)
    let degree = 0, num

    // Step 1: Collect data while traversing the array
    for (let i = 0; i < n; i++) {
        num = nums[i]

        // Update frequency of current number
        freq.set(num, (freq.get(num) || 0) + 1)

        // Update degree if this number's frequency becomes the highest
        degree = Math.max(degree, freq.get(num))

        // Store the first occurrence index (only once)
        if (!first.has(num)) {
            first.set(num, i)
        }

        // Always update last occurrence index
        last.set(num, i)
    }

    // Step 2: Find smallest subarray length among numbers with max frequency (degree)
    let res = n

    for (let [num, count] of freq) {
        // Consider only numbers that contribute to the array's degree
        if (count === degree) {
            // Calculate the subarray length covering all occurrences of this number
            // (from its first index to its last index)
            res = Math.min(res, last.get(num) - first.get(num) + 1)
        }
    }

    // Step 3: Return the smallest such length
    return res
};
