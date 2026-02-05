// https://leetcode.com/problems/longest-happy-prefix/description/


/*

Brute

O(n^2) & O(1)

*/


var longestPrefix = function (s) {
    const n = s.length
    // n = length of the string

    /*
    We try all possible prefix lengths from longest to shortest.
    Why n - 1?
    - The whole string cannot be a happy prefix
    - Prefix length must be strictly smaller than n
    */
    for (let len = n - 1; len >= 1; len--) {

        /*
        Extract prefix of length `len`
        Example:
        s = "level", len = 2
        prefix = "le"
        */
        let prefix = s.substring(0, len)

        /*
        Extract suffix of same length `len`
        n - len gives the starting index of the suffix
        Example:
        s = "level", len = 2
        suffix = s.substring(3) => "el"
        */
        let suffix = s.substring(n - len)

        /*
        Compare prefix and suffix
        If they match, this is the longest possible happy prefix
        (because we started from the largest length)
        */
        if (prefix === suffix) {
            return prefix
        }
    }

    // No happy prefix found
    return ""
}


/*

Optimal

O(n) & O(n)

*/

/**
 * @param {string} s
 * @return {string}
 */
var longestPrefix = function (s) {

    const n = s.length

    /*
    lps[i] = length of the longest proper prefix
             which is also a suffix
             for substring s[0..i]
    */
    const lps = new Array(n).fill(0)

    /*
    i   → current index being processed
    len → length of current longest prefix-suffix match
    */
    let i = 1, len = 0

    /*
    Start from i = 1 because:
    - lps[0] is always 0 (single character has no proper prefix)
    */
    while (i < n) {

        /*
        Case 1: characters match
        We extend the current prefix-suffix
        */
        if (s[i] == s[len]) {
            len++               // increase matched length
            lps[i] = len        // store result for this index
            i++                 // move forward
        }
        /*
        Case 2: characters do not match
        */
        else {

            /*
            If we already matched some prefix,
            fallback to the previous longest prefix
            */
            if (len != 0) {
                len = lps[len - 1]
                // Do NOT increment i here
                // We try matching with the new len
            }
            /*
            If no prefix matched so far
            */
            else {
                lps[i] = 0
                i++              // move to next character
            }
        }
    }

    /*
    The last value of LPS tells us:
    length of the longest prefix of the entire string
    which is also a suffix
    */
    const longestPrefixLen = lps[n - 1]

    // If no happy prefix exists
    if (longestPrefixLen == 0) return ""

    /*
    Extract and return the prefix of that length
    */
    return s.slice(0, longestPrefixLen)
}
