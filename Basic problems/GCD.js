

/*

Brute

O(min(n1, n2)) & O(1)

*/


function findGcd(n1, n2) {
    for (let i = Math.min(n1, n2); i > 0; i--) {
        // Check if i is a common
        // factor of both n1 and n2
        if (n1 % i === 0 && n2 % i === 0) {
            // If i is a common factor,
            // return it as the GCD
            return i;
        }
    }
    return 1;
}


// The Euclidean Algorithm

// Subtraction method, not that efficient compared to modulo

function gcd(a, b) {
    // Everything divides 0
    if (a === 0)
        return b;
    if (b === 0)
        return a;

    // Base case
    if (a === b)
        return a;

    // a is greater
    if (a > b)
        return gcd(a - b, b);
    return gcd(a, b - a);
}

/*

Iterative

O(log(min(n1, n2))) & O(1)

*/

class Solution {
    GCD(n1, n2) {
        while (n1 > 0 && n2 > 0) {
            if (n1 > n2) {
                n1 = n1 % n2
            } else {
                n2 = n2 % n1
            }
        }

        if (n1 === 0) return n2
        return n1
    }
}


/*

Recursion

O(log(min(n1, n2))) & O(log(min(n1, n2)))

*/


function gcd(a, b) {
    return b === 0 ? a : gcd(b, a % b);
}

