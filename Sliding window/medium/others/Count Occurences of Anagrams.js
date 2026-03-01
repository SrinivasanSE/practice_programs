// https://www.geeksforgeeks.org/count-occurrences-of-anagrams/

/*

Brute

O(n) & O(2* 26)

*/

function isEqual(freq1, freq2) {
  for (let i = 0; i < 26; i++) {
    if (freq1[i] !== freq2[i]) return false;
  }
  return true;
}

class Solution {
  search(pat, txt) {
    // code here

    const freq1 = new Array(26).fill(0);
    const freq2 = new Array(26).fill(0);

    const m = pat.length;
    const n = txt.length;

    for (let i = 0; i < m; i++) {
      freq1[pat.charCodeAt(i) - 97]++;
      freq2[txt.charCodeAt(i) - 97]++;
    }
    let count = 0;

    if (isEqual(freq1, freq2)) {
      count += 1;
    }
    for (let i = m; i < n; i++) {
      freq2[txt.charCodeAt(i) - 97]++;
      freq2[txt.charCodeAt(i - m) - 97]--;

      if (isEqual(freq1, freq2)) {
        count += 1;
      }
    }

    return count;
  }
}

/*

Better

O(n) & O(26)

*/

function isAnagram(freq1) {
  for (let i = 0; i < 26; i++) {
    if (freq1[i] !== 0) return false;
  }
  return true;
}

class Solution {
  search(pat, txt) {
    // code here
    const freq = new Array(26).fill(0);

    const n = txt.length;
    const m = pat.length;
    let count = 0;

    for (let i = 0; i < m; i++) {
      freq[pat[i].charCodeAt(0) - 97]++;
    }

    for (let i = 0; i < n; i++) {
      freq[txt[i].charCodeAt(0) - 97]--;

      if (i >= m - 1) {
        if (isAnagram(freq)) count++;
        freq[txt[i - (m - 1)].charCodeAt(0) - 97]++;
      }
    }
    return count;
  }
}
