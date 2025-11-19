// https://leetcode.com/problems/first-missing-positive/description/
// https://www.geeksforgeeks.org/find-the-smallest-positive-number-missing-from-an-unsorted-array/

/*

Brute

O(n) & O(n)

*/


var firstMissingPositive = function(nums) {
    const n = nums.length
    const map = new Array(n + 1)
    for (let num of nums) {
       if (num > 0 && num <= n) {
        map[num] = (map[num] || 0) + 1
       }
    }
    for (let i = 1; i <= n; i++) {
        if (!map[i]) return i
    }

    return n + 1
};

/*

Better

O(n) & O(1)

*/


var firstMissingPositive = function(nums) {
    const n = nums.length

    let contains1 = false

    for (let i = 0; i < n; i++)  { // change all the negative numbers and greater than n to 1 since those are not needed and also for negating, 
    // it's required as negative and greater than n index won't be available in the arr
        if (nums[i] === 1) contains1 = true // since all will be converted to 1, we need to know if 1 was there or not
        if (nums[i] <= 0 || nums[i] > n) nums[i] = 1
    }

    if (!contains1) return 1 // return here itself if 1 itself is not there

    let index
    for (let i = 0; i < n; i++) {
        index = Math.abs(nums[i])
        if (nums[index - 1] > 0) { // negate the numbers
            nums[index - 1]*=-1
        }
    }

    for (let i = 0; i < n; i++) { // if any number is positive, that means that index is not available in the arr, so return that index + 1
        if (nums[i] > 0) return i + 1
    }

    return n + 1
};


/*

Optimal - Cycle sort

O(n) & O(1)

*/


var firstMissingPositive = function(nums) {
    const n = nums.length

    let i = 0, crtIdx

    while (i < n) { // sort the numbers using cycle sort and ignore negative and greater than n numbers
        crtIdx = nums[i] - 1
        if (nums[i] > 0 && nums[i] <= n && nums[i] != nums[crtIdx]) {
            [nums[i], nums[crtIdx]] = [nums[crtIdx], nums[i]]
        } else {
            i++
        }
    }

    for (let i = 0; i < n; i++) { // the numbers will be in sorted position now, input = [3,4,-1,1], sorted = [1, -1, 3, 4], 2 is missing, -1 != 2, so return i + 1 = 2
        if (nums[i] != i + 1) return i + 1
    }
    

    return n + 1
};