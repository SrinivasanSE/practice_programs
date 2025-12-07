// https://www.geeksforgeeks.org/dsa/convert-infix-prefix-notation/

/*

O(n) & O(n)

 
*/


/*

Approach 1

1) Reverse the given string and replace open bracket with closed and closed with open
2) Do infix to postfix conversion with small modification
3) reverse the string again and return

Approach 2

1) Process the string from last using for reverse
2) Do infix to postfix conversion with small modification
3) reverse the string again and return

*/

// Approach - 1

const findPrec = (char) => {
    switch (char) {
        case '*':
        case '/':
            return 2
        case '+':
        case '-':
            return 1
        case '^':
            return 3
        default:
            return -1
    }
}
class Solution {
    infixToPrefix(s) {
        // code here
       s = s.split('').reverse().map(char => {
            if (char === '(') return ')';
            if (char === ')') return '(';
            return char;
        }).join('');
        
        let res = "", stk = []
        // infix to postfix logic
        for(let char of s) {
            if (/[a-z0-9]/i.test(char)) {
                res += char
            } else if (char === "(") {
                stk.push(char)
            } else if (char === ")") {
                while (stk.length > 0 && stk[stk.length - 1] != "(") {
                    res += stk.pop()
                }
                
                stk.pop()
            } else {
                while (stk.length > 0 && ((findPrec(char) < findPrec(stk[stk.length - 1])) || (findPrec(char) === findPrec(stk[stk.length - 1]) && char === '^'))) { // small modification, char should be equal to '^
                    res += stk.pop()
                }
                
                stk.push(char)
            }
        }
        
        while (stk.length) {
            res += stk.pop()
        }
        
        return res.split('').reverse().join('')
    }
}

// Approach - 2

class Solution {
    infixToPrefix(s) {
        // code here
        const res = this.infixToPostfix(s)
        return res.split("").reverse().join("")
        
    }
    
    infixToPostfix(s) {
        let res = "", stk = [], char
        
        for (let i = s.length - 1; i >= 0; i--) {
            char = s[i]
            if (/[a-z0-9]/i.test(char)) {
                res += char
            } else if (char === ')') { // modification, since we process from reverse, we will first encounter closing bracket, so add that to the stack
                stk.push(char)
            } else if (char === "(") { // modification, when we encounter the opening bracket, pop from the stack
                while (stk.length > 0 && stk[stk.length - 1] != ")") {
                    res += stk.pop()
                }
                stk.pop()
            } else { // since we traverse from reverse, right associative becomes left, so we pop for ^ and not pop for *,/ for equal precedence
                while (stk.length > 0 && (precedence(stk[stk.length - 1]) > precedence(char) || (precedence(stk[stk.length - 1]) === precedence(char) && char === '^'))) { // small modification, char should be equal to '^
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