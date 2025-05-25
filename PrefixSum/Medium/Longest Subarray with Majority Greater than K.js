// https://www.geeksforgeeks.org/length-of-longest-subarray-in-which-elements-greater-than-k-are-more-than-elements-not-greater-than-k/


class Solution {
    longestSubarray(arr, k) {
        // Code Here
        const n = arr.length
        let max = 0
        let prefix = 0
        let hashmap = {}
        for(let i = 0; i < n; i++ ) {
           prefix += arr[i] > k ? 1 : -1
           
           if (prefix > 0) {
               max = i + 1
           }
           
           if (prefix - 1 in hashmap) {
               max = Math.max(max, i - hashmap[prefix - 1])
           }
           
           if (!(prefix in hashmap)) {
               hashmap[prefix] = i
           }
           
        }
        
        return max
    }
}


/*
The idea is to first transform the array, converting all elements greater than k to +1 and all elements less than or equal to k to -1. 
Now, the problem reduces to finding the length of the longest subarray with a positive sum in this modified array.

Why do we track currSum - 1?
Here’s the key:

Let’s say:
At some earlier index j, the prefix sum was currSum - 1

At current index i, prefix sum is currSum

This means the net gain in sum from j+1 to i is +1.

So the subarray (j+1 to i) has:

More 1s than -1s → ✅ It satisfies the condition.

That’s why:

If we’ve seen currSum - 1 before, then the subarray between that earlier index and now is guaranteed to have sum > 0, i.e., more >k elements than ≤k
*/