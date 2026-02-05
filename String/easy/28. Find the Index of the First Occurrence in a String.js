// https://leetcode.com/problems/find-the-index-of-the-first-occurrence-in-a-string/description/


/*

Brute

O(n*m) & O(1)

*/


function Search(text, pattern) {
  const n = text.length;
  const m = pattern.length;

  // Loop over all possible starting positions
  for (let i = 0; i <= n - m; i++) {
    let j = 0;

    // Compare pattern with substring of text
    while (j < m && text[i + j] === pattern[j]) {
      j++;
    }

    // If all characters matched
    if (j === m) {
      return -1
    }
  }

  return -1;
}


/*

Optimal - Rabin or KMP

O(n + m) & O(m)

*/


var strStr = function (haystack, needle) {
    const rabin = new RabinKarp(needle) // or KMP class can be used
    return rabin.search(haystack)
};