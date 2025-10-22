// https://leetcode.com/problems/minimum-insertion-steps-to-make-a-string-palindrome/description/

/*


If we already know the Longest Palindromic Subsequence inside s,
then we know which characters are already fine — the ones we don’t need to insert anything for.

The remaining characters (those not part of the palindrome) are the ones we need to fix by inserting.

To find this, we can just subtract the longest palindrome subsequence from the string length

*/

// if we need to make the string palindrome, we can just reverse the string and append at the end, which is the maxInsertions it can have = length of the string

var minInsertions = function(s) { // minInsertions ==== minDeletions, same logic can be used
    const n = s.length
    const dp = new Array(n).fill(1)
    let prev, temp
    for (let i = n - 2; i >= 0; i--) {
        prev = 0
        for (let j = i + 1; j < n; j++) {
            temp = dp[j]
            if (s[i] === s[j]) {
                dp[j] = 2 + prev
            } else {
                dp[j] = Math.max(dp[j], dp[j - 1])
            }

            prev = temp
        }
    }

    return n - dp[n - 1]
};