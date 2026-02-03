// https://takeuforward.org/data-structure/implement-trie-ii

// O(N) & O(N)

class Node {
    constructor() {
        /* Array to store links to child nodes,
        each index represents a letter */
        this.links = new Array(26).fill(null);
        /* Counter for number of words
        that end at this node */
        this.cntEndWith = 0;
        /* Counter for number of words
        that have this node as a prefix */
        this.cntPrefix = 0;
    }

    /* Check if the node contains
    a specific key (letter) */
    containsKey(ch) {
        /* Check if the link corresponding
        to the character exists */
        return this.links[ch.charCodeAt(0) - 'a'.charCodeAt(0)] !== null;
    }

    /* Get the node with a specific
    key (letter) from the Trie */
    get(ch) {
        /* Return the link
        corresponding to the character */
        return this.links[ch.charCodeAt(0) - 'a'.charCodeAt(0)];
    }

    /* Insert a new node with a specific
    key (letter) into the Trie */
    put(ch, node) {
        /* Set the link corresponding to
        the character to the provided node */
        this.links[ch.charCodeAt(0) - 'a'.charCodeAt(0)] = node;
    }

    /* Increment the count of words
    that end at this node */
    increaseEnd() {
        /* Increment the counter */
        this.cntEndWith++;
    }

    /* Increment the count of words
    that have this node as a prefix */
    increasePrefix() {
        /* Increment the counter */
        this.cntPrefix++;
    }

    /* Decrement the count of words
    that end at this node */
    deleteEnd() {
        /* Decrement the counter */
        this.cntEndWith--;
    }

    /* Decrement the count of words
    that have this node as a prefix */
    reducePrefix() {
        /* Decrement the counter */
        this.cntPrefix--;
    }
}

// Trie class
class Trie {
    constructor() {
        /* Constructor to initialize the
        Trie with an empty root node */
        this.root = new Node();
    }

    /* Inserts a word into the Trie
    Time Complexity O(len), where len
    is the length of the word */
    insert(word) {
        /* Start from the root node */
        let node = this.root;
        /* Iterate over each
        character in the word */
        for (let i = 0; i < word.length; i++) {
            if (!node.containsKey(word[i])) {
                /* Create a new node
                for the character */
                node.put(word[i], new Node());
            }
            /* Move to the child node
            corresponding to the character */
            node = node.get(word[i]);
            /* Increment the prefix
            count for the node */
            node.increasePrefix();
        }
        /* Increment the end count
        for the last node of the word */
        node.increaseEnd();
    }

    /* Returns the number of words
    equal to a given word */
    countWordsEqualTo(word) {
        /* Start from the root node */
        let node = this.root;
        /* Iterate over each character in the word */
        for (let i = 0; i < word.length; i++) {
            if (node.containsKey(word[i])) {
                /* Move to the child node
                corresponding to the character */
                node = node.get(word[i]);
            } else {
                /* Return 0 if the
                character is not found */
                return 0;
            }
        }
        /* Return the count of
        words ending at the node */
        return node.cntEndWith;
    }

    /* Returns the number of words
    starting with a given prefix */
    countWordsStartingWith(word) {
        /* Start from the root node */
        let node = this.root;
        /* Iterate over each character in the prefix */
        for (let i = 0; i < word.length; i++) {
            if (node.containsKey(word[i])) {
                /* Move to the child node
                corresponding to the character */
                node = node.get(word[i]);
            } else {
                /* Return 0 if the
                character is not found */
                return 0;
            }
        }
        /* Return the count of
        words with the prefix */
        return node.cntPrefix;
    }

    /* Erases a word from the Trie */
    erase(word) {
        /* Start from the root node */
        let node = this.root;
        /* Iterate over each character in the word */
        for (let i = 0; i < word.length; i++) {
            if (node.containsKey(word[i])) {
                /* Move to the child node
                corresponding to the character */
                node = node.get(word[i]);
                /* Decrement the prefix
                count for the node */
                node.reducePrefix();
            } else {
                /* Return if the
                character is not found */
                return;
            }
        }
        /* Decrement the end count
        for the last node of the word */
        node.deleteEnd();
    }
}

// Testing the Trie class
const trie = new Trie();
trie.insert("apple");
trie.insert("apple");
console.log("Inserting strings 'apple' twice into Trie");
console.log("Count Words Equal to 'apple':", trie.countWordsEqualTo("apple"));
console.log("Count Words Starting With 'app':", trie.countWordsStartingWith("app"));
console.log("Erasing word 'apple' from Trie");
trie.erase("apple");
console.log("Count Words Equal to 'apple':", trie.countWordsEqualTo("apple"));
console.log("Count Words Starting With 'app':", trie.countWordsStartingWith("app"));
console.log("Erasing word 'apple' from Trie");
trie.erase("apple");
console.log("Count Words Starting With 'app':", trie.countWordsStartingWith("app"));