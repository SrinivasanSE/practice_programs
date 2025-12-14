// https://leetcode.com/problems/minimum-window-substring/description/

// Similar to Sliding window/medium/others/Smallest distinct window.js


/*

Brute

O(n^2) & O(m)

*/


var minWindow = function (s, t) {
    let count, start = -1
    if (s === t) return s
    const m = s.length, n = t.length
    let minLen = Number.MAX_SAFE_INTEGER

    for (let i = 0; i < m; i++) {
        const map = new Map()
        for (let j = 0; j < n; j++) {
            map.set(t[j], (map.get(t[j]) || 0) + 1)
        }
        count = 0

        for (let k = i; k < m; k++) {
            if (map.get(s[k]) > 0) count++
            map.set(s[k], (map.get(s[k]) || 0) - 1)
            if (count === n) {
                if (k - i + 1 < minLen) {
                    minLen = k - i + 1
                    start = i
                    break
                }
            }
        }
    }

    return start == -1 ? "": s.slice(start, start + minLen)

};


/*

Optimal

O(n + m)

*/

var minWindow = function (s, t) {
    const n = s.length, m = t.length
    if (n < m) return ""
    const hashmap = new Map()
    for (let char of t) {
        hashmap.set(char, (hashmap.get(char) || 0) + 1)
    }
    let left = 0, minLen = n + 1, start = -1, count = 0
    for (let right = 0; right < s.length; right++) {
        if (hashmap.get(s[right]) > 0) count++
        hashmap.set(s[right], (hashmap.get(s[right]) || 0) - 1)

        while (count === m) { // if the count matches, check if we can shrink the window to get minLength
            if (minLen > right - left + 1) {
                minLen = right - left + 1
                start = left
            }
            hashmap.set(s[left], hashmap.get(s[left]) + 1) // -2, -1 , 0 , 1
            if (hashmap.get(s[left]) > 0) { // this means, the window doesn't contain the req chars 
                count--
            }
            left++
        }
    }
    return start === -1 ? "" : s.slice(start, start + minLen)
}