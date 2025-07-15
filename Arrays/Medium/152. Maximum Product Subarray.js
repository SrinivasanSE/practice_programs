// https://leetcode.com/problems/maximum-product-subarray/description/


/*
Brute force - loops
O(n^2) & O(1)
*/




function maxProductSubArray(nums) {
    let result = nums[0];
    for (let i = 0; i < nums.length - 1; i++) {
        let p = nums[i];
        for (let j = i + 1; j < nums.length; j++) {
            result = Math.max(result, p);
            p *= nums[j];
        }
        result = Math.max(result, p); // manages (n-1)th term
    }
    return result;
}

/*
Optimal 1 - using prefix and suffix
O(n) & O(1)
*/

var maxProduct = function(nums) {
    const n = nums.length
    let maxProduct = -Infinity, prefix = 1, suffix = 1

    for(let i = 0; i < n; i++) {
        if (prefix == 0) prefix = 1
        if (suffix == 0) suffix = 1

        prefix = prefix*nums[i]
        suffix = suffix*nums[n - i - 1]

        maxProduct = Math.max(maxProduct,prefix, suffix)
    }

    return maxProduct
};

/*
Optimal 2 - Kadane's algo

Why do we track both prevMax and prevMin?

Multiplying by a negative number can turn a large positive product into a negative one, and vice versa.
So, at every step, we keep track of both the maximum and minimum products ending at the current index.

O(n) & O(1)
*/


var maxProduct = function(nums) {
    const n = nums.length
    let maxProduct = nums[0], prevMax = nums[0], prevMin = nums[0], candidates

    for(let i = 1; i < n; i++) {
        candidates = [nums[i], nums[i]*prevMax, nums[i]*prevMin]
        prevMin = Math.min(...candidates)
        prevMax = Math.max(...candidates)

        maxProduct = Math.max(maxProduct, prevMax)
    }

    return maxProduct
};