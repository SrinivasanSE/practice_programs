// https://www.geeksforgeeks.org/problems/prefix-to-infix-conversion/1

// Similar to Postfix to Infix

/*

O(n) & O(n)

*/


/*

1) Process the string from reverse, Add operands to the stk

2) When we encounter an operator, pop top 2 elements from the stack and form the expression with the operator and push it to the stack again.

3) Return the top element from the stack

*/


class Solution {
    // Function to covert prefix expression to infix expression.
    preToInfix(pre_exp) {
        // your code here
        let stk = [], n = pre_exp.length, char, top1, top2, temp
        
        for (let i = n - 1; i >= 0; i--) {
            char = pre_exp[i]
            if (/[a-z0-9]/i.test(char)) {
                stk.push(char)
            } else {
                top1 = stk.pop()
                top2 = stk.pop()
                
                temp = "(" + top1 + char + top2 + ")" // first element should be top1
                stk.push(temp)
            }
        }
        
        return stk.pop()
    }
}