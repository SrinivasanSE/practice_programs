// https://leetcode.com/problems/subarray-sum-equals-k/description/


var subarraySum = function(nums, k) {
    
    let count = 0
    let prefix = new Map()
    prefix.set(0, 1) // This is important to check if the whole subarray equals k
    let sum = 0, req
    const n = nums.length
    for(let i = 0; i < n; i++ ) {
        sum += nums[i]
        req = sum - k
        if (prefix.has(req)) {
            count+= prefix.get(req)
        }
        prefix.set(sum, (prefix.get(sum) || 0) + 1)
    }
    return count
};