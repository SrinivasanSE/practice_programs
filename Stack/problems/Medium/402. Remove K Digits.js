// https://leetcode.com/problems/remove-k-digits/

/*

O(n) & O(n)

*/


// The intuition is, we need to have smaller digits in the beginning as much as possible

var removeKdigits = function(num, k) {
    const n = num.length
    if (n === k) {
        return '0'
    }

    let stk = [], ans = ""

    for(let char of num) {
        while (k > 0 && stk.length > 0 && stk[stk.length - 1] > char) { // the stack contains a bigger digit than the curr digit, so we pop it
            stk.pop()
            k--
        }

        stk.push(char)
    }

    while (k) { // this condition will execute for case like [1,2,3,4,5,6], in this case, inside the for loop, pop will not happen, so we remove the last k digits
        stk.pop()
        k--
    }
    for(let char of stk) { // Remove leading zeros
        if (!ans && char === '0') {
            continue
        }

        ans += char
    }

    return ans === '' ? '0' : ans // return 0 if it's a empty string
};