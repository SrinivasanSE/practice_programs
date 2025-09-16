
// https://www.geeksforgeeks.org/problems/set-kth-bit3724/1


class Solution {
    setKthBit(n, k) {
        // code here
        return (n | (1 << k))    // n = 10, k = 2 -> 1 0 1 0 | 0 1 0 0 -> 1 1 1 0 -> 14
    }
}

// clear kth bit

// (n & (~(1 << k)))

// toggle kth bit

// (n ^ (1 << k))

// Remove the last set bit

// n & (n - 1)

// Set the rightmost unset bit

// n | (n + 1)