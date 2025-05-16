// https://www.geeksforgeeks.org/largest-subarray-with-equal-number-of-0s-and-1s/


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

            if (prefixSum in hashmap) {
                max = Math.max(max, i - hashmap[prefixSum]); 
            } else {
                hashmap[prefixSum] = i;
            }
        }

        return max;
    }
}