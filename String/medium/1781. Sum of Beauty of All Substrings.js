// https://leetcode.com/problems/sum-of-beauty-of-all-substrings/description/

/*
O(n^2) & O(1)

*/

var beautySum = function (s) {
    const n = s.length

    let total = 0
    for (let i = 0; i < n; i++) {
        const freq = new Array(26).fill(0)
        for (let j = i; j < n; j++) {
            freq[s[j].charCodeAt(0) - 97]++
            let min = Infinity
            let max = 0

            for (let i = 0; i < 26; i++) {
                if (freq[i] > 0) {
                    min = Math.min(min, freq[i])
                    max = Math.max(max, freq[i])
                }
            }
            total += (max - min)
        }
    }
    return total
};