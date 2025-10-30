// https://leetcode.com/problems/divide-two-integers/description/

/*

Optimal

O(log(dividend))

*/
var divide = function (dividend, divisor) {
    // Handling edge case for overflow
    if (dividend === -2147483648 && divisor === -1) return 2147483647;

    let ans = 0
    let sign = 1

    if (dividend < 0) {
        dividend = -dividend
        sign = -sign
    }

    if (divisor < 0) {
        divisor = -divisor
        sign = -sign
    }

    if (dividend === divisor) return sign;

    let tempDivisor, multiple, limit

    while (dividend >= divisor) {
        tempDivisor = divisor
        multiple = 1 // start with 1 because we already know from the while loop condition that divisor can divide dividend at least 1 time
        limit = dividend >> 1
        while (tempDivisor <= limit) { // We keep removing the largest possible multiple from the divident by doing, 3*2^0, 3*2^1, 3*2^2 like that, 22 = 3 * 7 = 3 * (2^2 + 2^1 + 2^0) = 3*2^2 + 3*2^1 + 3*2^0
            tempDivisor <<= 1 // left shift which is same as mutiplying by 2
            multiple <<= 1 // left shift which is same as mutiplying by 2
        }

        dividend -= tempDivisor
        ans += multiple // keep adding 

    }

    return sign < 0 ? -ans : ans
};