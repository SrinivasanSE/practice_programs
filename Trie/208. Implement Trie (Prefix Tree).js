// https://leetcode.com/problems/implement-trie-prefix-tree/description/
// https://www.geeksforgeeks.org/dsa/trie-insert-and-search/


// O(L) & O(1)


// Trie Node definition
class Node {
    constructor() {
        // Array of size 26 to store references to children nodes
        // Each index corresponds to a lowercase letter: a → z
        this.children = new Array(26).fill(null)

        // ASCII value of 'a' used for index calculation
        this.startChar = 'a'.charCodeAt(0)

        // Flag to indicate whether a word ends at this node
        this.isEndOfWord = false
    }

    // Checks if a child node exists for the given character
    containsChar(char) {
        // Convert character to index (0–25)
        return this.children[char.charCodeAt(0) - this.startChar] != null
    }

    // Inserts a node corresponding to the given character
    put(char, node) {
        // Place the new node at the calculated index
        this.children[char.charCodeAt(0) - this.startChar] = node
    }

    // Returns the child node for the given character
    get(char) {
        return this.children[char.charCodeAt(0) - this.startChar]
    }

    // Marks this node as the end of a complete word
    markEnd() {
        this.isEndOfWord = true
    }

    // Checks if this node marks the end of a word
    isEnd() {
        return this.isEndOfWord
    }
}

// Trie data structure
class Trie {
    constructor() {
        // Root node does not represent any character
        this.root = new Node()
    }

    // Inserts a word into the Trie
    insert(word) {
        let curr = this.root

        // Traverse each character of the word
        for (let char of word) {
            // If the path does not exist, create a new node
            if (!curr.containsChar(char)) {
                let node = new Node()
                curr.put(char, node)
            }
            // Move to the next node
            curr = curr.get(char)
        }

        // After inserting all characters, mark the last node as word end
        curr.markEnd()
    }

    // Searches for a complete word in the Trie
    search(word) {
        let curr = this.root

        // Traverse the Trie using characters of the word
        for (let char of word) {
            // If any character path is missing, word does not exist
            if (!curr.containsChar(char)) return false
            curr = curr.get(char)
        }

        // Return true only if this node marks the end of a word
        return curr.isEnd()
    }

    // Checks if any word starts with the given prefix
    startsWith(prefix) {
        let curr = this.root

        // Traverse characters of the prefix
        for (let char of prefix) {
            // If path breaks, no word with this prefix exists
            if (!curr.containsChar(char)) return false
            curr = curr.get(char)
        }

        // All prefix characters found
        return true
    }
}


