// https://www.geeksforgeeks.org/minimum-removals-for-target-sum/


class Solution {
    minRemovals(arr, k) {
        // code here
        const totalSum = arr.reduce((accum, curr) => accum + curr, 0)
        const target = totalSum - k // consider target as the given sum
        if (k > totalSum) {
            return -1
        }
        const n = arr.length
        if (target === 0) {
        return n;
    }
        let currSum = 0, start = 0
        let res = -Infinity
        
        for(let i = 0; i < n; i++) {
            currSum += arr[i]
            
            while (currSum > target && start < i) {
                currSum -= arr[start]
                start += 1
            }
            
            if (currSum === target) {
                res = Math.max(res, i - start + 1)
            }
        }
        
        return res == -Infinity ? -1 : n - res
    }
}


// Prefix sum approach

// JavaScript code for Minimum removal for target sum using
// Prefix array

function minRemovals(arr, k) {
    let total = 0;
    for (let num of arr)
        total += num;

    if (k === total)
        return arr.length;

    // Find the target sum for the longest subarray
    let target = total - k;
    let prefIdx = new Map();

    let prefSum = 0, maxLen = -1;
    for (let i = 0; i < arr.length; i++) {
        prefSum += arr[i];

        if (prefSum === target)
            maxLen = i + 1;
        else if (prefIdx.has(prefSum - target))
            maxLen = Math.max(maxLen, i - prefIdx.get(prefSum - target));

        // Store prefix sum with its index
        if (!prefIdx.has(prefSum))
            prefIdx.set(prefSum, i);
    }

    return maxLen === -1 ? -1 : arr.length - maxLen;
}
