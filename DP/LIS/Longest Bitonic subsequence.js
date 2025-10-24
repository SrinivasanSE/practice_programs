// https://www.geeksforgeeks.org/dsa/longest-bitonic-subsequence-dp-15/


/*

O(N^2) & O(N)

*/

class Solution {

    LongestBitonicSequence(n, arr) {
        // Step 1: Initialize LIS (Longest Increasing Subsequence)
        // and LDS (Longest Decreasing Subsequence) arrays with 1
        // because every element is itself a subsequence of length 1
        const lis = new Array(n).fill(1)
        const lds = new Array(n).fill(1)

        // Step 2: Compute LIS values for each element
        // lis[i] = length of the longest increasing subsequence ending at index i
        for (let i = 1; i < n; i++) {
            for (let prev = 0; prev < i; prev++) {
                // If the previous element is smaller, it can be extended
                // to form an increasing subsequence
                if (arr[prev] < arr[i]) {
                    lis[i] = Math.max(lis[i], 1 + lis[prev])
                }
            }
        }

        // Step 3: Compute LDS (Longest Decreasing Subsequence) values for each element
        // lds[i] = length of the longest decreasing subsequence starting at index i
        // (We go from right to left for LDS)
        for (let i = n - 1; i >= 0; i--) { 
            for (let prev = n - 1; prev > i; prev--) { 
                // If the next element is smaller, it can extend the decreasing sequence
                if (arr[prev] < arr[i]) {
                    lds[i] = Math.max(lds[i], 1 + lds[prev])
                }
            }
        }

        // Step 4: Find the maximum length of a bitonic subsequence
        let max = 0
        for (let i = 0; i < n; i++) {
            // We only consider positions that can be both increasing and decreasing
            if (lis[i] > 1 && lds[i] > 1) {
                max = Math.max(max, lis[i] + lds[i] - 1) // Subtract 1 because arr[i] is counted in both sequences
            }
        }

        // Step 5: Return the final maximum bitonic subsequence length
        return max
    }
}
