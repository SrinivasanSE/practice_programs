// https://leetcode.com/problems/add-digits/description/


/*

Better

O(logn) & O(1)

*/


var addDigits = function(num) {
    let sum = 0

    while (num > 0) {
        sum += num % 10
        num = Math.floor(num/10)
    }

    return sum < 10 ? sum : addDigits(sum)
};


/*

Optimal

O(1) & O(1)

*/

var addDigits = function(num) {
    if (num === 0) return 0
    return 1 + (num - 1) % 9
};