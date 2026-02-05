// https://leetcode.com/problems/repeated-string-match/description/


/*

Brute

O((n + m)*n) & O(n + m)

*/



var repeatedStringMatch = function (a, b) {

    // `repeated` will store string `a` repeated multiple times
    // Start with one copy of `a`
    let repeated = a

    // Count how many times `a` has been repeated
    let count = 1

    // Length of string `b`
    const n = b.length

    /**
     * Step 1:
     * Keep appending `a` until `repeated.length >= b.length`
     *
     * Why?
     * - If `b` is a substring of repeated `a`,
     *   then repeated must be at least as long as `b`
     */
    while (repeated.length < n) {
        repeated += a
        count++
    }

    /**
     * Step 2:
     * Check if `b` is already a substring
     */
    if (repeated.indexOf(b) !== -1) return count

    /**
     * Step 3:
     * Edge case:
     * `b` may start near the end of `repeated` and
     * continue into the next copy of `a`
     *
     * So we append one more `a` and check again
     */
    repeated += a
    count++

    if (repeated.indexOf(b) !== -1) return count

    /**
     * Step 4:
     * If still not found, it's impossible
     */
    return -1
};


/*

Optimal - Rabin or KMP

O(n + m) & O(m)

*/

var repeatedStringMatch = function (a, b) {

    let repeated = a
    const m = b.length
    let count = 1

    const rabin = new RabinKarp(b)

    while (repeated.length < m) {
        repeated += a
        count += 1
    }

    if (rabin.search(repeated) != -1) return count
    repeated += a
    if (rabin.search(repeated) != -1) return count + 1
    return -1
};