// https://leetcode.com/problems/word-ladder/description/

/*

We need to replace each char one by one in the word from a - z, if that changed word is available in the wordList, 
we can take that word and push it to queue and remove from the set so that we don't process it again


*/

/*

Brute - BFS

O(N * L) & O(N * L)

*/

var ladderLength = function (beginWord, endWord, wordList) {
  // Convert wordList into a Set for O(1) lookup and deletion
  const set = new Set(wordList);

  // If endWord is not in the dictionary, transformation is impossible
  if (!set.has(endWord)) return 0;

  // If beginWord is already the endWord, shortest sequence length is 1
  if (beginWord == endWord) return 1;

  // BFS queue
  // Each element is [currentWord, currentLevel]
  // level = length of transformation sequence till this word
  const q = [[beginWord, 1]];

  const n = beginWord.length;

  // Remove beginWord from set if present to avoid revisiting
  if (set.has(beginWord)) set.delete(beginWord);

  let word;

  // Standard BFS loop
  while (q.length > 0) {
    // Dequeue the front element
    const [curr, level] = q.shift();

    // If we reached endWord, we found the shortest path (BFS guarantee)
    if (curr === endWord) return level;

    // Try changing every character of the word
    for (let i = 0; i < n; i++) {
      // Replace curr[i] with every letter from 'a' to 'z'
      for (let j = 0; j < 26; j++) {
        // Generate a new word by replacing one character
        word =
          curr.slice(0, i) + String.fromCharCode(97 + j) + curr.slice(i + 1);

        // If the generated word exists in the dictionary
        if (set.has(word)) {
          // Push it into BFS queue with incremented level
          q.push([word, level + 1]);

          // Remove it from set so we don't revisit it again
          // This ensures each word is processed only once
          set.delete(word);
        }
      }
    }
  }

  // If BFS ends and endWord was never reached
  return 0;
};

/*

Optimal - BFS

Instead of generating all the combinations, we create a patternMap and check only the words in the wordList

O(N * L) & O(N * L)

*/

// Helper function:
// Replaces the character at index `i` with '*'
// Example: replaceCharAt("hot", 1) → "h*t"
const replaceCharAt = (word, i) => word.slice(0, i) + "*" + word.slice(i + 1);

var ladderLength = function (beginWord, endWord, wordList) {
  // If endWord is not in dictionary, no valid transformation exists
  if (!wordList.includes(endWord)) return 0;

  // If beginWord is already the endWord
  if (beginWord == endWord) return 1;

  // Map to store patterns → all words that match that pattern
  // Example:
  // "*ot" → {"hot", "dot", "lot"}
  const patternMap = new Map();

  // Length of each word (all words have same length)
  const L = beginWord.length;
  let pattern;

  // -------------------------------
  // STEP 1: Build the pattern map
  // -------------------------------
  for (let word of wordList) {
    // For each position in the word
    for (let i = 0; i < L; i++) {
      // Create pattern by replacing one character with '*'
      pattern = replaceCharAt(word, i);

      // If pattern does not exist, initialize with empty Set
      if (!patternMap.has(pattern)) {
        patternMap.set(pattern, new Set());
      }

      // Add this word to the pattern’s neighbor set
      patternMap.get(pattern).add(word);
    }
  }

  // Visited set to avoid revisiting words (prevents cycles)
  const vis = new Set();
  vis.add(beginWord);

  // BFS queue: [currentWord, transformationLevel]
  // Level = length of transformation sequence so far
  const q = [[beginWord, 1]];

  // -------------------------------
  // STEP 2: BFS traversal
  // -------------------------------
  while (q.length > 0) {
    // Dequeue the front element
    const [curr, level] = q.shift();

    // Try changing every character of current word
    for (let i = 0; i < L; i++) {
      // Generate intermediate pattern
      pattern = replaceCharAt(curr, i);

      // Get all words that match this pattern
      const neighbours = patternMap.get(pattern) || [];

      // Explore all neighboring words
      for (let nei of neighbours) {
        // If we reach endWord, shortest path is found
        // BFS guarantees minimal level
        if (nei == endWord) return level + 1;

        // If neighbor has not been visited
        if (!vis.has(nei)) {
          vis.add(nei); // mark visited
          q.push([nei, level + 1]); // push to next BFS level
        }
      }
    }

    // Optimization:
    // Once a pattern is processed, clear it so it won't be reused
    // This avoids redundant neighbor expansions
    patternMap.set(pattern, []);
  }

  // If BFS ends without reaching endWord
  return 0;
};

/*

Core reason DFS fails

DFS explores one path completely before trying others.
BFS explores all paths of length k before length k+1.

Shortest path requires level-order traversal, which DFS does not provide.

*/
