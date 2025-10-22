// https://leetcode.com/problems/delete-operation-for-two-strings/

/*

using the same logic as LCS

*/


var minDistance = function (word1, word2) { // same for Minimum number of deletions and insertions problem
    const n1 = word1.length, n2 = word2.length
    let dp = new Array(n2 + 1).fill(0)
    let prev, temp
    for (let i = 1; i <= n1; i++) {
        prev = 0
        for (let j = 1; j <= n2; j++) {
            temp = dp[j]
            if (word1[i - 1] === word2[j - 1]) {
                dp[j] = 1 + prev
            } else {
                dp[j] = Math.max(dp[j], dp[j - 1])
            }
            prev = temp
        }
    }
    return n1 + n2 - dp[n2] * 2 // this is the main logic
};


/*

We want to transform word1 → word2
using only insertions and deletions (no replacements).

That means:

Some characters in word1 must be deleted

Some characters must be inserted to match word2.

The LCS represents all the characters that are already in the correct order in both strings.

We do not need to touch those characters.

Everything outside the LCS must be either deleted or inserted.

Let:

n1 = length of word1

n2 = length of word2

L = length of LCS

Then:

You need to delete all characters in word1 that are not in the LCS
→ n1 - L deletions.

You need to insert all characters in word2 that are not in the LCS
→ n2 - L insertions.

So total operations:

minOperations = (n1 - L) + (n2 - L)
               = n1 + n2 - 2L

*/