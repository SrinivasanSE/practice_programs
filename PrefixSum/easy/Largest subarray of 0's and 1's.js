// https://www.geeksforgeeks.org/largest-subarray-with-equal-number-of-0s-and-1s/
// https://www.geeksforgeeks.org/count-subarrays-equal-number-1s-0s/

class Solution {
    maxLen(arr) {
        const n = arr.length;
        let hashmap = {};
        let max = 0;
        let prefixSum = 0;

        for (let i = 0; i < n; i++) {
            prefixSum += (arr[i] == 0 ? -1 : 1);

            if (prefixSum === 0) {
                max = Math.max(max, i + 1); 
            }

            if (prefixSum in hashmap) { // if the prefix sum is already there, that means the elements between that index and current index contributed to 0 sum
                max = Math.max(max, i - hashmap[prefixSum]); 
            } else {
                hashmap[prefixSum] = i;
            }
        }

        return max;
    }
}


// Count subarrays with equal num of 1s and s

class Solution {
    // Function to count subarrays with 1s and 0s.
    countSubarrWithEqualZeroAndOne(arr, n) {
        // code here
        let prefixSum = 0
        let count = 0
        
        let hashmap = {}
        
        for(let i = 0; i < n; i++) {
            prefixSum += arr[i] === 0 ? -1 : 1
            if (prefixSum === 0) {
                count++
            }
            
            if (prefixSum in hashmap) {
                count+= hashmap[prefixSum]
            } 
            
            hashmap[prefixSum] = (hashmap[prefixSum] || 0) + 1
        }
        
        return count
    }
}