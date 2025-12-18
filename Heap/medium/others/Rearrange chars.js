// https://www.geeksforgeeks.org/rearrange-characters-string-no-two-adjacent/

/*

Brute - Heap

O(nlogn) & O(n)

*/

class Solution {
  // Rearranges the string so that no two adjacent characters are the same.
  // Returns the rearranged string, or "" if impossible.
  rearrangeString(str) {
    // Step 1: Count frequency of each character
    const freq = {};
    let maxFreq = 0;
    for (let char of str) {
      freq[char] = (freq[char] || 0) + 1;
      maxFreq = Math.max(freq[char], maxFreq);
    }

    // Step 2: Early check - If any character appears more than half the length (rounded up),
    // it's impossible to rearrange without adjacent duplicates.
    if (maxFreq > Math.ceil(str.length / 2)) return "";

    // Step 3: Build a max-heap based on character frequency
    // This allows us to always pick the most frequent character available
    const heap = new MaxHeap();
    for (let key of Object.keys(freq)) {
      heap.insert({ char: key, freq: freq[key] });
    }

    // Step 4: Rearrangement loop
    // lastUsed keeps track of the character used in the previous step (if it still has remaining frequency)
    let lastUsed = null;
    let res = "";

    while (!heap.isEmpty()) {
      // Pick the most frequent character not used in the previous step
      let { freq, char } = heap.extractMax();
      freq -= 1; // Use this character once
      res += char; // Add to result string

      // If there's a character from the previous step that still has remaining frequency,
      // put it back into the heap so it can be reused (but not immediately)
      if (lastUsed) {
        heap.insert(lastUsed);
      }

      // If the current character still has remaining frequency,
      // save it as lastUsed to prevent immediate reuse
      if (freq > 0) {
        lastUsed = { freq, char };
      } else {
        lastUsed = null;
      }
    }

    // Step 5: Final check - If we used all characters, return the result.
    // Otherwise, return "" (not possible)
    if (res.length === str.length) {
      return res;
    }
    return "";
  }
}

/*

Optimal - Greedy

O(n) & O(n)

*/

/*

The idea is to fill all the even positions of the result string first, with the highest frequency character. 
If there are still some even positions remaining, fill them first. Once even positions are done, then fill the odd positions. 
This way, it can be ensured that no two adjacent characters are the same. 

*/

class Solution {
  rearrangeString(str) {
    // code here
    const freq = new Array(26).fill(0);
    const n = str.length;
    let maxFreq = 0,
      ch = "",
      idx;
    for (let i = 0; i < n; i++) {
      idx = str[i].charCodeAt(0) - 97;
      freq[idx]++;
      if (maxFreq < freq[idx]) {
        // track the maxFreq and the character
        maxFreq = freq[idx];
        ch = str[i];
      }
    }

    if (maxFreq > Math.ceil(n / 2)) return "";
    idx = 0;
    const res = new Array(n);
    while (maxFreq > 0) {
      // Fill the maxFreq char in the even positions
      res[idx] = ch;
      idx += 2;
      maxFreq--;
    }

    freq[ch.charCodeAt(0) - 97] = 0; // reset the freq of the maxFreq char to 0 since that char have been already filled

    for (let i = 0; i < 26; i++) {
      // Go through all the chars and fill them in alternating positions
      if (freq[i] === 0) continue;

      while (freq[i] > 0) {
        idx = idx >= n ? 1 : idx; // // Switch to odd, when all even positions were filled
        res[idx] = String.fromCharCode(97 + i);
        idx += 2;
        freq[i]--;
      }
    }

    return res.join("");
  }
}
