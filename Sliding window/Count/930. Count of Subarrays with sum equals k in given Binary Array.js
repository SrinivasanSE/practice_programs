// https://www.geeksforgeeks.org/count-of-subarrays-with-sum-equals-k-in-given-binary-array/
// https://leetcode.com/problems/binary-subarrays-with-sum/


/*

Better
O(n) & O(n)

*/

// Prefix Sum - Works for both positive and negative numbers

/*

sum(l..r)=prefixSum[r]−prefixSum[l−1]

prefixSum[i]−prefixSum[j−1] = goal
prefixSum[j−1] = prefixSum[i] − goal

*/

var numSubarraysWithSum = function(nums, goal) {
    let sum = 0, count = 0
    const n = nums.length

    let prefix = new Map()
    prefix.set(0, 1)
    for (let i = 0; i < n; i++) {
        sum += nums[i]

        if (prefix.has(sum - goal)) { // If yes, prefix[sum - goal] tells us how many subarrays ending at i have sum = goal.
            count += prefix.get(sum - goal)
        }

        prefix.set(sum, (prefix.get(sum) || 0) + 1)
    }

    return count
};

/*

O(2*2n) & O(1)

*/

const atMost = (nums, goal) => {
    if (goal < 0) return 0
    let sum = 0
    let start = 0, count = 0
    const n = nums.length
    for (let right = 0; right < n; right++) {
        sum += nums[right]

        while (sum > goal) {
            sum -= nums[start]
            start++
        }

        count += (right - start + 1)
    }

    return count

}
var numSubarraysWithSum = function (nums, goal) { // works only for positive numbers
    return atMost(nums, goal) - atMost(nums, goal - 1) // first func call will include counts of arr with sum <=k, from this if we subtract the count of arr with sum less than k, we can get the ans
}
