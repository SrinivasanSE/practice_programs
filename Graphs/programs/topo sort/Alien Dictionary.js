// https://www.geeksforgeeks.org/problems/alien-dictionary/1


/*

BFS

O(N * L) & O(N)

*/

class Solution {
    findOrder(words) {

        // ---------------------------------------
        // GRAPH DATA STRUCTURES
        // ---------------------------------------

        // Adjacency list for 26 lowercase letters
        // adj[u] = Set of characters that must come AFTER u
        // Using Set avoids duplicate edges (important!)
        const adj = Array.from({ length: 26 }, () => new Set());

        // inDegree[v] = number of incoming edges to v
        // Used for Kahn's BFS topological sort
        const inDegree = new Array(26).fill(0);

        // present[i] = true if character (i + 'a') appears in input
        // Helps ignore unused characters
        const present = new Array(26).fill(false);

        // Total number of unique characters present
        let total = 0;

        // ---------------------------------------
        // STEP 1: IDENTIFY ALL PRESENT CHARACTERS
        // ---------------------------------------
        // We must know how many characters we expect
        // in the final topological order
        for (let word of words) {
            for (let ch of word) {
                let idx = ch.charCodeAt(0) - 97;

                // Count each character only once
                if (!present[idx]) {
                    present[idx] = true;
                    total++;
                }
            }
        }

        // ---------------------------------------
        // STEP 2: BUILD GRAPH USING ADJACENT WORDS
        // ---------------------------------------
        // Compare words[i] and words[i+1]
        // First differing character gives ordering rule
        for (let i = 0; i < words.length - 1; i++) {

            let s1 = words[i];
            let s2 = words[i + 1];
            let found = false; // indicates if mismatch occurred

            // Compare character by character
            let len = Math.min(s1.length, s2.length);

            for (let j = 0; j < len; j++) {

                // First mismatch defines ordering
                if (s1[j] !== s2[j]) {
                    let u = s1[j].charCodeAt(0) - 97;
                    let v = s2[j].charCodeAt(0) - 97;

                    // Add edge u → v only if not already added
                    if (!adj[u].has(v)) {
                        adj[u].add(v);
                        inDegree[v]++; // v has one more dependency
                    }

                    found = true;
                    break; // ONLY first mismatch matters
                }
            }

            // Invalid case:
            // Example: ["abc", "ab"]
            // Prefix appears later → impossible ordering
            if (!found && s1.length > s2.length) return "";
        }

        // ---------------------------------------
        // STEP 3: TOPOLOGICAL SORT (KAHN'S BFS)
        // ---------------------------------------

        // Queue of characters with inDegree = 0
        const q = [];

        // Initialize BFS queue
        for (let i = 0; i < 26; i++) {
            if (present[i] && inDegree[i] === 0) {
                q.push(i);
            }
        }

        // Result string builder
        let res = [];

        // Number of processed characters
        let count = 0;

        // Standard BFS for topological sorting
        while (q.length) {
            let curr = q.shift();

            // Convert index back to character
            res.push(String.fromCharCode(curr + 97));
            count++;

            // Reduce indegree of neighbors
            for (let nei of adj[curr]) {
                if (--inDegree[nei] === 0) {
                    q.push(nei);
                }
            }
        }

        // ---------------------------------------
        // STEP 4: CYCLE DETECTION
        // ---------------------------------------
        // If not all characters are processed,
        // cycle exists → invalid ordering
        return count === total ? res.join("") : "";
    }
}

