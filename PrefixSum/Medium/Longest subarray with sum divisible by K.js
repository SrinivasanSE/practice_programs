// https://www.geeksforgeeks.org/longest-subarray-sum-divisible-k/


class Solution {
    // Function to find the length of the longest subarray with sum divisible by k.
    longestSubarrayDivK(arr, k) {
        // your code here
        const n = arr.length
        
        let res = 0, sum = 0, rem
        let hashmap = {0: -1}
        for(let i = 0; i < n; i++) {
            sum += arr[i]
            rem = ((sum % k) + k) % k
            if (rem in hashmap) {
                res = Math.max(res, i - hashmap[rem])
            } else {
                hashmap[rem] = i
            }
            
        }
        
        return res
    }
}

/*
If the remainders are same, prefixSum[i] % k === prefixSum[j] % k, then (prefixSum[i] - prefixSum[j]) % k === 0
If two different indices give the same remainder, the subarray between them must be divisible by k
*/

// https://www.geeksforgeeks.org/count-sub-arrays-sum-divisible-k/

// Count subarray Sum Divisible By K

class Solution {
    // Function to count the number of subarrays with a sum divisible by k
    subCount(arr, k) {
        // code here
        let count = 0, sum = 0, rem = 0
        const n = arr.length
        const hashmap = {0: 1}
        
        for(let i = 0; i < n; i++) {
            sum += arr[i]
            rem = ((sum % k) + k) % k
            
            if (rem in hashmap) {
                count += hashmap[rem]
            }
            
            hashmap[rem] = (hashmap[rem] || 0) + 1 
        }
        
        return count
    }
}