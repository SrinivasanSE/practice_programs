// https://leetcode.com/problems/repeated-string-match/description/


var repeatedStringMatch = function(a, b) {
    let repeated = a
    let count = 1
    const n = b.length

    while (repeated.length < n) {
        repeated += a
        count++
    }

    if (repeated.indexOf(b) != -1) return count
    repeated += a
    count++
    if (repeated.indexOf(b) != -1) return count
    return -1
};