// https://leetcode.com/problems/next-greater-element-ii/description/


/*
O(4n) * O(n)

*/


var nextGreaterElements = function(nums) {
    const n = nums.length

    const res = new Array(n).fill(-1)
    let top = -1, stk = [], temp
    for (let i = 2*n - 1; i >= 0; i--) {
        temp = i % n
        while (top >= 0 && stk[top] <= nums[temp]) {
            stk.pop()
            top--
        }

        if (top >= 0 && i < n) {
            res[i] = stk[top]
        }

        stk.push(nums[temp])
        top++
    }

    return res
};