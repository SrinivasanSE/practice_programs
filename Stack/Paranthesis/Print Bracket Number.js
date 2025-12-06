// https://www.geeksforgeeks.org/print-bracket-number/



class Solution {
   bracketNumbers(str) {
       // code here
       let ans = []
       let s = new Stack()
       let count = 1
       for(let i = 0; i < str.length; i++) {
           if (str[i] === "(") {
               ans.push(count)
               s.push(count++)
           } else if (str[i] === ")" ) {
               ans.push(s.peek()) // we use stack only to keep track of count
               s.pop()
           }
       }
       return ans
   }
}