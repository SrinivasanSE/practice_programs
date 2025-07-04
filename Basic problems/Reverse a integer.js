// https://leetcode.com/problems/reverse-integer/description/

var reverse = function(x) {
    let pop, rev = 0
    
    while (x != 0) {
        pop = x % 10
        x = (x - pop)/10
        if (rev > Math.pow(2, 31)/10 || (rev === Math.pow(2, 31)/10 && pop > 7)) {
            return 0
        }
        if (rev < Math.pow(-2, 31)/10 || (rev === Math.pow(-2, 31)/10 && pop < -8)) {
            return 0
        }
        rev = 10*rev + pop
    }

    return rev
    
};

/*
Why not just use Math.floor(x / 10)?

For positive numbers, Math.floor(x / 10) and (x - pop) / 10 give the same result.
For negative numbers, JavaScript’s division rounds towards zero, not down.
For example:

-123 / 10 is -12.3, which becomes -12 when using parseInt or just / 10 in JS (since it truncates towards zero).
Math.floor(-123 / 10) would be -13.



Using (x - pop) / 10 ensures that you always get the correct truncated result towards zero, which matches how integer division works in languages like C/C++ and is needed for LeetCode-style problems.

*/

/*

Why specifically 7 and 8?

The maximum positive value is 2,147,483,647 (ends with 7)
The minimum negative value is -2,147,483,648 (ends with 8)

Suppose rev is already at 214748364 (which is 2147483647 / 10), and you want to add one more digit (pop):

For positive numbers:

If rev == 214748364 and pop > 7, then rev * 10 + pop will be greater than 2147483647 (overflow).


For negative numbers:

If rev == -214748364 and pop < -8, then rev * 10 + pop will be less than -2147483648 (overflow).

*/