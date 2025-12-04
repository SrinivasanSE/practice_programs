// https://www.geeksforgeeks.org/problems/prefix-to-postfix-conversion/1

/*

O(n) & O(n)

*/

/*

1) Process from the reverse, Add operands to the stk

2) When we encounter an operator, pop top 2 elements from the stack and form the expression, the operator should be added at the end and push it to the stack again.

3) Return the top element from the stack

*/



class Solution {
    // Function to convert prefix expression to postfix expression.
    preToPost(pre_exp) {
        // your code here
        const n = pre_exp.length
        const stk = []
        let char, top1, top2, temp
        
        for (let i = n - 1; i >= 0; i--) {
            char = pre_exp[i]
            if (/[a-z0-9]/i.test(char)) {
                stk.push(char)
            } else {
                top1 = stk.pop()
                top2 = stk.pop()
                
                temp = top1 + top2 + char
                stk.push(temp)
            }
        }
        
        return stk.pop()
    }
}