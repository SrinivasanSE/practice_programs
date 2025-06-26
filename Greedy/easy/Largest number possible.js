// https://www.geeksforgeeks.org/find-the-largest-number-with-given-number-of-digits-and-sum-of-digits/

// Understand the sol


class Solution {
    
    findLargest(n, s) {
        // code here
        if (s > 9*n) { //  Since the maximum digit is 9, the maximum possible sum from n digits is 9 * n. If s is more than this, it's impossible. So we return -1
            return -1
        }
        let str = ""
        while (s > 0) {
            if (s >= 9) {
                s-=9
                str += "9"
            } else {
                str+=s
                s-=s // we decrement the number by itself since we don't have any fixed number to decrement.
            }
        }
        
        if (str.length === 0 && n > 1) {
            return -1
        }
        
        while (str.length < n) { // if n is higher, we pad at the end with 0s
            str+="0"
        }
        
        return str
        
    }
}