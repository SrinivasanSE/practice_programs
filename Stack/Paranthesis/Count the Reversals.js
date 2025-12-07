// https://www.geeksforgeeks.org/problems/count-the-reversals0401/1

// Similar to 921

// Approach 1: Using stack
class Solution {
  countMinReversals(s) {
    const stk = []; // stack to keep track of unmatched '{'

    // If string length is odd, it's impossible to balance
    // because each pair requires 2 brackets
    if (s.length % 2 === 1) return -1;

    let count = 0; // count of unmatched '}' that have no matching '{'

    // Traverse the string
    for (let char of s) {
      if (char === "{") {
        // Opening bracket, push to stack
        stk.push(char);
      } else {
        // Closing bracket
        if (stk.length === 0) {
          // No '{' to match this '}' → need reversal
          count++;
        } else {
          // Match with a previous '{'
          stk.pop();
        }
      }
    }

    // At the end:
    // stk.length = unmatched '{' left
    // count = unmatched '}' encountered during scanning
    const open = stk.length;
    const close = count;

    // Minimum reversals formula:
    // reverse half of unmatched '{' and half of unmatched '}'
    // Group same-type unmatched brackets into pairs; each pair requires 1 reversal. If there is one leftover (an odd count), it needs one extra reversal.
    // open = 2, close = 3, if we have 2 unmatched open brackets, {{, reversing one will pair it, {}, if we have 3 unmatched close brackets, }}}, we need 2 reversals
    return Math.floor((open + 1) / 2) + Math.floor((close + 1) / 2);
  }
}

/* 
Approach 2: Using counters (optimal, O(1) space)
*/
class Solution {
  countMinReversals(s) {
    // Odd length cannot be balanced
    if (s.length % 2 === 1) return -1;

    let open = 0; // unmatched '{'
    let close = 0; // unmatched '}'

    for (let char of s) {
      if (char === "{") {
        // Found an opening bracket, increment open
        open++;
      } else {
        // Found a closing bracket
        if (open > 0) {
          // Match it with a previous '{'
          open--;
        } else {
          // No '{' to match → increment close (needs reversal)
          close++;
        }
      }
    }

    // Minimum reversals:
    // - reverse half of unmatched '{' → (open+1)/2
    // - reverse half of unmatched '}' → (close+1)/2
    // +1 handles odd counts
    return Math.floor((open + 1) / 2) + Math.floor((close + 1) / 2);
  }
}
