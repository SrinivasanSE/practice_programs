// https://leetcode.com/problems/maximum-xor-with-an-element-from-array/description/

// Explore other approaches

/*

Trie

TC - O((N + Q) * 32 + N log N + Q log Q) ≈ O(N log N + Q log Q)

SC - O(N + Q)

*/


/**
 * We use a Binary Trie (0/1 trie) to maximize XOR.
 * Each number is stored as a 32-bit binary number.
 */

/* =========================
   Trie Node Definition
   ========================= */
class Node {
    constructor() {
        // Each node has only 2 children:
        // index 0 → bit 0
        // index 1 → bit 1
        this.children = new Array(2).fill(null)
    }

    // Check if a child exists for given bit (0 or 1)
    containsChar(bit) {
        return this.children[bit] !== null
    }

    // Get the child node for given bit
    get(bit) {
        return this.children[bit]
    }

    // Create / assign a child node for given bit
    put(bit, node) {
        this.children[bit] = node
    }
}

/* =========================
   Trie Definition
   ========================= */
class Trie {
    constructor() {
        this.root = new Node()
    }

    /**
     * Insert a number into the trie.
     * We insert from MSB (bit 31) → LSB (bit 0)
     */
    insert(num) {
        let curr = this.root
        let bit

        for (let i = 31; i >= 0; i--) {
            // Extract ith bit
            bit = (num >> i) & 1

            // Create node if missing
            if (!curr.containsChar(bit)) {
                curr.put(bit, new Node())
            }

            // Move down the trie
            curr = curr.get(bit)
        }
    }

    /**
     * Returns the maximum XOR possible with `num`
     * using the numbers already inserted in the trie.
     */
    getMax(num) {
        let curr = this.root
        let bit
        let maxNum = 0  // stores XOR result

        for (let i = 31; i >= 0; i--) {
            bit = (num >> i) & 1

            // To maximize XOR:
            // try to go to opposite bit (1 - bit)
            if (curr.containsChar(1 - bit)) {
                // Set this bit in XOR result
                maxNum = maxNum | (1 << i)
                curr = curr.get(1 - bit)
            } else {
                // Forced to take same bit
                curr = curr.get(bit)
            }
        }

        return maxNum
    }
}

/* =========================
   Main Function
   ========================= */
var maximizeXor = function (nums, queries) {
    const n = nums.length

    /**
     * Step 1:
     * Convert queries to:
     * [x, m, originalIndex]
     * so we can return answers in correct order
     */
    const oQ = queries.map(([x, m], i) => [x, m, i])

    /**
     * Step 2:
     * Sort queries by `m`
     * (offline processing)
     */
    oQ.sort((a, b) => a[1] - b[1])

    /**
     * Step 3:
     * Sort nums so we can insert incrementally
     */
    nums.sort((a, b) => a - b)

    let ind = 0
    const trie = new Trie()
    const ans = new Array(queries.length)

    /**
     * Step 4:
     * Process queries in increasing order of `m`
     */
    for (let [x, m, i] of oQ) {

        // Insert all nums <= m into trie
        while (ind < n && nums[ind] <= m) {
            trie.insert(nums[ind])
            ind++
        }

        // If no numbers inserted, XOR not possible
        if (ind === 0) {
            ans[i] = -1
        } else {
            // Maximize x XOR num
            ans[i] = trie.getMax(x)
        }
    }

    return ans
}
