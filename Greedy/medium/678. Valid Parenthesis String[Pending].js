// https://leetcode.com/problems/valid-parenthesis-string/description/


// check DP approaches

/*

Recursion
O(3^n) & O(n)

*/

var checkValidString = function(s) {
    return isValid(s, 0, 0)
};

const isValid = (s, i, count) => {
    if (count < 0) return false

    if (i === s.length) return count === 0

    if (s[i] === '(') return isValid(s, i + 1, count + 1)

    if (s[i] === ')') return isValid(s, i + 1, count - 1)

    return isValid(s, i + 1, count + 1) || isValid(s, i + 1, count - 1) || isValid(s, i + 1, count) // check the three possible ways, * could be open, closed or empty
}


/*

Greedy
O(n) & O(1)

*/


var checkValidString = function(s) {
    let open = 0, closed = 0, prefix, suffix
    const n = s.length
    for (let i = 0; i < n; i++) {
        prefix = s[i], suffix = s[n - i - 1]
        if (prefix === '(' || prefix === '*') { // assuming * as (
            open++
        } else {
            open--
        }

        if (suffix === ')' || suffix === '*') {
            closed++
        } else {
            closed--
        }

        if (open < 0 || closed < 0) return false // if it ever becomes negative, that means that there are two many open or closed brackets which could not closed
    }

    return true
};