// https://leetcode.com/problems/sort-colors/description/

/*
Brute Force - Use sorting
*/

/*
Better
O(N) + O(N) & O(1)
*/


var sortColors = function(nums) {
    let zC = 0, oC = 0
    const n = nums.length
    for(let num of nums) {
        if (num === 0) {
            zC++
        } else if (num === 1) {
            oC++
        }
    }

    for(let i = 0; i < zC; i++) {
        nums[i] = 0
    }

    for(let i = zC; i < zC + oC; i++) {
        nums[i] = 1
    }

    for(let i = zC + oC; i < n; i++) {
        nums[i] = 2
    }

};

/*
Optimal - Dutch National Flag Algo

This algorithm contains 3 pointers i.e. low, mid, and high, and 3 main rules.  The rules are the following:

arr[0….low-1] contains 0. [Extreme left part]
arr[low….mid-1] contains 1.
arr[high+1….n-1] contains 2. [Extreme right part], n = size of the array
The middle part i.e. arr[mid….high] is the unsorted segment.

O(N) & O(1)
*/


var sortColors = function(nums) {
    const n = nums.length
    let low = 0, mid = 0, high = n - 1

    while (mid <= high) { // notice the condition
        if (nums[mid] === 2) { // we swap high with mid and the high index might contain 0/1, we don't move the mid since the mid will contain 0 or 1s which needs to be moved
            [nums[high], nums[mid]] = [nums[mid], nums[high]]
            high--
        } else if (nums[mid] === 0) { // if it's 0, we move it to the left part and the low will contain 1, so we swap it and extend the mid
            [nums[mid], nums[low]] = [nums[low], nums[mid]]
            low++
            mid++
        } else { // if the mid is already having 1, we just shrink the window
            mid++
        }
    }

};