// https://www.geeksforgeeks.org/check-for-balanced-parentheses-in-an-expression/


function isBalanced(s) {
    let stack = [];
    let map = {
        ')': '(',
        '}': '{',
        ']': '['
    };

    for (let char of s) {
        if (char === '(' || char === '{' || char === '[') {
            stack.push(char);  // push opening bracket
        } else if (char === ')' || char === '}' || char === ']') {
            // if stack empty OR mismatch → not balanced
            if (stack.length === 0 || stack[stack.length - 1] !== map[char]) {
                return false;
            }
            stack.pop();  // matched pair, remove it
        }
    }

    // balanced if stack is empty at end
    return stack.length === 0;
}


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
