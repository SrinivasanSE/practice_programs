// https://leetcode.com/problems/power-of-two/description/

/*

Brute force
O(logn)

*/


var isPowerOfTwo = function(n) {
    
    if (n === 0) return false

    while (n > 0) {
        if (n === 1) return true
        if (n % 2 != 0) break

        n = n/2
    }

    return false
};


var isPowerOfTwo = function(n) {
    
    if (n === 1) return true

    if (n < 1 || n % 2 != 0 ) return false

    return isPowerOfTwo(n/2)
};

/*

Optimal - Bit manipulation
O(1)

And operation between multiple of 2 and next lower number will always give 0 and other wise it will never be 0.

example 1: 8 & 7
1000(8) & 0111(7) => 0000(0)

example 1: = 10 & 9
1010(10) & 1001(9) => 1000(8)

*/

var isPowerOfTwo = function(n) {
    return n > 0 && (n & n - 1) === 0 // if we know the bits of n, we just have to flip the bits from the first set bit to find n- 1 bits - 1000 -> flip -> 0111
};