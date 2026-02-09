// https://leetcode.com/problems/count-primes/description/

// Check counting primes in a range also

/*

Brute

O(N * √N) & O(1)

*/



const isPrime = (num) => {
    if (num <= 1) return false
    if (num === 2) return true
    if (num % 2 === 0) return false

    for (let i = 3; i * i <= num; i++) {
        if (num % i === 0) return false
    }

    return true
}
var countPrimes = function (n) {
    let count = 0

    for (let i = 2; i < n; i++) {
        if (isPrime(i)) count++
    }

    return count
};


/*

Better - seive of Eratosthenes

 O(N log (log N)) & O(N)

*/

// The sieve works because it systematically eliminates all composites by marking multiples of each prime.


var countPrimes = function (n) {
    let count = 0
    const primes = new Array(n).fill(1) // seive of Eratosthenes, fill by 1 initially
    primes[0] = 0
    primes[1] = 0

    for (let i = 2; i < n; i++) { // fill the primes array for easy access
        if (primes[i] === 1) {
            for (let j = 2 * i; j < n; j += i) { // make all the multiples of prime as 0, notice j should be incremented by i
                primes[j] = 0
            }
        }
    }

    for (let i = 2; i < n; i++) {
        if (primes[i]) count++
    }

    return count
};


/*

Optimal - Same above code with condition change

 O(N log (log N)) & O(N)

*/


var countPrimes = function (n) {
    let count = 0
    const primes = new Array(n).fill(1)
    primes[0] = 0
    primes[1] = 0


    for (let i = 2; i * i < n; i++) { // can run till sqrt(n) only
        if (primes[i] === 1) {
            for (let j = i * i; j < n; j += i) { // can start from i * i, because 3*2, 4*2, 4*3 will be already covered in the previous iterations by 2 and 3, 
            // so can directly start from 3*3, 4*4, 5*5 ...
                primes[j] = 0
            }
        }
    }

    for (let i = 2; i < n; i++) {
        if (primes[i]) count++
    }

    return count
};

/*

TC explained

For each prime i, the inner loop marks numbers like i*i, i*i+i, i*i+2i, ... up to n.
The total number of steps for all i is:

For i = 2: marks n/2 numbers
For i = 3: marks n/3 numbers
For i = 5: marks n/5 numbers
... and so on for each prime i ≤ sqrt(n)


So, the total work done is:
n/2 + n/3 + n/5 + n/7 + ... ≈ n * (1/2 + 1/3 + 1/5 + 1/7 + ...)
The sum (1/2 + 1/3 + 1/5 + ...) over all primes up to n is known to be about log(log n).

*/