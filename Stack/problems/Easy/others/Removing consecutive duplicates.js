// https://www.geeksforgeeks.org/problems/consecutive-elements2306/1

/*

Stack

O(n) & O(n)

*/

function removeDuplicates(str) {
  let st = [];
  let n = str.length;

  // Traverse through the string
  for (let i = 0; i < n; i++) {
    // If stack is empty or current char is not equal to top of stack, push it
    if (st.length === 0 || st[st.length - 1] !== str[i]) {
      st.push(str[i]);
    }
    // If current char is same as top of stack, skip adding it
  }

  // Build result from stack
  return st.join(""); // Stack already maintains order
}

/*

Sliding window

O(n) & O(n)

*/

function removeDuplicates(str) {
  let n = str.length;
  if (n === 0) return str;

  let result = [];
  let i = 0;

  // Traverse through the string using a sliding window
  while (i < n) {
    // Add current character
    result.push(str[i]);

    // Skip all consecutive duplicates
    while (i + 1 < n && str[i] === str[i + 1]) {
      i++;
    }
    i++;
  }
  return result.join("");
}

// Removing consecutive duplicates - 2

// https://www.geeksforgeeks.org/problems/removing-consecutive-duplicates-2-1587115621/1?page=1&category=Stack&difficulty=Easy&status=unsolved&sortBy=submissions

class Solution {
  removePair(s) {
    // code here
    const stk = [s[0]];
    const n = s.length;

    for (let i = 1; i < n; i++) {
      if (stk.length > 0 && stk[stk.length - 1] == s[i]) {
        stk.pop();
      } else {
        stk.push(s[i]);
      }
    }

    return stk.join("");
  }
}
