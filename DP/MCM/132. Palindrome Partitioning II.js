// https://leetcode.com/problems/palindrome-partitioning-ii/description/


/*

Recursion/Memo

O(n^3) & O(n^2) & O(n)

*/



// Helper function to check if a string is palindrome
const isPalindrome = (str) => {
    const n = str.length;
    if (n === 1) return true; // Single character is always a palindrome
    let i = 0, j = n - 1;

    while (i < j) {
        if (str[i] != str[j]) return false; // Mismatch → not palindrome
        i++;
        j--;
    }

    return true; // All characters matched
}

var minCut = function (s) {
    const n = s.length;

    // dp[i] will store min cuts needed for substring s[i..n-1]
    const dp = new Array(n).fill(-1);

    // Recursive function starting from index i
    const f = (i) => {
        if (i === n) return 0; // Reached end → no more cuts needed

        if (dp[i] != -1) return dp[i]; // Return memoized result

        let temp = ""; // To build substring from i to j
        let count, min = Number.MAX_SAFE_INTEGER;

        for (let j = i; j < n; j++) {
            temp += s[j]; // Extend substring

            if (isPalindrome(temp)) { // If current substring is palindrome
                if (j === n - 1) {
                    count = 0; // No cut needed if palindrome reaches end
                } else {
                    count = 1 + f(j + 1); // 1 cut + min cuts for remaining string
                }
                min = Math.min(min, count); // Take minimum among all options
            }
        }

        return dp[i] = min; // Memoize and return
    }

    return f(0); // Start from index 0
};


/*

Tabulation

O(n^2) & O(n)

*/

var minCut = function (s) {
    const n = s.length;

    // dp[i] stores min cuts needed for substring s[i..n-1]
    const dp = new Array(n).fill(0);

    // Precompute palindrome substrings
    const isPalindrome = Array.from({length: n}, () => new Array(n).fill(false));
    for (let i = n - 1; i >= 0; i--) {
        for (let j = i; j < n; j++) {
            // A substring s[i..j] is palindrome if:
            // - Ends match AND
            // - Substring length < 2 (single char) OR middle substring is palindrome
            if (s[i] === s[j] && (j - i <= 1 || isPalindrome[i + 1][j - 1])) { // when i is 5, we would have already computed the value of i = 6
                isPalindrome[i][j] = true;
            }
        }
    }

    // Compute minimum cuts from right to left
    for (let i = n - 1; i >= 0; i--) {
        let min = Number.MAX_SAFE_INTEGER;
        for (let j = i; j < n; j++) {
            if (isPalindrome[i][j]) { // If substring s[i..j] is palindrome
                // If palindrome reaches end → 0 cuts, else 1 cut + dp[j+1]
                let count = (j === n - 1) ? 0 : 1 + dp[j + 1];
                min = Math.min(min, count); // Take minimum
            }
        }
        dp[i] = min; // Store min cuts for s[i..n-1]
    }

    return dp[0]; // Minimum cuts for the whole string
};
