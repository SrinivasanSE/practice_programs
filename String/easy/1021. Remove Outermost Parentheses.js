// https://leetcode.com/problems/remove-outermost-parentheses/description/


/*

Brute - using stack
O(n) & O(n)

*/

var removeOuterParentheses = function(s) {
    let ans = ""
    let stack = []
    for(let char of s) {
        if (char === '(') { // check first and then push
            if (stack.length != 0) {
                ans += char
            }
            stack.push(char)
        } else {
            stack.pop() // pop first and then check
            if (stack.length != 0) {
                ans += char
            }
        }
    }

    return ans
}


/*
Optimal 
O(n) & O(1)
 */


var removeOuterParentheses = function(s) {
    let ans = ""
    let counter = 0
    for(let char of s) {
        if (char === '(') {
            if (counter != 0) {
                ans += char
            }
            counter++
        } else {
            counter--
            if (counter != 0) {
                ans += char
            }
        }
    }

    return ans
};