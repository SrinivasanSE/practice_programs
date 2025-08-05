// https://leetcode.com/problems/string-to-integer-atoi/description/


var myAtoi = function(s) {
    let i = 0, n = s.length

    const INT_MIN = -(2**31)
    const INT_MAX = 2**31 - 1
    let sign = 1
    while (i < n && s[i] === ' ') {
        i++
    }

    if (i === n) return 0

    if (s[i] === '-') {
        sign = -1
        i++
    } else if (s[i] === '+') {
        i++
    }

    let res = 0

    while (i < n && s[i] >= '0' && s[i] <= '9') {
        let num = s[i].charCodeAt(0) - '0'.charCodeAt(0)
       
        res = res*10 + num
        if (sign*res <= INT_MIN) {
            return INT_MIN
        } 
        if (sign*res >= INT_MAX) {
            return INT_MAX
        }
        i++
    }
    return res*sign
};