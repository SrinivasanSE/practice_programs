// https://leetcode.com/problems/longest-palindromic-substring/description/

// learn manacher approach


/*
Brute
O(n^3) & O(1)
*/



const isPalindrome = (s, i, j) => {
    while (i < j) {
        if (s[i] != s[j]) {
            return false
        }
        i++
        j--
    }

    return true
}
var longestPalindrome = function(s) {
    const n = s.length
    for(let i = n; i > 0; i--) { // start from n
        for(let j = 0; j <= n - i; j++) {
            if (isPalindrome(s, j, j + i - 1)) { // will first chheck the whole substring and then start reducing it
                return s.substring(j, j + i)
                
            }
        }
    }
    return ""
};

/*
Better - DP
O(n^2) & O(n^2)

*/

var longestPalindrome = function(s) {
    const n = s.length
    let start = 0, maxLen = 1
    const dp = Array.from({length: n}, () => Array(n).fill(false))

    for(let i = 0; i < n; i++) {
        dp[i][i] = true // single chars will always be palindrome
    }

    for(let i = 0; i < n - 1; i++) { // for len of 2
        if (s[i] === s[i + 1]) {
            dp[i][i + 1] = true
            start = i
            maxLen = 2
        }
    }

    for(let len = 3; len <= n; len++) { // for len of >= 3, we start with len 3 and increase it till the length of the string
        for(let i = 0; i <= n - len; i++) { // we decrement the n by len, so that we can iterate from i to j without going above the length of the string
            let j = i + len - 1
            if (s[i] === s[j] && dp[i + 1][j - 1]) { // if i + 1, j - 1 between i and j is true, that means it's a palindrome already
                dp[i][j] = true
                start = i
                maxLen = len
            }
        }
    }

    return s.substring(start, start + maxLen)
};

/*
Better - expand from center
O(n^2) & O(1)
*/


const expandCenter = (s, left, right, n) => {
    while (left >= 0 && right < n && s[left] === s[right]) {
        left--
        right++
    }
    /*
    After the loop, the valid palindrome is actually from left + 1 to right - 1 (inclusive).
        The length is:
        right - 1 - (left + 1) + 1 = right - left - 1
        This formula gives the correct length of the palindrome found.
*/
    return right - left - 1 
}

/*
A palindrome mirrors around its center.
So, for each character (and each gap between characters), we try to expand outward as long as the substring remains a palindrome.

For odd-length palindromes, the center is a single character (e.g., "racecar": center at 'e').
For even-length palindromes, the center is between two characters (e.g., "abba": center between the two 'b's).

*/

var longestPalindrome = function(s) {
    const n = s.length
    let start = 0, end = 0
    for(let i = 0; i < n; i++) {
        const len1 = expandCenter(s, i, i, n) // odd
        const len2 = expandCenter(s, i, i + 1, n) // even
        const len = Math.max(len1, len2)
        if (len > end - start) {
            start = i - Math.floor((len - 1)/2) // we expand evenly on both sides, so we use len to find the start and end
            end = i + Math.floor(len/2)
        }
    }

    return s.substring(start, end + 1)
};