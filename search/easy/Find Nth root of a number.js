// https://takeuforward.org/data-structure/nth-root-of-a-number-using-binary-search/


class Solution {
    power(num, p, max) {
        let ans = 1
        for(let i = 1; i <= p; i++) {
            ans*=num
            if (ans > max) return 2 // while multiplying if it exceeds max value, return to prevent overflow
        }

        if (ans === max) return 1
        return 0
    }
    NthRoot(n, m) {
      let l = 1, r = m
      while (l <= r) {
        const mid = l + Math.floor((r - l)/2)
        const val = this.power(mid, n, m)
        if (val === 1) {
            return mid
        }

        if (val === 0) { // if power is less than m, go to right to get higher value
            l = mid + 1
        } else {
            r = mid - 1
        }
      }

      return -1
    }
}