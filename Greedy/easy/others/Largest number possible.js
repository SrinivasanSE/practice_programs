// https://www.geeksforgeeks.org/find-the-largest-number-with-given-number-of-digits-and-sum-of-digits/

// O(n) & O(1)

class Solution {
  findLargest(n, s) {
    // code here
    if (s === 0 && n > 1) return -1;
    if (s > 9 * n) {
      //  Since the maximum digit is 9, the maximum possible sum from n digits is 9 * n. If s is more than this, it's impossible. So we return -1
      return -1;
    }
    let str = "",
      i = 0;
    while (i < n) {
      // try to add 9s as much as possible from the left
      if (s >= 9) {
        s -= 9;
        str += "9";
      } else {
        str += s;
        s = 0;
      }
      i++;
    }

    return str;
  }
}
