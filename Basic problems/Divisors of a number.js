// https://www.geeksforgeeks.org/dsa/find-all-factors-of-a-natural-number/

class Solution {
    divisors(n) {
        let res = []
        for(let i = 1; i*i <= n; i++) {
            if (n % i === 0) {
                res.push(i)

                if (n % i != i) {
                    res.push(n / i)
                }
            }
        }

        res.sort((a, b) => a - b)

        return res
    }
}