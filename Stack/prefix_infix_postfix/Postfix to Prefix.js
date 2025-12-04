// https://www.geeksforgeeks.org/problems/postfix-to-prefix-conversion/1

/*

O(n) & O(n)

*/

/*

1) Add operands to the stk

2) When we encounter an operator, pop top 2 elements from the stack and form the expression, the operator should be added at the beginning and push it to the stack again.

3) Return the top element from the stack

*/

class Solution {
    // Function to find a continuous sub-array which adds up to a given number.
    postToPre(post_exp) {
        // your code here
        const stk = []
        let top1, top2, temp
        
        for (let char of post_exp) {
            if (/[a-z0-9]/i.test(char)) {
                stk.push(char)
            } else {
                top1 = stk.pop()
                top2 = stk.pop()
                
                temp = char + top2 + top1 // no need for brackets
                stk.push(temp)
            }
        }
        
        return stk.pop()
    }
}