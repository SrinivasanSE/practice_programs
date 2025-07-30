// https://leetcode.com/problems/valid-anagram/description/

/*
Brute - Using two arr
O(n) & O(1)
*/

var isAnagram = function(s, t) {
    if (s.length !== t.length) return false;

    const countS = Array(26).fill(0);
    const countT = Array(26).fill(0);

    for (let i = 0; i < s.length; i++) {
        countS[s.charCodeAt(i) - 97]++;
        countT[t.charCodeAt(i) - 97]++;
    }

    for (let i = 0; i < 26; i++) {
        if (countS[i] !== countT[i]) return false;
    }

    return true;
};

/*
Optimal - Using one arr
O(n) & O(1)
*/


var isAnagram = function(s, t) {
    const counter = new Array(26).fill(0)
    if (s.length != t.length) return false

    for (let i = 0; i < s.length; i++) {
        counter[s.charCodeAt(i) - 97]++
        counter[t.charCodeAt(i) - 97]--
    }

    for(let i = 0; i < 26; i++) {
        if (counter[i] != 0) return false
    }

    return true
};