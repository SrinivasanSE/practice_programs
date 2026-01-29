// https://leetcode.com/problems/word-ladder-ii/

/*

BFS

O(N*L*26*Path copy) * High

*/

var findLadders = function (beginWord, endWord, wordList) {
  // Store dictionary for O(1) lookup
  const set = new Set(wordList);

  // If endWord not present, impossible
  if (!set.has(endWord)) return [];

  // lastUsed keeps track of words used in current BFS level
  // These words will be removed ONLY after finishing that level
  let lastUsed = [beginWord];

  // Queue stores ENTIRE PATHS (not just words)
  // Example: ["hit", "hot"]
  const q = [[beginWord]];

  let level = 0; // Current BFS depth
  let word, temp;
  const res = []; // Final answer
  const L = beginWord.length; // Word length

  while (q.length > 0) {
    const curr = q.shift(); // curr is a full path

    // ---------------------------------------
    // LEVEL CHANGE DETECTION
    // ---------------------------------------
    // When path length increases, we move to next BFS level
    if (curr.length > level) {
      level++;

      // Remove all words used in previous level
      // This prevents cycles but allows multiple shortest paths
      for (let used of lastUsed) {
        set.delete(used);
      }

      lastUsed = [];
    }

    // Last word in the current path
    word = curr[curr.length - 1];

    // ---------------------------------------
    // END WORD FOUND
    // ---------------------------------------
    if (word === endWord) {
      // First shortest path
      if (res.length === 0) {
        res.push(curr);
      }
      // Another path with same shortest length
      else if (res[res.length - 1].length === curr.length) {
        res.push(curr);
      }
      // Longer path → stop BFS
      else {
        break;
      }
    }

    // ---------------------------------------
    // TRY ALL POSSIBLE ONE-CHARACTER CHANGES
    // ---------------------------------------
    for (let i = 0; i < L; i++) {
      for (let j = 0; j < 26; j++) {
        // Replace i-th character with 'a' to 'z'
        temp =
          word.slice(0, i) + String.fromCharCode(97 + j) + word.slice(i + 1);

        // If valid dictionary word
        if (set.has(temp)) {
          lastUsed.push(temp); // Mark for deletion later
          q.push([...curr, temp]); // Extend path
        }
      }
    }
  }

  return res;
};

/*

BFS - Using pattern map

*/

const replaceCharAt = (word, i) => word.slice(0, i) + "*" + word.slice(i + 1);

var findLadders = function (beginWord, endWord, wordList) {
  const set = new Set(wordList);
  if (!set.has(endWord)) return [];

  let lastUsed = [beginWord];

  // ---------------------------------------
  // BUILD PATTERN MAP
  // Example: "hot" → "*ot", "h*t", "ho*"
  // ---------------------------------------
  const pattern = new Map();
  const L = beginWord.length;

  for (let word of wordList) {
    for (let i = 0; i < L; i++) {
      const temp = replaceCharAt(word, i);
      if (!pattern.has(temp)) pattern.set(temp, []);
      pattern.get(temp).push(word);
    }
  }

  const q = [[beginWord]];
  let level = 0,
    word;
  const res = [];

  while (q.length > 0) {
    const curr = q.shift();

    // Level handling
    if (curr.length > level) {
      level++;
      for (let used of lastUsed) set.delete(used);
      lastUsed = [];
    }

    word = curr[curr.length - 1];

    // Found endWord
    if (word === endWord) {
      if (res.length === 0) res.push(curr);
      else if (res[res.length - 1].length === curr.length) res.push(curr);
      else break;
    }

    // ---------------------------------------
    // GET NEIGHBORS VIA PATTERNS
    // ---------------------------------------
    for (let i = 0; i < L; i++) {
      const temp = replaceCharAt(word, i);
      const neighbors = pattern.get(temp) || [];

      for (let nei of neighbors) {
        if (set.has(nei)) {
          lastUsed.push(nei);
          q.push([...curr, nei]);
        }
      }
    }
  }

  return res;
};

/*

BFS + Backtracking

O(N × L + K × D) & O(N × L + K × D)

*/

// Utility function:
// Replaces the character at index `i` with '*'
// Used to create intermediate "patterns"
//
// Example:
// word = "hot", i = 1 → "h*t"
const _replaceCharAt = (word, i) => word.slice(0, i) + "*" + word.slice(i + 1);

var findLadders = function (beginWord, endWord, wordList) {
  // -------------------------------------------------------
  // EDGE CASE
  // If endWord is not present in the dictionary,
  // no transformation sequence is possible
  // -------------------------------------------------------
  if (!wordList.includes(endWord)) return [];

  // -------------------------------------------------------
  // STEP 1: BUILD PATTERN MAP
  // -------------------------------------------------------
  // This map helps us find all words that differ
  // by exactly ONE character in O(1) time
  //
  // Example:
  // "hot" → "*ot", "h*t", "ho*"
  // "dot" → "*ot", "d*t", "do*"
  //
  // pattern "*ot" → ["hot", "dot", "lot"]
  // -------------------------------------------------------
  const patterns = new Map();
  const L = beginWord.length;

  for (let word of wordList) {
    for (let i = 0; i < L; i++) {
      const pattern = replaceCharAt(word, i);

      if (!patterns.has(pattern)) {
        patterns.set(pattern, []);
      }

      patterns.get(pattern).push(word);
    }
  }

  // -------------------------------------------------------
  // STEP 2: BFS DATA STRUCTURES
  // -------------------------------------------------------

  // dist[word] = shortest distance from beginWord to `word`
  // This ensures we ONLY consider shortest paths
  const dist = new Map();

  // parents[word] = list of words that can reach `word`
  // in the shortest path length
  //
  // Example:
  // parents["cog"] = ["dog", "log"]
  const parents = new Map();

  // BFS queue (stores words, NOT full paths)
  const q = [beginWord];

  // Distance to beginWord is 0
  dist.set(beginWord, 0);

  // Once endWord is found, we never explore paths longer than this
  let minDist = Infinity;

  // -------------------------------------------------------
  // STEP 3: BFS (LEVEL ORDER SEARCH)
  // -------------------------------------------------------
  while (q.length > 0) {
    const curr = q.shift();
    const currDist = dist.get(curr);

    // If current path is already longer than shortest found,
    // stop exploring this branch
    if (currDist + 1 > minDist) continue;

    // Try all possible single-letter transformations
    for (let i = 0; i < L; i++) {
      const pattern = replaceCharAt(curr, i);

      // All dictionary words matching this pattern
      const neighbors = patterns.get(pattern) || [];

      for (let nei of neighbors) {
        // CASE 1: First time visiting `nei`
        if (!dist.has(nei)) {
          dist.set(nei, currDist + 1);

          // Initialize parent list
          parents.set(nei, [curr]);

          q.push(nei);
        }
        // CASE 2: Another shortest path to `nei`
        else if (dist.get(nei) === currDist + 1) {
          parents.get(nei).push(curr);
        }

        // If endWord is reached,
        // record the shortest distance
        if (nei === endWord) {
          minDist = currDist + 1;
        }
      }
    }
  }

  // If endWord was never reached
  if (!dist.has(endWord)) return [];

  // -------------------------------------------------------
  // STEP 4: BACKTRACKING TO BUILD ALL PATHS
  // -------------------------------------------------------
  let res = []; // Final result
  let path = []; // Current path being built

  // DFS backtracking from endWord → beginWord
  const backtrack = (word) => {
    path.push(word);

    // Base case: reached beginWord
    if (word === beginWord) {
      // Reverse path since we built it backwards
      res.push([...path].reverse());
    } else {
      // Try all valid parents
      for (let par of parents.get(word)) {
        backtrack(par);
      }
    }

    // Backtrack
    path.pop();
  };

  backtrack(endWord);
  return res;
};
