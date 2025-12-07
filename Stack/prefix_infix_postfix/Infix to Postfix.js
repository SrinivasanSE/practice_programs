// https://www.geeksforgeeks.org/convert-infix-expression-to-postfix-expression/

/*

O(N) & O(N)

*/

/*
Logic

1) If it's a number or a char, add to the res
2) If it's a opening bracket, push to the stack
3) If it's a closing bracket, pop everything from the stack until we find opening bracket, we need to give priority to the things inside the bracket
4) If it's a operand, if the top operand in the stack has the high priority, we need to consider that first, so we pop them using while
5) At the end, pop all the remaining things in the stack and add to the res

*/

const findPrec = (char) => {
    switch (char) {
        case '+':
        case '-':
            return 1
        case '*':
        case '/':
            return 2
        case '^':
            return 3
        default:
            return -1
    }
}

class Solution {
    infixToPostfix(s) {
        // code here
        let res = "", stk = []
        
        for(let char of s) {
            if (/[a-z0-9]/i.test(char)) {
                res += char
            } else if (char === "(") {
                stk.push(char)
            } else if (char === ")") {
                while (stk.length > 0 && stk[stk.length - 1] != "(") {
                    res+= stk.pop()
                }
                
                stk.pop()
            } else {
                // ^ has right to left associativity, so for it, if the top element is also ^, it should not popped. For others like "*", "/" with same precedency, stack will be popped as they left to right associativity
                // for input h^m^q^(7-4), output should be hmq74-^^^, if we remove the char check for ^, the output will be hm^q^74-^ which is wrong.
                while (stk.length > 0 && ((findPrec(char) < findPrec(stk[stk.length - 1])) || (findPrec(char) === findPrec(stk[stk.length - 1]) && char !== '^'))) {
                    res += stk.pop()
                }
                stk.push(char)
            }
        }
        
        while (stk.length > 0) {
            res += stk.pop()
        }
        
        return res
    }
}

/*

Associativity Types


Left-associative: Operators are evaluated left to right.
Examples: +, -, *, /

a - b - c is interpreted as (a - b) - c.



Right-associative: Operators are evaluated right to left.
Example: ^ (exponentiation)

a ^ b ^ c is interpreted as a ^ (b ^ c).

*/