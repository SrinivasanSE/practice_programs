// https://www.geeksforgeeks.org/reversing-an-equation/


class Solution {
    reverseEqn(s) {
        // code here
        
        const stk = []
        let current = "", res = ""
        
        for (let char of s) {
            if (/[0-9]/.test(char)) { // add the numbers
                current += char
            } else { // operator is found
                if (current) { // if there is a number, add the number to the stk, ex: "20"
                    stk.push(current)
                }
                stk.push(char) // add the operator
                current = "" // reset the current
            }
        }
        
        if (current) { // if any number is remaining, add it
            stk.push(current)
        }
        
        while (stk.length > 0) { // popping from the stack should give the output in reverse order
            res += stk.pop()
        }
        
        return res
    }
}

