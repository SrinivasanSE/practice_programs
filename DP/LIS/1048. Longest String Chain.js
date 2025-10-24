// https://leetcode.com/problems/longest-string-chain/description/

/*

Recursion/Memo


*/

/**
 * @param {string[]} words
 * @return {number}
 */

const isPossible = (s1, s2) => {
    const n1 = s1.length
    const n2 = s2.length
    if (n1 - n2 != 1) return false

    let i = 0, j = 0, mismatch = 0

    while (i < n1 && j < n2) {
        if (s1[i] === s2[j]) {
            j++
        } else {
            mismatch++
            if (mismatch > 1) return false
        }
        i++
    }

    return true
}
var longestStrChain = function (words) {
    const n = words.length

    words.sort((a, b) => a.length - b.length)

    const dp = Array.from({ length: n }, () => new Array(n + 1).fill(-1))

    const findLength = (i, prev) => {
        if (i === n) return 0

        if (dp[i][prev + 1] != -1) return dp[i][prev + 1]
        const notTake = findLength(i + 1, prev)
        let take = 0
        if (prev === -1 || isPossible(words[i], words[prev])) {
            take = 1 + findLength(i + 1, i)
        }

        return dp[i][prev + 1] = Math.max(notTake, take)


    }

    return findLength(0, -1)
};


/*

Space ops

O(n^2*L) & O(n)


*/


var longestStrChain = function (words) {
    const n = words.length;

    // Sort words by length (shorter words first)
    words.sort((a, b) => a.length - b.length);

    // dp[i] will store the length of the longest string chain ending at words[i]
    const dp = new Array(n).fill(1);

    let max = 1; // Maximum length of string chain found so far

    // Build dp array
    for (let i = 1; i < n; i++) {
        for (let prev = 0; prev < i; prev++) {
            // Check if words[prev] can be a predecessor of words[i]
            if (isPossible(words[i], words[prev])) {
                dp[i] = Math.max(dp[i], 1 + dp[prev]);
            }
        }
        // Update overall maximum chain length
        max = Math.max(max, dp[i]);
    }

    return max;
};


/*

Optimised

O(N*L^2) & O(n)

*/



var longestStrChain = function (words) {
    // Sort words by length (shorter words first)
    words.sort((a, b) => a.length - b.length);

    // dp map stores the longest chain ending at a given word
    const dp = new Map();
    let max = 1;

    // Process each word in increasing length
    for (let word of words) {
        let current = 1; // Minimum chain length ending at this word

        // Try removing each character to generate possible predecessors
        for (let i = 0; i < word.length; i++) {
            const pre = word.slice(0, i) + word.slice(i + 1);
            if (dp.has(pre)) {
                // If predecessor exists, update current chain length
                current = Math.max(current, dp.get(pre) + 1);
            }
        }

        // Store the longest chain ending at this word
        dp.set(word, current);
        max = Math.max(max, current); // Update global maximum
    }

    return max;
};
