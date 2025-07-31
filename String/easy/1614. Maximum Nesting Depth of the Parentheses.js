// https://leetcode.com/problems/maximum-nesting-depth-of-the-parentheses/description/


var maxDepth = function(s) {
    let currentDepth = 0
    let maxDepth = -1

    for(let char of s) {
        if (char === '(') {
            currentDepth++
        } else if (char === ')') {
            currentDepth--
        }

        maxDepth = Math.max(maxDepth, currentDepth)
    }

    return maxDepth
};