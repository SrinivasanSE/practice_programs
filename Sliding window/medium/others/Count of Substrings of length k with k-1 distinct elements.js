// https://www.geeksforgeeks.org/count-of-substrings-of-length-k-with-exactly-k-distinct-characters/

/*

Brute

O(n*k) & O(k)

*/

class Solution {
  countOfSubstrings(s, k) {
    // code here
    const n = s.length;
    let count = 0;
    for (let i = 0; i <= n - k; i++) {
      let set = new Set();
      for (let j = i; j < i + k; j++) {
        set.add(s[j]);
      }

      if (set.size === k - 1) {
        count++;
      }
    }

    return count;
  }
}

/*

Better

O(n) & O(n)

*/

class Solution {
  countOfSubstrings(s, k) {
    // code here
    const n = s.length;
    let count = 0;

    if (k === 1) {
      return count;
    }

    const hashset = new Map();

    for (let i = 0; i < k; i++) {
      hashset.set(s[i], (hashset.get(s[i]) || 0) + 1);
    }

    if (hashset.size === k - 1) {
      count++;
    }
    for (let i = k; i < n; i++) {
      hashset.set(s[i - k], hashset.get(s[i - k]) - 1);
      hashset.set(s[i], (hashset.get(s[i]) || 0) + 1);
      if (hashset.get(s[i - k]) === 0) {
        hashset.delete(s[i - k]);
      }
      if (hashset.size === k - 1) {
        count++;
      }
    }
    return count;
  }
}

/*

Better - Using var to check the distinct count insteadof map size

O(n) & O(n)

*/

class Solution {
  substrCount(s, k) {
    // code here
    let left = 0;
    const n = s.length;

    const freq = new Array(26).fill(0);
    let distinct = 0,
      count = 0;

    for (let right = 0; right < n; right++) {
      freq[s[right].charCodeAt(0) - 97]++;
      if (freq[s[right].charCodeAt(0) - 97] == 1) distinct++;

      if (right >= k - 1) {
        if (distinct == k - 1) {
          count++;
        }
        freq[s[left].charCodeAt(0) - 97]--;
        if (freq[s[left].charCodeAt(0) - 97] == 0) distinct--;
        left++;
      }
    }

    return count;
  }
}
