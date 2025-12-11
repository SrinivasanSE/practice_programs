// https://www.geeksforgeeks.org/find-the-longest-substring-with-k-unique-characters-in-a-given-string/

/*

Brute

O(n^2) & O(1)

*/

function longestKSubstr(s, k) {
  let ans = -1;

  // set to track unique characters in current substring
  let st = new Set();

  for (let i = 0; i < s.length; i++) {
    // reset the set for a new starting index
    st.clear();

    // expand the substring from index i to j
    for (let j = i; j < s.length; j++) {
      st.add(s[j]);

      // number of unique characters becomes exactly k,
      if (st.size === k) {
        ans = Math.max(ans, j - i + 1);
      }

      if (st.size > k) {
        break;
      }
    }
  }

  return ans;
}

/*

Optimal

O(n) & O(1)

*/

class Solution {
  longestKSubstr(s, k) {
    // code here
    const freq = new Array(26).fill(0);
    let left = 0;
    const n = s.length;
    let count = 0,
      right,
      max = -1;
      
    for (right = 0; right < n; right++) {
      freq[s[right].charCodeAt(0) - 97]++;
      if (freq[s[right].charCodeAt(0) - 97] === 1) count++;

      if (count > k) {
        freq[s[left].charCodeAt(0) - 97]--;
        if (freq[s[left].charCodeAt(0) - 97] === 0) count--;
        left++;
      }

      if (count === k) {
        max = Math.max(max, right - left + 1);
      }
    }

    return max;
  }
}
