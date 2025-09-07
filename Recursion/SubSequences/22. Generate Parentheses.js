// https://leetcode.com/problems/generate-parentheses/description/

// understand time complexity

/*
Iterative

*/


var generateParenthesis = function(n) {
    let res = []
    let queue = [{ path: "", open: 0, closed: 0 }]

    while (queue.length > 0) {
        let { path, open, closed } = queue.shift()

        if (open === n && closed === n) {
            res.push(path)
            continue
        }

        // Option 1: Add '(' if available
        if (open < n) {
            queue.push({ path: path + "(", open: open + 1, closed })
        }

        // Option 2: Add ')' if valid
        if (closed < open) {
            queue.push({ path: path + ")", open, closed: closed + 1 })
        }
    }

    return res
}

/*
Recursion - backtracking

*/

var generateParenthesis = function(n) {
    const res = []

    const backtrack = (open, closed, path) => {
        if (open === n && closed === n) {
            res.push(path)
            return
        }

        if (open < n) {
            backtrack(open + 1, closed, path + '(')
        }

        if (closed < open) {
            backtrack(open, closed + 1, path + ')')
        }
    }

    backtrack(0, 0, '')
    return res
};