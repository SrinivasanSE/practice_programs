// https://www.geeksforgeeks.org/problems/longest-valid-word-with-all-prefixes/1

// check other approaches


/*

O(N * L) & O(N * L)

*/


// Trie Node structure
class Node {
    constructor() {
        // Each index represents a lowercase character (a–z)
        // children[0] -> 'a', children[1] -> 'b', ..., children[25] -> 'z'
        this.children = new Array(26).fill(null)

        // ASCII value of 'a' used to calculate array index
        this.startChar = 'a'.charCodeAt(0)

        // Marks whether a complete word ends at this node
        this.endOfWord = false
    }
    
    // Checks if a child node exists for the given character
    isContainChar(char) {
        return this.children[char.charCodeAt(0) - this.startChar] != null
    }
    
    // Returns the child node corresponding to the character
    get(char) {
        return this.children[char.charCodeAt(0) - this.startChar]
    }

    // Creates a link from current node to a new child node
    put(char, node) {
        this.children[char.charCodeAt(0) - this.startChar] = node
    }
    
    // Marks the end of a valid word
    setEnd() {
        this.endOfWord = true
    }
    
    // Checks if this node marks the end of a word
    isEnd() {
        return this.endOfWord
    }
}

// Trie implementation
class Trie {
    constructor() {
        // Root node does not store any character
        this.root = new Node()
    }
    
    // Inserts a word into the Trie
    insert(word) {
        let curr = this.root

        // Traverse character by character
        for (let char of word) {
            // Create node if path does not exist
            if (!curr.isContainChar(char)) {
                curr.put(char, new Node())
            }
            // Move to the next character
            curr = curr.get(char)
        }

        // Mark the last node as the end of the word
        curr.setEnd()
    }
    
    // Checks if ALL prefixes of the word exist in the Trie
    // and are marked as complete words
    checkIfPrefixExists(word) {
        let curr = this.root

        for (let char of word) {
            // Move to next node
            curr = curr.get(char)

            // If path breaks OR prefix is not a complete word → invalid
            if (!curr || !curr.isEnd()) return false
        }

        // All prefixes exist and are valid words
        return true
    }
}

class Solution {
    longestValidWord(words) {
        // Step 1: Insert all words into Trie
        const trie = new Trie()
        for (let word of words) {
            trie.insert(word)
        }
        
        let longest = ""
        let len = 0
        
        // Step 2: Check each word
        for (let word of words) {
            // Check if every prefix of this word exists
            if (trie.checkIfPrefixExists(word)) {

                // Choose the longest valid word
                if (len < word.length) {
                    len = word.length
                    longest = word
                }
                // If lengths are equal, choose lexicographically smaller word
                else if (len === word.length && word < longest) {
                    longest = word
                }
            }
        }
        
        return longest
    }
}
