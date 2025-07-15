// https://www.geeksforgeeks.org/longest-sub-array-sum-k/


class Solution {
    longestSubarray(arr, k) {
        // code here
        let sum = 0
        const n = arr.length
        let prefix = new Map()
        let max = 0
        for (let i = 0; i < n; i++) {
            sum += arr[i]
            const req = sum - k
            if (req === 0) {
                max = i + 1
            } else {
                if (prefix.has(req)) {
                    max = Math.max(max, i - prefix.get(req))
                } else {
                    prefix.set(sum, i)
                }
            }
        }
        return max

    }
}

// Longest subarray with sum 0

function maxLen(arr) {
    // Your code goes here

    let sum = 0, hashmap = new Map()

    const n = arr.length
    let res = 0

    for (let i = 0; i < n; i++) {
        sum += arr[i]
        if (sum === 0) {
            res = i + 1
        } else {
            if (hashmap.has(sum)) {
                res = Math.max(res, i - hashmap.get(sum))
            } else {
                hashmap.set(sum, i)
            }
        }
    }
    return res

}

