// https://www.geeksforgeeks.org/problems/count-of-distinct-substrings/1

class Node {
    constructor () {
        this.children = new Array(26).fill(null)
        this.endOfWord = false
    }
    
    containsChar(char) {
        return this.children[char.charCodeAt(0) - 97]
    }
    
    get(char) {
        return this.children[char.charCodeAt(0) - 97]
    }
    
    put(char, node) {
        this.children[char.charCodeAt(0) - 97] = node
    }
}

class Solution {
    countSubs(s) {
        // code here
        const node = new Node()
        let cnt = 0
        const n = s.length
        
        for (let i = 0; i < n - 1; i++) {
            let curr = node
            for (let j = i; j < n; j++) {
                if (!curr.containsChar(s[j])) {
                    cnt++
                    curr.put(s[j], new Node())
                }
                curr = curr.get(s[j])
            }
        }
        
        return cnt
        
    }
}