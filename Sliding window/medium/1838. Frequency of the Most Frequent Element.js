// https://leetcode.com/problems/frequency-of-the-most-frequent-element/description/


/*
Better - Sliding approach
O(nlogn) & O(1)
*/

/*
Current window = [1, 2, 4], sum = 7  
Ideal sum = 12  
Cost = 12 - 7 = 5
*/

var maxFrequency = function(nums, k) {
    let left = 0,  windowSum = 0, cost = 0, windowSize = 0, max = 0
    nums.sort((a, b) => a - b)
    for(let right = 0; right < nums.length; right++) {
        windowSum += nums[right]
        windowSize = (right - left) + 1
        cost = windowSize * nums[right] - windowSum // ideal total sum if all were same as nums[right] - current sum will give us the total operation needed
        while (cost > k && left < right) {
            windowSum -= nums[left]
            left++
            windowSize--
            cost = windowSize * nums[right] - windowSum
        }

        max = Math.max(max, right - left + 1) // the windowSize will give us the ans, all the elements in that window can be made to match the target
    }

    return max
};


/*
Optimal - Advanced Sliding approach
O(nlogn) & O(1)
*/

var maxFrequency = function(nums, k) {
    let left = 0,  windowSum = 0, cost = 0, windowSize = 0
    nums.sort((a, b) => a - b)
    const n = nums.length
    for(let right = 0; right < n; right++) {
        windowSum += nums[right]
        windowSize = (right - left) + 1
        cost = windowSize * nums[right] - windowSum
        if (cost > k && left < right) { // we use if block here instead of while to find the largest window
            windowSum -= nums[left]
            left++
        }

    }

    return n - left 
};