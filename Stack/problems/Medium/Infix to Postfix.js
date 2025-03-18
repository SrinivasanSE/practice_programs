// https://www.geeksforgeeks.org/convert-infix-expression-to-postfix-expression/

function infixToPostfix(expression) {
    const precedence = {
        '^': 3,
        '*': 2,
        '/': 2,
        '+': 1,
        '-': 1
    };

    const associativity = {
        '^': 'left', // change it to right based on the need
        '*': 'left',
        '/': 'left',
        '+': 'left',
        '-': 'left'
    };

    const isOperator = (char) => ['^', '*', '/', '+', '-'].includes(char);
    const isOperand = (char) => /^[a-zA-Z0-9]$/.test(char);

    let output = '';
    const stack = [];

    for (let i = 0; i < expression.length; i++) {
        const char = expression[i];

        if (isOperand(char)) {
            output += char;
        } else if (isOperator(char)) {
            while (
                stack.length &&
                stack[stack.length - 1] !== '(' &&
                (
                    precedence[stack[stack.length - 1]] > precedence[char] ||
                    (
                        precedence[stack[stack.length - 1]] === precedence[char] &&
                        associativity[char] === 'left'
                    )
                )
            ) {
                output += stack.pop();
            }
            stack.push(char);
        } else if (char === '(') {
            stack.push(char);
        } else if (char === ')') {
            while (stack.length && stack[stack.length - 1] !== '(') {
                output += stack.pop();
            }
            stack.pop(); // Remove '(' from stack
        }
    }
    console.log(stack)
    while (stack.length) {
        output += stack.pop();
    }

    return output;
}


class Solution {
    // Function to convert an infix expression to a postfix expression.
    infixToPostfix(s) {
        // code here
        const findPrec = (ch) => {
            if (ch === '^') {
                return 3
            }
            if (ch === '*' || ch === '/') {
                return 2
            } 
            if (ch === '+' || ch === '-'){
                return 1
            }
            return -1
        }
        
        let stk = []
        
        let res = ""
        
        for(let c of s) {
            if (/[a-z0-9]/i.test(c) ) {
                res+=c
            } else if (c === '(') {
                stk.push(c)
            } else if (c === ')') {
                while(stk[stk.length - 1] != '(') {
                    res+=stk.pop()
                }
                stk.pop()
            } else {
                while (stk.length > 0 && findPrec(c) <= findPrec(stk[stk.length - 1])) {
                    res += stk.pop()
                }
                stk.push(c)
            }
        }
        
        while (stk.length > 0) {
            res += stk.pop()
        }
        
        return res
        
    }
}