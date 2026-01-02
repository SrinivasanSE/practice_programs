// https://leetcode.com/problems/shortest-common-supersequence/description/

/*

SCS = the shortest string that contains both str1 and str2 as subsequences.

Using the dp table, we can form the string


*/


var shortestCommonSupersequence = function (str1, str2) {
    const n1 = str1.length, n2 = str2.length

    let dp = Array.from({ length: n1 + 1 }, () => new Array(n2 + 1).fill(0))


    for (let i = 1; i <= n1; i++) {
        for (let j = 1; j <= n2; j++) {
            if (str1[i - 1] === str2[j - 1]) {
                dp[i][j] = 1 + dp[i - 1][j - 1]
            } else {
                dp[i][j] = Math.max(dp[i][j - 1], dp[i - 1][j])
            }
        }
    }

    // return n1 + n2 - dp[n1][n2]  - To find the length alone and not the string

    let i = n1, j = n2
    let res = ""
    while (i > 0 && j > 0) {
        if (str1[i - 1] === str2[j - 1]) {
            res = str1[i - 1] + res // adding the string in reverse format
            i--
            j--
        } else if (dp[i - 1][j] > dp[i][j - 1]) { // if the upper row has the max value, before moving, add the char at that position
            res = str1[i - 1] + res // should use i - 1 since 1 based indexing
            i--
        } else {
            res = str2[j - 1] + res // similarly here
            j--
        }
    }

    while (i > 0) { // When one string is exhausted (i==0 or j==0), the other string may still have characters left. So we add all remaining ones:
        res = str1[i - 1] + res
        i--
    }

    while (j > 0) {
        res = str2[j - 1] + res
        j--
    }

    return res
};

/*

Let’s say:

str1 = "abac"
str2 = "cab"


Their LCS = "ab".

Now:

SCS must include all characters of both strings.

But characters that appear in both (the LCS) should appear only once.

So we’ll merge str1 and str2 while following the LCS alignment.

*/