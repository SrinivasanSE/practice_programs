// https://www.geeksforgeeks.org/minimum-number-of-bracket-reversals-needed-to-make-an-expression-balanced/


class Solution {
    countRev(s) {
        if (s.length % 2 === 1) {
            return -1;
        }
        
        let stack = [];
        let count = 0;
        
        for (let i = 0; i < s.length; i++) {
            if (s[i] === '{') {
                stack.push('{');
            } else {
                // if there is an opening bracket in the stack, pop it
                if (stack.length > 0 && stack[stack.length - 1] === '{') {
                    stack.pop();
                } else {
                    // if no opening bracket is present, it means this closing bracket is unbalanced
                    stack.push(s[i]); 
                }
            }
        }
        
        const res_len = stack.length
        
        while(stack.length > 0 && stack[stack.length -1] === '{') {
            count++
            stack.pop()
        }
        
        
        return (res_len/2 + count % 2); // count % 2 is to capture any remaining unbalanced opening bracket if the res length is odd
    }
}

class Solution {
    //Function to count the number of minimum reversals.
    countRev(s)
    {
        if(s.length%2 !== 0) {
            return -1
        }
        //your code here
        let open = 0
        let close = 0
        
        for(let c of s) {
            if (c === '{') {
                open++
            } else {
                if (open > 0) {
                    open--
                } else {
                    close++
                }
            }
        }
        
        return Math.ceil((open + 1)/2) + Math.ceil((close + 1)/2)
    }
}

class Solution {
    countRev(s) {
        if (s.length % 2 === 1) {
            return -1;
        }
        
        let stack = [];
        let count = 0;
        
        for (let i = 0; i < s.length; i++) {
            if (s[i] === '{') {
                stack.push('{');
            } else {
                // if there is an opening bracket in the stack, pop it
                if (stack.length > 0 && stack[stack.length - 1] === '{') {
                    stack.pop();
                } else {
                    // if no opening bracket is present, it means this closing bracket is unbalanced
                    count++;
                    stack.push('{'); // add a corresponding opening bracket to the stack
                }
            }
        }

        if (stack.length % 2 != 0)
            return -1
        
        // count the number of unbalanced opening brackets remaining in the stack
        count += stack.length / 2;
        
        return count;
    }
}

// similar to the above program, instead of using stack, we use the temp variable to track the stack length
    function countMinReversals( s)
    {
        var temp = 0, res = 0, n = s.length;
        if (n % 2 != 0)
            return -1;
        for (i = 0; i < n; i++) {
            if (s.charAt(i) == '{')
                temp++;
            else {
                if (temp == 0) {
                    res++;
                    temp++;
                } else
                    temp--;
            }
        }
        if (temp > 0)
            res += temp / 2;
        return res;
    }

