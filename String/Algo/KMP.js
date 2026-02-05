// https://www.geeksforgeeks.org/dsa/kmp-algorithm-for-pattern-searching/

/*

O(n + m) & O(m)

*/


class KMP {
    constructor(pattern) {
        this.pat = pattern
        this.m = pattern.length

        // lps[i] = length of the longest proper prefix of pat[0..i]
        //          which is also a suffix of pat[0..i]
        this.lps = new Array(this.m).fill(0)

        this.buildLPS()
    }

    /**
     * Build LPS (Longest Prefix Suffix) array
     *
     * Example:
     * pat = "ABAB"
     * lps = [0, 0, 1, 2]
     */
    buildLPS() {
        let len = 0   // length of previous longest prefix-suffix
        let i = 1     // start from index 1

        while (i < this.m) {
            if (this.pat[i] === this.pat[len]) {
                // Characters match → extend prefix
                len++
                this.lps[i] = len
                i++
            } else {
                if (len !== 0) {
                    // Fallback using LPS
                    len = this.lps[len - 1]
                } else {
                    // No prefix possible
                    this.lps[i] = 0
                    i++
                }
            }
        }
    }

    /**
     * KMP Search using your requested loop structure
     *
     * txt = text
     * pat = pattern
     */
    search(txt) {
        const n = txt.length
        const res = []

        let i = 0 // index for text
        let j = 0 // index for pattern

        /**
         * Core idea:
         * - i moves forward through text
         * - j tracks how many characters matched in pattern
         * - On mismatch → DO NOT move i back
         * - Use LPS to reposition j intelligently
         */
        while (i < n) {

            // CASE 1: Characters match
            if (txt[i] === this.pat[j]) {
                i++
                j++

                // If we matched the entire pattern
                if (j === this.m) {
                    // Pattern found at index (i - j)
                    res.push(i - j)

                    // Prepare j for next possible match (overlaps allowed)
                    j = this.lps[j - 1]
                }
            }

            // CASE 2: Characters do NOT match
            else {
                if (j !== 0) {
                    /**
                     * Mismatch AFTER some matches
                     *
                     * Instead of restarting pattern from index 0,
                     * fallback using LPS.
                     *
                     * Example:
                     * pat = "ABAB"
                     * lps = [0,0,1,2]
                     *
                     * matched "ABA", mismatch at 'C'
                     * j = 3 → fallback to lps[2] = 1
                     */
                    j = this.lps[j - 1]
                } else {
                    /**
                     * Mismatch at the FIRST character of pattern
                     * No prefix matched → move text pointer
                     */
                    i++
                }
            }
        }

        return res
    }
}