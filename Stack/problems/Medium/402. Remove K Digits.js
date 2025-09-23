// https://leetcode.com/problems/remove-k-digits/

/*

O(n) & O(n)

*/


var removeKdigits = function(num, k) {
    const n = num.length
    if (n === k) {
        return '0'
    }

    let stk = [], ans = ""

    for(let char of num) {
        while (k > 0 && stk.length > 0 && stk[stk.length - 1] > char) {
            stk.pop()
            k--
        }

        stk.push(char)
    }

    while (k) {
        stk.pop()
        k--
    }
    for(let char of stk) {
        if (!ans && char === '0') {
            continue
        }

        ans += char
    }

    return ans === '' ? '0' : ans
};