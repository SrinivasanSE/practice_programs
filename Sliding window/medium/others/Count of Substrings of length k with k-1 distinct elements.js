// https://www.geeksforgeeks.org/count-of-substrings-of-length-k-with-exactly-k-distinct-characters/


/*

Brute

O(n*k) & O(k)

*/

class Solution {
    countOfSubstrings(s, k) {
        // code here
        const n = s.length
        let count = 0
        for(let i = 0; i <= n - k; i++) {
            let set = new Set()
            for(let j = i; j < i + k; j++) {
                set.add(s[j])
            }
            
            if (set.size === k - 1) {
                count++
            }
        }
        
        return count
    }
}


/*

Better

O(n) & O(n)

*/

class Solution {
    countOfSubstrings(s, k) {
        // code here
        const n = s.length
        let count = 0
        
        if (k === 1) {
            return count
        }
        
        const hashset = new Map()
        
        for(let i = 0; i < k; i++) {
            hashset.set(s[i], (hashset.get(s[i]) || 0) + 1)
        }
        
        if (hashset.size === k - 1) {
            count++
        }
        for(let i = k; i < n; i++) {
            hashset.set(s[i - k], hashset.get(s[i - k]) -  1)
            hashset.set(s[i], (hashset.get(s[i]) || 0) + 1)
            if (hashset.get(s[i - k]) === 0) {
                hashset.delete(s[i - k])
            }
            if (hashset.size === k - 1) {
                count++
            }
        }
        return count
    }
}

/*

Better - Using var to check the distinct count insteadof map size

O(n) & O(n)

*/


class Solution {
    countOfSubstrings(s, k) {
        // code here
        const n = s.length
        let count = 0
        
        if (k === 1) {
            return count
        }
        
        const hashset = new Array(26).fill(0)
        let dCount = 0
        for(let i = 0; i < k; i++) {
            hashset[s.charCodeAt(i) - 97]++
            if (hashset[s.charCodeAt(i) - 97] === 1) {
                dCount++
            }
        }
        
        if (dCount === k - 1) {
            count++
        }
        for(let i = k; i < n; i++) {
            hashset[s.charCodeAt(i - k) - 97]--
            if (hashset[s.charCodeAt(i - k) - 97] === 0) {
                dCount--
            }
            hashset[s.charCodeAt([i]) - 97]++
            if (hashset[s.charCodeAt([i]) - 97] === 1) {
                dCount++
            }
            if (dCount === k - 1) {
                count++
            }
        }
        return count
    }
}

