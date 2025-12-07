// https://www.geeksforgeeks.org/decode-string-recursively-encoded-count-followed-substring/


/*

Using Two Stacks

O(n) & O(n)

*/


class Solution {
    decodedString(s) {
        // code here
        const numStack = []
        const charStack = []
        
        const n = s.length
        let cnt, res = "", temp = ""
        
        for (let i = 0; i < n; i++) {
            cnt = 0
            if (/[0-9]/.test(s[i])) { // if it's a digit, check for the consecutive chars and convert them to an integer and add to the numStack
                while (/[0-9]/i.test(s[i])) {
                    cnt = cnt*10 + (s[i] - '0')
                    i++
                }
                i--
                numStack.push(cnt)
            } else if (s[i] === ']') { // if we encounter the closing bracket, we need to pop from the charStack till we find an opening bracket
                temp=""
                cnt = numStack.pop() // get the count from the numStack
                while (charStack.length > 0 && charStack[charStack.length - 1] != '[') {
                    temp = charStack.pop() + temp // adding in reverse
                    
                }
                charStack.pop() // pop the opening bracket
                
                res = temp.repeat(cnt) // repeat cnt times
                for (let char of res) { // push the string again to the stack
                    charStack.push(char)
                }
                res = "" // reset
                
            } else {
                charStack.push(s[i])
            }
        }
        
        while (charStack.length > 0) { // pop all chars from the stack and add in reverse
            res = charStack.pop() + res
        }
        
        return res
    }
}


/*

Using One Stack

O(n) & O(n)

*/


class Solution { //  Instead of maintaining a separate integer stack for storing repetition counts, we store the digits directly in the main stack. 
// The key observation is that the number always appears before the opening bracket '['. This allows us to retrieve it later without needing an extra stack.
    decodedString(s) {
        // code here
        const charStack = []
        
        const n = s.length
        let cnt, res = "", temp = ""
        
        for (let i = 0; i < n; i++) {
            cnt = 0
            if (/[0-9]/.test(s[i])) { 
                while (/[0-9]/i.test(s[i])) {
                    cnt = cnt*10 + (s[i] - '0')
                    i++
                }
                i--
                charStack.push(cnt)
            } else if (s[i] === ']') {
                temp=""
                while (charStack.length > 0 && charStack[charStack.length - 1] != '[') {
                    temp = charStack.pop() + temp
                    
                }
                charStack.pop()
                cnt = charStack.pop() // retrieve the count from the charStack itself
                res = temp.repeat(cnt)
                for (let char of res) {
                    charStack.push(char)
                }
                res = ""
                
            } else {
                charStack.push(s[i])
            }
        }
        
        while (charStack.length > 0) {
            res = charStack.pop() + res
        }
        
        return res
    }
}