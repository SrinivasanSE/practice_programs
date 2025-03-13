// https://www.geeksforgeeks.org/reversing-an-equation/


class Solution {
    reverseEqn(s) {
        //code here
        let stack = s.split('')
        let res = ""
        let temp = ""
        while(stack.length != 0) {
            let c = stack.pop()
            if (c === "+" || c === "-" || c === "*" || c === "/") {
                res += temp
                res+= c
                temp = ""
            } else {
                temp = c + temp
            }
        }
        
        res += temp
        return res
        
    }
}


// Function to reverse an equation
function reverseEquation(s) {
    let stk = [];
    let current = "";
    for (let c of s) {
        if (/[a-zA-Z0-9]/.test(c)) {
            current += c;
        } else {
            if (current) {
                stk.push(current); // the number will not be reversed and 20 will remain as 20 instead of 02
                current = "";
            }
            stk.push(c);
        }
    }
    if (current) {
        stk.push(current);
    }
    return stk.reverse().join("");
}

// Driver code
let s = "a+b*c-d/e";
console.log(reverseEquation(s));
