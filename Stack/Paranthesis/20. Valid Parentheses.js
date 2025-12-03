// https://www.geeksforgeeks.org/check-for-balanced-parentheses-in-an-expression/


var isValid = function(s) {
    const mapping = {
        ")" : "(",
        "}" : "{",
        "]" : "["
    }
    const stk = []
    for (let char of s) {
        if (char === "(" || char === "{" || char === "[") {
            stk.push(char)
        } else {
            if (stk.length === 0) return false
            const top = stk.pop()
            if (top != mapping[char]) return false
        }
    }

    return stk.length === 0
};


// for only ()

function isBalancedParentheses(s) {
    let count = 0;
    for (let char of s) {
        if (char === '(') count++;
        else if (char === ')') count--;
        
        if (count < 0) return false; // too many ')'
    }
    return count === 0;
}
