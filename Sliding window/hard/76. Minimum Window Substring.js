// https://leetcode.com/problems/minimum-window-substring/description/



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