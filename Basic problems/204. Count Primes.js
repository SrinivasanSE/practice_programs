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


var countPrimes = function (n) {
    let count = 0
    const primes = new Array(n + 1).fill(1) // seive of Eratosthenes, fill by 1 initially
    primes[0] = 0
    primes[1] = 0

    for (let i = 2; i <= n; i++) { // fill the primes array for easy access
        if (primes[i] === 1) {
            for (let j = 2 * i; j <= n; j += i) { // make all the multiples of prime as 0
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

Optimal

 O(N log (log N)) & O(N)

*/


var countPrimes = function (n) {
    let count = 0
    const primes = new Array(n + 1).fill(1)
    primes[0] = 0
    primes[1] = 0


    for (let i = 2; i * i <= n; i++) { // can run till sqrt(n) only
        if (primes[i] === 1) {
            for (let j = i * i; j <= n; j += i) { // can start from i * i, because 3*2, 4*2, 4*3 will be already covered in the previous iterations by 2 and 3, 
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