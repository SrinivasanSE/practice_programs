class Solution {
    isPrime(n) {
          //your code goes here
          let factors = 0

          for(let i = 0; i*i <= n; i++) {
            if (n % i === 0) {
                factors++

                if (n / i != i) {
                    factors++
                }
            }

            if (factors > 2) {
                return false
            }
          }

          return true
    }
}