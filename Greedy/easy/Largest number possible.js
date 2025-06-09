// https://www.geeksforgeeks.org/find-the-largest-number-with-given-number-of-digits-and-sum-of-digits/

// Understand the sol


class Solution {
    
    findLargest(n, s) {
        // code here
        if (s > 9*n) {
            return -1
        }
        let str = ""
        while (s > 0) {
            if (s >= 9) {
                s-=9
                str += "9"
            } else {
                str+=s
                s-=s
            }
        }
        
        if (str.length === 0 && n > 1) {
            return -1
        }
        
        while (str.length < n) {
            str+="0"
        }
        
        return str
        
    }
}