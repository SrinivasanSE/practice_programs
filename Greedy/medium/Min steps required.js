// https://www.geeksforgeeks.org/dsa/minimum-steps-to-empty-string-of-as-and-bs/


class Solution {
    // Function to find the minimum number of operations to make the string empty.
    minSteps(str) {
        // your code here
        let acount = 0, bcount = 0
        let prev = '#'
        
        for(let char of str) {
            if (char === prev) continue
            
            if (char === 'a') acount++
            else bcount++
            
            prev = char
            
        }
        
        return Math.min(acount, bcount) + 1 // Because we can always remove all groups of one type (min(aGroups, bGroups) steps), then the other type in one go (+1 step).
    }
}

