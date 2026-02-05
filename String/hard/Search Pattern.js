// https://www.geeksforgeeks.org/problems/search-pattern-rabin-karp-algorithm--141631/1

/*

Brute

O(n*m) & O(1)

*/

function Search(text, pattern) {
  const n = text.length;
  const m = pattern.length;
  const result = [];

  // Loop over all possible starting positions
  for (let i = 0; i <= n - m; i++) {
    let j = 0;

    // Compare pattern with substring of text
    while (j < m && text[i + j] === pattern[j]) {
      j++;
    }

    // If all characters matched
    if (j === m) {
      result.push(i);
    }
  }

  return result;
}

/*

Optimal - Rabin Karp

O(n + m) & O(1)

*/

class Solution {
    search(text, pattern) {
        // Code here
        const pat = new RabinKarp(pattern)
        return pat.search(text)
    }
}

/*

Optimal - KMP

O(n + m) & O(m)

*/

class Solution {
    search(text, pattern) {
        // Code here
        const pat = new KMP(pattern)
        return pat.search(text)
    }
}



