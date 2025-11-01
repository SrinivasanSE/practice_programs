// https://www.geeksforgeeks.org/longest-sub-array-sum-k/


class Solution {
    longestSubarray(arr, k) {
        // code here
        let sum = 0, req, max = 0
        let prefixSum = new Map()
        const n = arr.length

        for (let i = 0; i < n; i++) {
            sum += arr[i]
            req = sum - k

            if (req === 0) {
                max = i + 1
            }

            if (prefixSum.has(req)) {
                max = Math.max(max, i - prefixSum.get(req))
            }

            if (!prefixSum.has(sum)) {
                prefixSum.set(sum, i)
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
                hashmap.set(sum, i) // set sum and not the arr[i]
            }
        }
    }
    return res

}

