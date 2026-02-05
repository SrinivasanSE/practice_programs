// 



class ZAlgorithm {
    constructor(pattern) {
        // Pattern we want to search
        this.pattern = pattern

        // Length of the pattern
        this.m = pattern.length
    }

    /**
     * Builds the Z-array for a given string
     * Z[i] = length of the longest substring starting at i
     *        which is also a prefix of the string
     */
    buildZ(s) {
        const n = s.length
        const Z = new Array(n).fill(0)

        let L = 0, R = 0

        for (let i = 1; i < n; i++) {

            // Case 1: i is outside current [L, R] window
            if (i > R) {
                L = R = i

                // Compare characters starting from i
                while (R < n && s[R] === s[R - L]) {
                    R++
                }

                Z[i] = R - L
                R--
            }
            // Case 2: i is inside [L, R]
            else {
                let k = i - L

                // If Z[k] does not stretch beyond R
                if (Z[k] < R - i + 1) {
                    Z[i] = Z[k]
                }
                // Else, we need to extend match beyond R
                else {
                    L = i
                    while (R < n && s[R] === s[R - L]) {
                        R++
                    }
                    Z[i] = R - L
                    R--
                }
            }
        }
        return Z
    }

    /**
     * Searches for pattern in text
     * Returns all starting indices
     */
    search(text) {
        /**
         * Combine pattern, separator, and text
         * Separator must not appear in pattern or text
         */
        const combined = this.pattern + "$" + text
        const Z = this.buildZ(combined)
        const res = []

        for (let i = 0; i < Z.length; i++) {
            if (Z[i] === this.m) {
                // Match found in text
                // i - (m + 1) gives starting index in text
                res.push(i - this.m - 1)
            }
        }
        return res
    }
}
