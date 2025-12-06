// https://www.geeksforgeeks.org/evaluation-of-postfix-expression/


class Solution {
    evaluate(arr) {
        // code here
        let stk = []
        let a,b
        for(let c of arr) {
            if (c === '+' || c === '-' || c === '*' || c === '/') {
                b = stk.pop()
                a = stk.pop()
                
                if (c === '+') {
                    stk.push(BigInt(a + b))
                } else if (c === '-') {
                    stk.push(BigInt(a - b))
                } else if (c === '*') {
                    stk.push(BigInt(a*b))
                } else {
                    stk.push(BigInt(a/b))
                }
                    

            } else {
                stk.push(BigInt(c)) // we only push the numbers to the stk
            }
            
        }
        
        return parseInt(stk.pop())
    }
}