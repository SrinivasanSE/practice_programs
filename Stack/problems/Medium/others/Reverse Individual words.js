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
            
            if(found) { // this is for adding space after the word, we might have extra spaces at the end
                res += " "
            }
        } else {
            stk.push(s[i])
        }
    }
    
    while(stk.length != 0) { // Adding last word if present
        res += stk.pop()
    }
    
    return res.trim()
}