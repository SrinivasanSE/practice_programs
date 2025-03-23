// https://www.geeksforgeeks.org/decode-string-recursively-encoded-count-followed-substring/

class Solution {
    decodedString(s) {
      let stk = [];
      let currentNum = 0;
      let currentStr = '';
  
      for (let c of s) {
          if (c === '[') {
              stk.push([currentStr, currentNum])
              
              currentStr = ''
              currentNum = 0
          } else if (c === ']') {
              const [prevStr, prevNum] = stk.pop()
              
              let temp = ""
              for(let i = 0; i < prevNum; i++) {
                  temp += currentStr
              }
              
              currentStr = prevStr + temp
          } else if (c >= '0' && c <='9') {
              currentNum = currentNum* 10 + (c - '0')
          } else {
              currentStr += c
          }
      }
  
      return currentStr;
  }
  
  }

  class Solution {
    decodedString(s) {
        // code here
        let stk = []
        let res = ""
        for(let c of s) {
            if (c === ']') {
                
                let temp = ""
                
                while(stk[stk.length - 1] != '[') {
                    temp += stk.pop()
                }
                
                stk.pop()
                
                let countStr = ""
                
                while (stk.length > 0 && stk[stk.length - 1] >= '0' && stk[stk.length - 1] <= '9') {
                    countStr = stk[stk.length - 1] + countStr
                    stk.pop()
                }
                
                for(let i = 0; i < +countStr; i++) {
                    
                    for(let j = temp.length - 1; j >= 0; j--) {
                        stk.push(temp[j])
                    }
                }
            } else {
                stk.push(c)
            }
        }
        
        while(stk.length > 0) {
            res += stk.pop()
        }
        
        return res.split("").reverse().join("")
    }
}