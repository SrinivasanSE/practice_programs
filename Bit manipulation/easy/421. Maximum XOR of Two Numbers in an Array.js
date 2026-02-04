// https://leetcode.com/problems/maximum-xor-of-two-numbers-in-an-array/description/


/*

Better - Trie

O(n) & O(n)

*/

/**
 * Finds the maximum XOR of any two numbers in the array
 * @param {number[]} nums
 * @return {number}
 */

/* 
  Trie Node:
  - Each node represents a single bit (0 or 1)
  - children[0] → path for bit 0
  - children[1] → path for bit 1
*/
class Node {
    constructor () {
        // Binary trie → only 2 children (0 and 1)
        this.children = new Array(2).fill(null)
    }

    // Checks if the child corresponding to the bit exists
    containsChar(bit) {
        return this.children[bit] !== null
    }

    // Returns the child node for the given bit
    get(bit) {
        return this.children[bit]
    }

    // Creates a child node for the given bit
    put(bit, node) {
        this.children[bit] = node
    }
}

/*
  Trie Structure:
  - Stores binary representation of all numbers
  - Each path from root to leaf represents a 32-bit number
*/
class Trie {
    constructor () {
        // Root does not represent any bit
        this.root = new Node()
    }

    /*
      Inserts a number into the binary trie
      Example:
      num = 5 → 00000000...00101
      We insert bits from MSB (31) → LSB (0)
    */
    insert(num) {
        let curr = this.root
        let bit

        // Traverse from most significant bit to least
        for (let i = 31; i >= 0; i--) {
            // Extract the i-th bit (0 or 1)
            bit = (num >> i) & 1

            // Create path if it doesn't exist
            if (!curr.containsChar(bit)) {
                curr.put(bit, new Node())
            }

            // Move to the next node
            curr = curr.get(bit)
        }
    }

    /*
      Finds the maximum XOR of `num` with any number in the Trie
      Strategy:
      - To maximize XOR, try to go opposite bit at each position
    */
    getMax(num) {
        let curr = this.root
        let bit
        let maxNum = 0   // stores XOR result being built

        // Traverse from MSB → LSB
        for (let i = 31; i >= 0; i--) {
            bit = (num >> i) & 1

            /*
              XOR rule:
              0 ^ 1 = 1
              1 ^ 0 = 1

              So, to maximize XOR:
              - If current bit is 0, prefer 1
              - If current bit is 1, prefer 0
            */
            if (curr.containsChar(1 - bit)) {
                // We found opposite bit → XOR bit becomes 1
                maxNum = maxNum | (1 << i)

                // Move to opposite path
                curr = curr.get(1 - bit)
            } else {
                // Opposite bit not available → forced to take same bit
                curr = curr.get(bit)
            }
        }

        return maxNum
    }
}

/*
  Main function
*/
var findMaximumXOR = function(nums) {

    // Step 1: Insert all numbers into the Trie
    const trie = new Trie()
    for (let num of nums) {
        trie.insert(num)
    }

    // Step 2: For each number, find best possible XOR
    let max = 0
    for (let num of nums) {
        max = Math.max(max, trie.getMax(num))
    }

    return max
};



/*

Optimal

O(n) & O(n)

*/


var findMaximumXOR = function (nums) {

    // max → stores the maximum XOR value we have built so far
    // Initially 0, we will build it bit by bit (from MSB → LSB)
    let max = 0;

    // mask → used to extract only the left (most significant) bits
    // Example:
    // mask = 111000... → keeps only first 3 bits of each number
    let mask = 0;

    // We try to decide XOR result bit-by-bit from the most significant bit (31)
    // down to the least significant bit (0)
    for (let i = 31; i >= 0; i--) {

        // Turn ON the i-th bit in mask
        // This keeps bits from 31 → i and ignores lower bits
        //
        // Example (5-bit view):
        // i = 4 → mask = 10000
        // i = 3 → mask = 11000
        // i = 2 → mask = 11100
        mask = mask | (1 << i);

        // Set to store prefixes of numbers using current mask
        //
        // Prefix = left bits of number up to bit i
        const set = new Set();

        // Build prefixes for all numbers
        for (let num of nums) {

            // num & mask removes lower bits
            //
            // Example:
            // num  = 25 (11001)
            // mask = 11100
            // result = 11000 (prefix)
            set.add(num & mask);
        }

        // We now try to greedily set this bit of max to 1
        //
        // If max so far = 11000
        // candidate     = 11100
        const candidate = max | (1 << i);

        // Check if two prefixes exist such that:
        // prefix1 ^ prefix2 = candidate
        //
        // Using XOR identity:
        // prefix2 = candidate ^ prefix1
        for (let prefix of set) {

            // If such a matching prefix exists,
            // then this bit CAN be set
            if (set.has(candidate ^ prefix)) {

                // Accept this bit
                max = candidate;
                break;
            }
        }
    }

    // After all bits processed, max holds the maximum XOR
    return max;
};
