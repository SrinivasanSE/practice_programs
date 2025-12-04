// https://www.geeksforgeeks.org/problems/postfix-to-infix-conversion/1

/*

O(n) & O(n)

*/

/*

1) Add operands to the stk

2) When we encounter an operator, pop top 2 elements from the stack and form the expression with the operator and push it to the stack again.

3) Return the top element from the stack

*/

class Solution {
    // Function to convert postfix expression to infix expression.
    postToInfix(postfix) {
        // your code here
        let stk = [], temp, top1, top2
        
        for (let char of postfix) {
            if (/[a-z0-9]/i.test(char)) {
                stk.push(char)
            } else {
                top1 = stk.pop()
                top2 = stk.pop()
                temp = '(' + top2 + char + top1 + ")"
                stk.push(temp)
            }
        }
        
        return stk.pop()
    }
}