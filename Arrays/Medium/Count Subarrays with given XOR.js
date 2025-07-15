// https://www.geeksforgeeks.org/dsa/count-number-subarrays-given-xor/

// Similar to Arrays/Medium/560. Count of Subarray Sum Equals K.js

/*

Brute - Checking all subarrays
O(n^2) & O(1)

*/

function subarrayXor(arr, k) {
    let res = 0;

    // Pick starting point i of subarrays
    for (let i = 0; i < arr.length; i++) {
        let prefXOR = 0;

        // Pick ending point j of subarray for each i
        for (let j = i; j < arr.length; j++) {
        
            // calculate prefXOR for subarray arr[i ... j]
            prefXOR ^= arr[j];

            // If prefXOR is equal to given value, increase res by 1
            if (prefXOR === k)
                res++;
        }
    }
    return res;
}

/*
Optimal

O(n) & O(1)

*/

class Solution {
    subarrayXor(arr, k) {
        // your code here
        const n = arr.length
        let xor = 0, rem, count = 0
        let hashmap = new Map()
        hashmap.set(0, 1)
        
        for(let i = 0; i < n; i++) {
            xor ^= arr[i]
            rem = xor^k // xor with k to get the remaining required, if k is 6, and xor is 4 and arr[i] is 6, 4^6 = 2 & 2 ^ 6 = 4
            
            if (hashmap.has(rem)) {
                count += hashmap.get(rem)
            }
            
            hashmap.set(xor, (hashmap.get(xor) || 0) + 1)
        }
        
        return count
    }
}