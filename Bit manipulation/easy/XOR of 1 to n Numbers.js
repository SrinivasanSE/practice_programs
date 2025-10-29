// https://www.geeksforgeeks.org/dsa/calculate-xor-1-n/


class Solution {
    // Function to find XOR of two numbers without using XOR operator
    findXOR(l, r) {
        // your code here
        return this._findXOR(l - 1) ^ this._findXOR(r) // if l = 4, r = 8, we find (1 ^ 2 ^ 3) ^ (1 ^ 2 ^ 3 ^ 4 ^ 5 ^ 6 ^ 7 ^ 8) -> 4 ^ 5 ^ 6 ^ 7 ^ 8
    }
    
    _findXOR(n) { // there is a pattern repeating, if we find the xor from 1 to n,
        if (n % 4 === 1) return 1
        if (n % 4 === 2) return n + 1
        if (n % 4 === 3) return 0
        return n
    }
}