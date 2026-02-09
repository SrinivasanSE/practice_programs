// https://www.geeksforgeeks.org/dsa/prime-factor/#efficient-solution-sieve-of-eratosthenes


/*

Optimal - Using seive concept

O(n*log(log(n))) + O(logn) & O(n)

*/

class Solution {
  primeFac(n) {
    // code here
    const spf = Array.from({ length: n + 1 }, (_, i) => i); // assign the same index as value also

    for (let i = 2; i * i <= n; i++) {
      // find smallest prime factor for each number
      if (spf[i] === i) {
        // if it's same, that means it's a prime
        for (let j = i * i; j <= n; j += i) {
          if (spf[j] === j) {
            // if it's not already changed, then only change it
            spf[j] = i;
          }
        }
      }
    }

    const set = new Set();

    while (n > 1) {
      set.add(spf[n]);
      n = n / spf[n]; // keep dividing by the smallest prime factor
    }

    return Array.from(set).sort((a, b) => a - b);
  }
}
