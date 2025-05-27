// https://www.geeksforgeeks.org/length-of-the-longest-substring-without-repeating-characters/


class Solution {
    longestUniqueSubstring(s) {
        // code here
        let start = 0
        let res = 0
        
        let set = new Set()
        const n = s.length
        for(let end = 0; end < n; end++ ) {
            while (set.has(s[end])) {
                set.delete(s[start])
                start++
            }
            
            set.add(s[end])
            
            res = Math.max(res, end - start + 1)
            
            
        }
        
        return res
    }
}


class Solution {
    longestUniqueSubstring(s) {
        // code here
        let start = 0
        let res = 0
        
        let lastIndex = new Array(26).fill(-1)
        const n = s.length
        for(let end = 0; end < n; end++ ) {
            start = Math.max(start, lastIndex[s.charCodeAt(end) - 'a'.charCodeAt(0)] + 1)
            res = Math.max(res, end - start + 1)
            
            lastIndex[s.charCodeAt(end) - 'a'.charCodeAt(0)] = end
            
            
        }
        
        return res
    }
}