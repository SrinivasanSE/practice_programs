// https://leetcode.com/problems/shortest-palindrome/description/


/*

To make s a palindrome by adding characters in front, we need:

The longest prefix of s that is already a palindrome

Why?

That part doesn’t need fixing

Everything after it must be mirrored in front

*/


/*

Brute

O(n^2) & O(n)

*/



const isPalindrome = (s, l, r) => {
    while (l <= r) {
        if (s[l] != s[r]) return false
        l++
        r--
    }
    return true
}

var shortestPalindrome = function(s) {
    const n = s.length

    /*
    We try to find the LONGEST palindromic prefix

    We start from the END of the string and move backwards

    i = n - 1 → check entire string
    i = n - 2 → check prefix s[0..n-2]
    ...
    i = 0     → check single character
    */
    for (let i = n - 1; i >= 0; i--) {

        /*
        Check if prefix s[0..i] is a palindrome
        */
        if (isPalindrome(s, 0, i)) {

            /*
            Once found, the rest (i+1..end) must be added in front

            Example:
            s = "aacecaaa"
            i = 6
            prefix = "aacecaa"  (palindrome)

            suffix = "a"
            reverse(suffix) = "a"
            */
            const suffix = s.slice(i + 1)
                                .split('')
                                .reverse()
                                .join('')

            return suffix + s
        }
    }

    // Technically never reached because at least 1-char palindrome exists
    return ""
};


/*

Optimal - KMP

O(n) & O(n) 

*/


var shortestPalindrome = function (s) {
    // Edge case:
    // If the string is empty or length 1, it is already a palindrome
    if (s.length === 0) return s

    /*
    ============================================================
    STEP 1: Reverse the string
    ============================================================

    Example:
    s   = "aacecaaa"
    rev = "aaacecaa"

    Why reverse?
    - We want to compare prefixes of s with suffixes of s
    - Reversing turns suffix checks into prefix checks
    */
    const rev = s.split("").reverse().join("")


    /*
    ============================================================
    STEP 2: Create the combined string
    ============================================================

    combined = s + '#' + rev

    Example:
    s        = "aacecaaa"
    rev      = "aaacecaa"
    combined = "aacecaaa#aaacecaa"

    Why add '#'? (separator)
    - '#' is a character NOT present in s
    - It prevents matching characters across s and rev
    - This ensures matches only represent palindromic structure
    */
    const combined = s + "#" + rev


    /*
    ============================================================
    STEP 3: Build LPS array (KMP preprocessing)
    ============================================================

    lps[i] = length of the longest proper prefix of combined[0..i]
             which is also a suffix of combined[0..i]

    Example combined string:
    Index:   0 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16
    Char :   a a c e c a a a # a  a  a  c  e  c  a  a

    Final LPS:
              0 1 0 0 0 1 2 2 0 1  2  2  3  4  5  6  7
    */
    const lps = new Array(combined.length).fill(0)

    // len → length of current longest prefix that matches a suffix
    let len = 0

    // i → current index being processed
    let i = 1


    /*
    ============================================================
    LPS CONSTRUCTION LOOP
    ============================================================

    We compare:
    combined[i] with combined[len]

    - If they match → extend the prefix
    - If mismatch → fallback using lps[len - 1]
    */
    while (i < combined.length) {

        // CASE 1: Characters match
        if (combined[i] === combined[len]) {
            /*
            Example:
            combined[i]   = 'a'
            combined[len] = 'a'

            We extend the matching prefix
            */
            len++
            lps[i] = len
            i++

        } else {
            /*
            CASE 2: Characters do NOT match
            */

            if (len !== 0) {
                /*
                FALLBACK:
                Instead of restarting from 0,
                we jump to the previous best prefix length

                Example:
                len = 5
                fallback → len = lps[4]
                */
                len = lps[len - 1]
            } else {
                /*
                No prefix available to fallback to
                So lps[i] = 0 and move forward
                */
                lps[i] = 0
                i++
            }
        }
    }


    /*
    ============================================================
    STEP 4: Extract longest palindromic prefix length
    ============================================================

    The LAST LPS value gives us:
    → Length of the longest prefix of s
      that is also a suffix of reverse(s)

    This means:
    → Longest prefix of s that is a palindrome

    Example:
    lps[last] = 7

    Palindromic prefix:
    "aacecaa"
    */
    const longestPalPrefixLen = lps[lps.length - 1]


    /*
    ============================================================
    STEP 5: Determine characters to add in front
    ============================================================

    We only need to add the NON-palindromic part

    Example:
    s = "aacecaaa"
    longestPalPrefixLen = 7

    Remaining part:
    s.substring(7) = "a"

    We add its reverse to the front:
    toAdd = "a"

    Since we already reversed the string, instead of getting the substring from the end of the original string, we can get from the start in the reversed string
    */
    const toAdd = rev.substring(0, s.length - longestPalPrefixLen)


    /*
    ============================================================
    FINAL RESULT
    ============================================================

    toAdd + s

    Example:
    "a" + "aacecaaa" = "aaacecaaa"
    */
    return toAdd + s
}



/*

Optimal - Rabin Karp

O(n) & O(1)

*/


var shortestPalindrome = function (s) {
    const n = s.length
    if (n === 0) return s

    /*
    ============================================================
    HASH SETUP
    ============================================================

    base:
    - A number larger than character range
    - Used to position characters uniquely

    mod:
    - Prevents integer overflow
    - Reduces hash collisions
    */
    const base = 131
    const mod = 1000000007

    /*
    forwardHash:
    - Represents hash of s[0..i] from LEFT → RIGHT
    - Formula:
        H = s[0]*base^i + s[1]*base^(i-1) + ... + s[i]*base^0

    backwardHash:
    - Represents hash of reverse(s[0..i])
    - Formula:
        H = s[0]*base^0 + s[1]*base^1 + ... + s[i]*base^i

    power:
    - Tracks base^i
    */
    let forwardHash = 0
    let backwardHash = 0
    let power = 1

    // Stores length of longest palindromic prefix found so far
    let longestPalPrefix = 0


    /*
    ============================================================
    MAIN LOOP
    ============================================================

    We iterate from left to right and grow the prefix:
    i = 0 → "a"
    i = 1 → "ab"
    i = 2 → "abc"
    ...

    At each step:
    - forwardHash builds normally
    - backwardHash inserts new char at the FRONT
    */
    for (let i = 0; i < n; i++) {
        const charCode = s.charCodeAt(i)

        /*
        ------------------------------------------------------------
        FORWARD HASH UPDATE
        ------------------------------------------------------------

        If current prefix = "ab"
        hash("ab") = a*base + b

        Add 'c':
        hash("abc") = (a*base + b)*base + c

        Code:
        */
        forwardHash = (forwardHash * base + charCode) % mod


        /*
        ------------------------------------------------------------
        BACKWARD HASH UPDATE (IMPORTANT)
        ------------------------------------------------------------

        backwardHash represents reverse(prefix)

        Example: s = "aba" (simplified base = 10)
        a=1, b=2

        i = 0:
        prefix = "a"
        backwardHash = 1 * 10^0 = 1

        i = 1:
        prefix = "ab"
        reverse = "ba"
        backwardHash = 1 + 2 * 10^1 = 21

        i = 2:
        prefix = "aba"
        reverse = "aba"
        backwardHash = 21 + 1 * 10^2 = 121

        This matches forwardHash when prefix is palindrome.

        Formula:
        backwardHash = previousHash + char * base^i
        */
        backwardHash = (backwardHash + charCode * power) % mod


        /*
        ------------------------------------------------------------
        PALINDROME CHECK
        ------------------------------------------------------------

        If:
        forwardHash == backwardHash

        Then:
        s[0..i] == reverse(s[0..i])
        → prefix is palindrome
        */
        if (forwardHash === backwardHash) {
            longestPalPrefix = i + 1
        }

        /*
        ------------------------------------------------------------
        UPDATE POWER
        ------------------------------------------------------------

        power tracks base^i:
        i=0 → 1
        i=1 → base
        i=2 → base^2
        */
        power = (power * base) % mod
    }


    /*
    ============================================================
    BUILD SHORTEST PALINDROME
    ============================================================

    Example:
    s = "aacecaaa"
    longestPalPrefix = 7 → "aacecaa"

    Remaining part:
    suffix = "a"

    Add reverse(suffix) to front:
    toAdd = "a"
    */
    const suffix = s.substring(longestPalPrefix)
    const toAdd = suffix.split("").reverse().join("")

    return toAdd + s
}
