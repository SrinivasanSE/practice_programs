// https://www.geeksforgeeks.org/check-for-balanced-parentheses-in-an-expression/


function isBalanced(s) {
    // code here
    let stack = []
    const mapping = {
        "[": "]",
        "{": "}",
        "(": ")"
    }
    for (let i = 0; i < s.length; i++) {
        if (s[i] in mapping) {
            stack.push(s[i])
        } else {
            const top = stack.pop()
            if (mapping[top] !== s[i]) {
                return false
            }

        }
    }

    return stack.length === 0
}