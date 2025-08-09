// https://www.geeksforgeeks.org/dsa/find-all-factors-of-a-natural-number/

/*
Brute
O(n) & O(N)
*/

function printDivisors(n) {
    const divisors = [];

    for (let i = 1; i <= n; i++) {
        if (n % i === 0) {
            divisors.push(i);
        }
    }

    return divisors;
}

/*
Better
O(sqrt(n)) & O(n)

*/

/*
for n = 36

1*36
2*18
3*12
4*9
6*6 - we can check till here only, the above and below are mirror of each other
9*4
12*3
18*2
1*36
*/

class Solution {
    divisors(n) {
        let res = []
        for(let i = 1; i*i <= n; i++) {
            if (n % i === 0) {
                res.push(i)

                if (n / i != i) { // for 36, if i is 6, we should not add 6 again since the mirror is also same, 6*6
                    res.push(n / i)
                }
            }
        }

        res.sort((a, b) => a - b) // this is not needed if the divisors can be in any order

        return res
    }
}