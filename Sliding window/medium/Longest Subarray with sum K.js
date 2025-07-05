// https://www.geeksforgeeks.org/minimum-removals-for-target-sum/

/*
If we observe carefully, we can say that after removing the elements whose sum = k, 
the sum of the remaining elements will be (total sum - k). 
Since we need to minimize the removals, the problem can be reduced to finding the longest subarray whose sum = (total sum - k).
*/

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
        
        for(let end = 0; end < n; end++) {
            currSum += arr[end]
            
            while (currSum > target && start < end) {
                currSum -= arr[start]
                start += 1
            }
            
            if (currSum === target) {
                res = Math.max(res, end - start + 1)
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


// Works only for positive numbers
class Solution {
    longestSubarray(nums, k) {
       let left = 0
       let sum = 0
       const n = nums.length
       let res = 0
       for(let right = 0; right < n; right++ ) {
            sum += nums[right]
            while (sum > k && left <= right) {
                sum -= nums[left]
                left += 1
            }

            if (sum === k) {
                res = Math.max(res, right - left + 1)
            }
       }

       return res
    }
}

// Works for both positive & negative numbers

// PrefixSum/Medium/Longest Subarray with Sum K.js