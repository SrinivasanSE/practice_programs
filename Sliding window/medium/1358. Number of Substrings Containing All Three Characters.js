// https://leetcode.com/problems/number-of-substrings-containing-all-three-characters/description/

/*

Brute

O(n^2) & O(1)

*/

var numberOfSubstrings = function (s) {
  const n = s.length;
  let aC = 0,
    bC = 0,
    cC = 0,
    count = 0;

  for (let i = 0; i < n; i++) {
    (aC = 0), (bC = 0), (cC = 0);
    for (let j = i; j < n; j++) {
      if (s[j] === "a") aC++;
      else if (s[j] === "b") bC++;
      else cC++;

      if (aC > 0 && bC > 0 && cC > 0) {
        count += n - j;
        break;
      }
    }
  }

  return count;
};

/*

Better

O(2n) & O(1)

*/

var numberOfSubstrings = function (s) {
  const n = s.length;
  let count = 0,
    left = 0;
  const hashmap = new Map(); // we can use new Array(3) as well since only 3 chars a,b,c will be present

  for (let right = 0; right < n; right++) {
    hashmap.set(s[right], (hashmap.get(s[right]) || 0) + 1);

    while (hashmap.size === 3) {
      // when there are 3 characters in the substring, we try to shrink the window and find the count
      count += n - right; // if the current substr has 3 chars, definitely the remaining substrings also will contain 3 chars
      hashmap.set(s[left], hashmap.get(s[left]) - 1);
      if (hashmap.get(s[left]) === 0) {
        hashmap.delete(s[left]);
      }

      left += 1;
    }
  }

  return count;
};

/*

Optimal

O(n) & O(1)

In our "abcab" example, at position 4:

The last 'a' appears at position 3.
The last 'b' is at our current position 4.
The last 'c' appears at position 2.
Since 'c' appears leftmost at position 2, any substring starting at positions 0, 1, or 2 and ending at position 4 will be valid. This gives us three valid substrings at this position!

*/

var numberOfSubstrings = function (s) {
  const n = s.length;
  let count = 0,
    min;

  let hashmap = { a: -1, b: -1, c: -1 };
  for (let i = 0; i < n; i++) {
    hashmap[s[i]] = i;
    min = Math.min(hashmap.a, hashmap.b, hashmap.c); // if all the chars are there, we can get the min leftMost position,
    //  if it's 2 for ex, substr starting from 0, 1 also is valid, so doing min + 1 will give all the valid substr ending at max(a, b, c) index. If any of the char is not there, we will get min as -1, so min + 1 will be zero only
    count += min + 1;
  }
  return count;
};
