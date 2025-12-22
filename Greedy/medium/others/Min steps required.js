// https://www.geeksforgeeks.org/dsa/minimum-steps-to-empty-string-of-as-and-bs/

// O(n) & O(1)

function minSteps(str) {
  // str contains only a and b
  let cnt = 1; // number of groups (segments) of consecutive same characters.

  for (let i = 1; i < str.length; i++) {
    if (str[i] !== str[i - 1]) {
      // a new group starts
      cnt++;
    }
  }

  return Math.floor(cnt / 2) + 1; // Removing one group can cause two neighboring groups (same character) to merge. So effectively, 2 groups disappear per operation
}

/*

Let’s take "abbaab" → groups = ["a", "bb", "aa", "b"] → cnt = 4

Step 1: Remove "bb" → "aaab" (the two ‘a’ groups merged)
Step 2: Remove "aaa" → "b"
Step 3: Remove "b" → empty

✅ Steps = 3
✅ Formula → Math.floor(4 / 2) + 1 = 3

*/
