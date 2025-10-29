// https://www.geeksforgeeks.org/dsa/print-all-prime-factors-of-a-given-number/#efficient-approach-time-osqrtn-and-space-1


/*

Better

O(n) & O(1)

*/

function primeFactor(n) {
    let ans = [];

    // Loop from 2 to n
    for (let i = 2; i <= n; i++) {

        if (n % i === 0) {
            ans.push(i);
            while (n % i === 0 && n > 0) {


                // divide n by i to remove this factor
                n = n / i;
            }
        }
    }
    return ans;
}


/*

Optimal

O(sqrt(n)) & O(1)

*/



class Solution {
    largestPrimeFactor(n) {
        // code here
        const factors = []
        if (n % 2 === 0) { // do this, so that we can increment i by 2 below
            factors.push(2)

            while (n % 2 === 0) {
                n /= 2
            }
        }

        for (let i = 3; i * i <= n; i += 2) { // run upto sqrt(n) only
            if (n % i === 0) {
                factors.push(i)

                while (n % i === 0 && n > 0) {
                    n /= i
                }
            }
        }

        if (n > 2) factors.push(n) // when n is prime like 77, 97, the for loop will include all the small prime factors and this may not be get divided


        return factors
    }
}