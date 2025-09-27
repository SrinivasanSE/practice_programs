// https://leetcode.com/problems/sliding-window-maximum/description/

/*
Optimal - Using dequeue

O(2n) & O(k) + O(n - k)

*/

var maxSlidingWindow = function(nums, k) {
    let output = [], dequeue = []
    const n = nums.length
    for(let i = 0; i < n; i++) {
        if (dequeue.length > 0 && dequeue[0] <= i - k) { // pop when the max element is not within the current window
            dequeue.shift()
        }
        
        while (dequeue.length > 0 && nums[dequeue[dequeue.length - 1]] < nums[i]) { // pop the elements which are less than the curr element
            dequeue.pop()
        }

        dequeue.push(i)
        if (i >= k - 1) { // when we reach the k size, push the front element from the dequeue which holds the max
        output.push(nums[dequeue[0]])
        }
    }

    return output
};