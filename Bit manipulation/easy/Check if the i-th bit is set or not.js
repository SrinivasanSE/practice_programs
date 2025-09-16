// https://www.geeksforgeeks.org/check-whether-k-th-bit-set-not/

// O(k) & O(1) -> Check why it's k


// Using right shift

class Solution {
    checkKthBit(n, k) {
        // code here
        return ((n >> k) & 1) === 1 // n = 4, k = 2 -> 100 >> 2 -> 001 & 001 -> 001 -> 1 
    }
}


// Using left shift
class Solution {
    checkKthBit(n, k) {
        
        // if the bit is not set, it will return 0, if it's set, it can return any number
        return (n & (1 << k)) != 0 // n = 4, k = 2 -> 100 & (001 << 2) -> 100 & 100 -> 1
        // n = 4, k = 1 -> 100 & (001 << 1) -> (100 & 010) -> 0 
    }
}