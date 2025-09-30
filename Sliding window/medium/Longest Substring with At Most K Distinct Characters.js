class Solution {
    longestKSubstr(s, k) {
        // code here
        const map = new Map()
    let start = 0
    const n = s.length
    let count, right, max = -1
    for (right = 0; right < n; right++) {
         map.set(s[right], (map.get(s[right]) || 0) + 1)
        if (map.size > k) { 
            count = map.get(s[start]) - 1
            map.set(s[start], count)
            if (count === 0) map.delete(s[start])
            start++
        }
        
        if (map.size <= k) {
            max = Math.max(max, right - start + 1)
        }
    }

    return max
    }
}