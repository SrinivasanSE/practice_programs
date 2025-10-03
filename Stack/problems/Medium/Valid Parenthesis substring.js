// https://www.geeksforgeeks.org/length-of-the-longest-valid-substring/


// stack - O(n) & O(n)
class Solution {

    findMaxLen(s){
        //code here
        let res = 0
        let stk = [-1]
        
        for(let i = 0; i < s.length; i++) {
            if (s[i] === "(") {
                stk.push(i)
            } else {
                stk.pop()
                if (stk.length === 0) { // we set the current index as base
                    stk.push(i) // Resetting with stk.push(i) when stack is empty ensures we don’t count across unmatched ).
                } else { // the initial unmatched index base will be in the stack, so it will come to else block
                    res = Math.max(res, i - stk[stk.length - 1])
                }
            }
        }
        return res
    }
}

// O(n) & O(1)

// right traversal is needed for testcases like "(()", open and close will not match in left traversal, open = 2 and close = 1
// left traversal is needed for testcases like "()))))))", open and close will not match in right traversal
class Solution {

    findMaxLen(s){
        //code here
        let maxLength = 0
        let open = 0, close = 0
        
        // forward traversal
        for(let i = 0; i < s.length; i++) {
            
            if(s[i] === "(") {
                open++
            } else {
                close++
            }
            
            if (open === close) {
                maxLength = Math.max(maxLength, close*2)
            } else if (close > open) { // if we find more close brackets at the beginning, reset
                open = close = 0
            }
        }
        
        // backward traversal
        open = close = 0
        for(let i = s.length - 1; i >= 0; i--) {
            if(s[i] === "(") {
                open++
            } else {
                close++
            }
            
            if (open === close) {
                maxLength = Math.max(maxLength, close*2)
            } else if (open > close) { // if we find more open brackets at the end, reset
                open = close = 0
            }
        }
        
        return maxLength
    }
}