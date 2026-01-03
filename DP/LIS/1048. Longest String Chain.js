// https://leetcode.com/problems/longest-string-chain/description/

/*

Recursion/Memo - Similar to LCS

*/

const isPossible = (s1, s2) => {
  const n1 = s1.length;
  const n2 = s2.length;
  if (n1 - n2 != 1) return false;

  let i = 0,
    j = 0,
    mismatch = 0;

  while (i < n1 && j < n2) {
    if (s1[i] === s2[j]) {
      j++;
    } else {
      mismatch++;
      if (mismatch > 1) return false;
    }
    i++;
  }

  return true;
};

var longestStrChain = function (words) {
  const n = words.length;

  words.sort((a, b) => a.length - b.length); // sort the words so that they are increasing in length

  const dp = Array.from({ length: n }, () => new Array(n + 1).fill(-1));

  const findLength = (i, prev) => {
    if (i === n) return 0;

    if (dp[i][prev + 1] != -1) return dp[i][prev + 1];
    const notTake = findLength(i + 1, prev);
    let take = 0;
    if (prev === -1 || isPossible(words[i], words[prev])) {
      // only condition changed
      take = 1 + findLength(i + 1, i);
    }

    return (dp[i][prev + 1] = Math.max(notTake, take));
  };

  return findLength(0, -1);
};

/*

Space ops

O(n^2*L) & O(n)


*/

var longestStrChain = function (words) {
  const n = words.length;

  // Sort words by length (shorter words first)
  words.sort((a, b) => a.length - b.length);

  // dp[i] will store the length of the longest string chain ending at words[i]
  const dp = new Array(n).fill(1);

  let max = 1; // Maximum length of string chain found so far

  // Build dp array
  for (let i = 1; i < n; i++) {
    for (let prev = 0; prev < i; prev++) {
      // Check if words[prev] can be a predecessor of words[i]
      if (isPossible(words[i], words[prev])) {
        dp[i] = Math.max(dp[i], 1 + dp[prev]);
      }
    }
    // Update overall maximum chain length
    max = Math.max(max, dp[i]);
  }

  return max;
};

/*

Optimised

O(N*L^2) & O(n)

*/

// For each word, delete one character and see if the smaller word already formed a chain.

var longestStrChain = function (words) {
  // STEP 1: Sort words by length (shorter → longer)
  // Example:
  // Input: ["bdca", "bda", "ba", "a", "b"]
  // After sort: ["a", "b", "ba", "bda", "bdca"]
  words.sort((a, b) => a.length - b.length);

  // dp[word] = length of the longest chain ending at 'word'
  // Example:
  // dp.get("ba") = 2   → chain: "a" → "ba"
  const dp = new Map();

  let max = 1; // At least one word always forms a chain

  // STEP 2: Process words one by one (in increasing length)
  for (let word of words) {
    // Every word itself can form a chain of length 1
    // Example: "a" → 1, "b" → 1
    let current = 1;

    // STEP 3: Try removing ONE character from the word
    // to find all possible predecessors
    for (let i = 0; i < word.length; i++) {
      // Remove character at index i
      // Example: word = "bda"
      // i = 0 → "da"
      // i = 1 → "ba"
      // i = 2 → "bd"
      const pre = word.slice(0, i) + word.slice(i + 1);

      // If the predecessor exists, update the chain length
      if (dp.has(pre)) {
        // Example:
        // dp.get("ba") = 2
        // current = max(1, 2 + 1) = 3
        current = Math.max(current, dp.get(pre) + 1);
      }
    }

    // Store the longest chain ending at this word
    // Example:
    // dp.set("bda", 3)
    dp.set(word, current);

    // Update global maximum chain length
    max = Math.max(max, current);
  }

  // Example final dp map:
  // "a"    → 1
  // "b"    → 1
  // "ba"   → 2
  // "bda"  → 3
  // "bdca" → 4
  return max;
};
