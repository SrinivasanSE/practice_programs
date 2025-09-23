// https://leetcode.com/problems/trapping-rain-water/description/

/*

Brute
O(n) & O(2n)

*/


/**
 * @param {number[]} height
 * @return {number}
 */
var trap = function(height) {
    let capacity = 0
    const n = height.length
    let prefix = new Array(n)
    let suffix = new Array(n)
    prefix[0] = height[0]
    suffix[n - 1] = height[n - 1] 
    for (let i = 1; i < n; i++) {
        prefix[i] = Math.max(prefix[i - 1], height[i])
        suffix[n - i - 1] = Math.max(suffix[n - i], height[n - i - 1])
    }
    let leftMax, rightMax
    for (let i = 0; i < n; i++) {
        leftMax = prefix[i], rightMax = suffix[i]
        if (height[i] < leftMax && height[i] < rightMax) {
            capacity += (Math.min(leftMax, rightMax) - height[i])
        }
    }

    return capacity
};


/*

Optimal - Understand this sol more

O(n) & O(1)

*/

var trap = function(height) {
    let capacity = 0
    const n = height.length
    let l = 0, r = n - 1, leftMax = height[l], rightMax = height[r]

    while (l < r) {
        if (leftMax < rightMax) {
            l++
            leftMax = Math.max(leftMax, height[l])
            capacity += (leftMax - height[l])
        } else {
            r--
            rightMax = Math.max(rightMax, height[r])
            capacity += (rightMax - height[r])
        }
    }

    return capacity
};