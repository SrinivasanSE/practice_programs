// https://www.geeksforgeeks.org/smallest-window-containing-0-1-and-2/

class Solution {
  // Function to check whether the list is palindrome.
  smallestSubstring(S) {
    // your code here

    const n = S.length;
    const freq = new Array(3).fill(0);

    let left = 0,
      length = n + 1,
      count = 0;
    for (let right = 0; right < n; right++) {
      freq[+S[right]]++;
      if (freq[+S[right]] === 1) {
        count++;
      }

      while (count === 3) {
        length = Math.min(length, right - left + 1);
        freq[+S[left]]--;
        if (freq[+S[left]] === 0) count--;
        left++;
      }
    }

    return length === n + 1 ? -1 : length;
  }
}

const smallestSubstring = (S) => {
  let res = 9999999;

  // To check 0, 1 and 2
  let zero = false,
    one = false,
    two = false;

  // To store indexes of 0, 1 and 2
  let zeroindex, oneindex, twoindex;
  for (let i = 0; i < S.length; i++) {
    if (S[i] == "0") {
      zero = true;
      zeroindex = i;
    } else if (S[i] == "1") {
      one = true;
      oneindex = i;
    } else if (S[i] == "2") {
      two = true;
      twoindex = i;
    }

    // Calculating length
    if (zero && one && two)
      res = Math.min(
        res,
        Math.max(...[zeroindex, oneindex, twoindex]) -
          Math.min(...[zeroindex, oneindex, twoindex])
      );
  }

  if (res == 9999999) return -1;
  return res + 1;
};
