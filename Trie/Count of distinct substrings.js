// https://www.geeksforgeeks.org/problems/count-of-distinct-substrings/1

/*

Brute

O(n^3) & O(n^3)

*/

function countSubs(s) {
  // To store distinct substrings
  const st = new Set();

  // Generate substrings
  for (let i = 0; i < s.length; i++) {
    let temp = [];
    for (let j = i; j < s.length; j++) {
      temp.push(s[j]);
      st.add(temp.join(""));
    }
  }
  // return distinct substrings
  return st.size;
}

/*

Optimal

O(n^2) & O(n^2)

*/

// Trie Node definition
class Node {
  constructor() {
    // Array of size 26 → one slot for each lowercase letter (a–z)
    // children[i] stores reference to the next node for character (i + 'a')
    this.children = new Array(26).fill(null);

    // Flag is not used in this problem, but typically marks end of a word
    this.endOfWord = false;
  }

  // Checks if a child node exists for the given character
  containsChar(char) {
    // Convert character to index (ASCII of 'a' = 97)
    return this.children[char.charCodeAt(0) - 97];
  }

  // Returns the child node corresponding to the character
  get(char) {
    return this.children[char.charCodeAt(0) - 97];
  }

  // Inserts a new node for the given character
  put(char, node) {
    this.children[char.charCodeAt(0) - 97] = node;
  }
}

class Solution {
  countSubs(s) {
    // Root of the Trie
    const node = new Node();

    // Counter to store number of distinct substrings
    let cnt = 0;

    const n = s.length;

    // Outer loop: choose starting index of substring
    for (let i = 0; i < n - 1; i++) {
      // Start from the root for every new starting index
      let curr = node;

      // Inner loop: extend substring character by character
      for (let j = i; j < n; j++) {
        // If this character path does not exist,
        // it means a NEW substring is found
        if (!curr.containsChar(s[j])) {
          cnt++; // Count new unique substring
          curr.put(s[j], new Node()); // Create Trie node
        }

        // Move to the next node in the Trie
        curr = curr.get(s[j]);
      }
    }

    // Return total number of distinct substrings
    return cnt;
  }
}
