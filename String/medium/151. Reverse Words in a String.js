// https://leetcode.com/problems/reverse-words-in-a-string/description/


/*
Brute
O(n) & O(n)

*/


var reverseWords = function(s) {
    let str = ""
    let stack = []
    for(let i = 0; i < s.length; i++) {
        if (s[i] === ' ') {
            if (str) {
                stack.push(str)
                str=""
            }
        } else {
            str += s[i]
        }
    }
    if (str) {
        stack.push(str)
    }
    str = ""
    for(let i = stack.length - 1; i >= 0; i--) {
        str += stack[i]
        if (i > 0) {
            str += " "
        }
    }
    return str
};


/*
Optimal
O(n) & O(1)
*/


var reverseWords = function(s) {
    let str = ""
    const n = s.length
    let right = n - 1, left

    while (right >= 0) {

        while (right >= 0 && s[right] === ' ') {
            right--
        }

        if (right < 0) break

        left = right

        while (left >= 0 && s[left] != ' ') { 
            left--
        }

        if (str.length > 0) str += " "
        for(let i = left + 1; i <= right; i++) { // left to right will contain the word
            str += s[i]
        }

        right = left - 1
    }

    return str
};