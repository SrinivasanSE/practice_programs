// https://leetcode.com/problems/product-of-array-except-self/description/


/*

Brute

O(n) & O(n)

*/


var productExceptSelf = function(nums) {
    const n = nums.length

    // prefix[i] = product of all elements before index i
    const prefix = new Array(n)
    // suffix[i] = product of all elements after index i
    const suffix = new Array(n)

    prefix[0] = 1

    // Build prefix array
    // For each index i, multiply the prefix up to (i-1) by nums[i-1]
    for (let i = 1; i < n; i++) {
        prefix[i] = prefix[i - 1] * nums[i - 1]
    }

    suffix[n - 1] = 1

    // Build suffix array
    // For each index i, multiply the suffix from (i+1) by nums[i+1]
    for (let i = n - 2; i >= 0; i--) {
        suffix[i] = suffix[i + 1] * nums[i + 1]
    }

    let out = []

    // Multiply prefix and suffix for each index
    // This gives the product of all elements except nums[i]
    for (let i = 0; i < n; i++) {
        out.push(prefix[i] * suffix[i])
    }

    return out
}


/*

Optimal

O(n) & O(1)

*/

var productExceptSelf = function (nums) {
    const n = nums.length
    const out = new Array(n)

    // Step 1: Fill output with prefix products
    // out[i] = product of all elements before i
    out[0] = 1
    for (let i = 1; i < n; i++) {
        out[i] = out[i - 1] * nums[i - 1]
    }

    // Step 2: Multiply with suffix products (from right to left)
    let suffixProduct = 1
    for (let i = n - 1; i >= 0; i--) {
        // Multiply existing prefix product with suffix product
        out[i] *= suffixProduct
        // Update suffixProduct to include current element
        suffixProduct *= nums[i]
    }

    return out
}
