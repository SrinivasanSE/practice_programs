// https://leetcode.com/problems/minimum-add-to-make-parentheses-valid/description/

/*

Better - Stack

O(n) & O(n)

*/



var minAddToMakeValid = function(s) {
    const stk = []     // stack to keep track of unmatched '('
    let count = 0      // count of unmatched ')' that need insertion

    for (let char of s) {
        if (char === '(') {
            // If current char is '(', push to stack
            // We will try to find a matching ')' later
            stk.push(char)
        } else {
            // Current char is ')'
            if(stk.length === 0) {
                // No '(' available to match this ')'
                // Need to insert an extra '('
                count++
            } else {
                // There is a matching '(' in the stack
                // Pop it because this ')' matches it
                stk.pop()
            }
        }
    }

    // At the end:
    // count = unmatched ')' we found during scanning
    // stk.length = unmatched '(' left in stack
    // Sum = total insertions needed to balance the string
    return count + stk.length
};



/*

Optimal

O(n) & O(1)

*/


var minAddToMakeValid = function(s) {
    let open = 0    // counts unmatched '(' so far
    let close = 0   // counts unmatched ')' we need to insert

    for (let char of s) {
        if (char === '(') {
            // We found an open, increment open count
            open++
        } else {
            // Found a close ')'
            if (open > 0) {
                // There is a previous unmatched '(', pair it
                open--
            } else {
                // No '(' to match, we need an extra '('
                close++
            }
        }
    }

    // At the end:
    // open = unmatched '(' left → need ')' to match
    // close = unmatched ')' encountered → needed '(' to match
    // Sum = total minimum insertions needed
    return open + close
};
