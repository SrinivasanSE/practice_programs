// https://www.geeksforgeeks.org/dsa/rabin-karp-algorithm-for-pattern-searching/
// https://youtu.be/yFHV7weZ_as?si=l7gefc0OgXkBtdGi


/*

O(n + m) & O(1)

*/

class RabinKarp {
  constructor(pattern) {
    this.pattern = pattern;
    this.m = pattern.length;

    // Base = number of possible characters
    // ASCII has 256 characters
    this.base = 256;

    // Prime modulus:
    // 1) Prevents integer overflow
    // 2) Keeps hash values small
    // 3) Reduces collisions
    this.mod = 1e9 + 7;

    // Hash of the pattern string
    this.patternHash = 0;

    // highestPower = base^(m-1) % mod
    // Used when removing the leftmost character
    // during rolling hash
    this.highestPower = 1;

    // Precompute required values
    this._precompute();
  }

  /**
   * Precomputation step
   *
   * 1) Compute highestPower = base^(m-1) % mod
   * 2) Compute hash of the pattern
   */
  _precompute() {
    // -------------------------------
    // Step 1: Compute highestPower
    // -------------------------------
    // If pattern length = m = 4
    // highestPower = 256^3 % 101
    for (let i = 0; i < this.m - 1; i++) {
      this.highestPower = (this.highestPower * this.base) % this.mod;
    }

    // -------------------------------
    // Step 2: Compute pattern hash
    // -------------------------------
    // Hash formula:
    // hash = (s[0]*base^(m-1) + s[1]*base^(m-2) + ... + s[m-1]) % mod
    //
    // Implemented iteratively as:
    // hash = base * hash + charCode

    // hash(i) = hash(i - 1) * base + newChar

    for (let i = 0; i < this.m; i++) {
      this.patternHash =
        (this.base * this.patternHash + this.pattern.charCodeAt(i)) % this.mod;
    }
  }

  /**
   * Searches pattern in text
   * Returns all starting indices where pattern is found
   */
  search(text) {
    const n = text.length;
    const result = [];

    // Edge case: pattern longer than text
    if (n < this.m) return result;

    let textHash = 0;

    // ------------------------------------
    // Step 1: Compute hash of first window
    // ------------------------------------
    // First window = text[0 ... m-1]
    for (let i = 0; i < this.m; i++) {
      textHash = (this.base * textHash + text.charCodeAt(i)) % this.mod;
    }

    // ------------------------------------
    // Step 2: Slide window over text
    // ------------------------------------
    for (let i = 0; i <= n - this.m; i++) {
      // --------------------------------
      // If hashes match, verify manually
      // --------------------------------
      // (to handle collisions)
      if (textHash === this.patternHash) {
        let match = true;
        for (let j = 0; j < this.m; j++) {
          if (text[i + j] !== this.pattern[j]) {
            match = false;
            break;
          }
        }
        if (match) result.push(i);
      }

      // --------------------------------
      // Rolling hash calculation
      // --------------------------------
      // Remove leftmost character
      // Add next character on the right
      //
      // Formula:
      // newHash =
      // ( base * (oldHash - leftChar * highestPower)
      //   + rightChar ) % mod
      //
      if (i < n - this.m) {
        textHash =
          (this.base * (textHash - text.charCodeAt(i) * this.highestPower) +
            text.charCodeAt(i + this.m)) %
          this.mod;

        // JS can produce negative modulo values
        // Fix them to stay in [0, mod)
        if (textHash < 0) textHash += this.mod;
      }
    }

    return result;
  }
}


class Solution {
    rabinKarp(text, pattern) {
        // Code here
        const pat = new RabinKarp(pattern)
        return pat.search(text)
    }
}