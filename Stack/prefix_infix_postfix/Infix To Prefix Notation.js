// https://www.geeksforgeeks.org/dsa/convert-infix-prefix-notation/

/*


 
 */

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
                while (stk.length > 0 && ((findPrec(char) < findPrec(stk[stk.length - 1])) || (findPrec(char) === findPrec(stk[stk.length - 1]) && char === '^'))) {
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