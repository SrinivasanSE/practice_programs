// https://www.geeksforgeeks.org/delete-consecutive-words-sequence/

class Solution {
    removeConsecutiveSame(arr) {
        // code here
        let stk = [];

    // Traverse the array
    for (let word of arr) {
        
        // If stack is not empty and top element 
        // is same as current
        if (stk.length > 0 && stk[stk.length - 1] === word) {
            stk.pop();
        } else {
            
            // Push if no consecutive duplicate
            stk.push(word);
        }
    }
    
    return stk.length;
    }
}




