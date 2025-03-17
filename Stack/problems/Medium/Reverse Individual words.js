// https://www.geeksforgeeks.org/reverse-individual-words/


function reverseWords(s) {
    // code here
    let res = ""
    let stk = []
    
    for(let i = 0; i < s.length; i++) {
        
        if (s[i] === ' ') {
            let found = false
            
            while(stk.length != 0) {
                res += stk.pop()
                found = true
            }
            
            if(found) {
                res += " "
            }
        } else {
            stk.push(s[i])
        }
    }
    
    while(stk.length != 0) {
        res += stk.pop()
    }
    
    return res.trim()
}