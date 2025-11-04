// https://leetcode.com/problems/squares-of-a-sorted-array/description/

/*

Optimal

O(n) & O(n)

*/


var sortedSquares = function(nums) {
    const n = nums.length
    const result = new Array(n)
    let l = 0, r = n - 1, k = n - 1

    while (l <= r) {
        if (Math.abs(nums[l]) < Math.abs(nums[r])) { //if the right element is greater, assign this element to the result array at the last index and move right towards left
            result[k] = nums[r]*nums[r]
            r--
        } else { // if the element at the left is greater, assign it and move the left towards right 
            result[k] = nums[l]*nums[l]
            l++
        }
        k-- // keep decrementing the k index as we are assigning the element to the result in both if and else
    }
    

    return result
};