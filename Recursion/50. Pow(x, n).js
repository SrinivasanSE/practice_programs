// https://leetcode.com/problems/powx-n/description/

// Binary Exponentiation

/*
Iterative approach
O(logn) & O(1)

*/

var myPow = function(x, n) {
    let exp = Math.abs(n);
    let base = x;
    let res = 1;
    while (exp > 0) {
        if (exp % 2 === 1) {
            res *= base;
        }
        base *= base;
        exp = Math.floor(exp / 2);
    }
    return n < 0 ? 1 / res : res;
};


var myPow = function(x, n) {
    
    let ans = 1.0
    let power = n
    power = power < 0 ? power*-1 : power

    while (power > 0) {
        if (power % 2 === 0) {
            x = x*x
            power = power/2
        } else {
            ans = ans * x
            power-=1
        }
    }

    if (n < 0) return 1 / ans
    return ans

};


/*

Recursive

O(logn) & O(logn)

*/

var myPow = function(x, n) {
    
    const calculate = (x, n) => {
        if (x === 0) return 0
        if (n === 0) return 1

        let res = calculate(x, Math.floor(n/2))
        res*=res

        if (n % 2 === 1) {
            return res*x
        }

        return res
    }

    let ans = calculate(x, Math.abs(n))

    if (n < 0) {
        return 1/ans
    }

    return ans
};


function myPow(x, n) {
    if (x === 0) return 0;
    if (n === 0) return 1;
    // Handle negative exponents
    if (n < 0) {
        x = 1 / x;
        n = -n;
    }
    if (n % 2 === 0) {
        let half = myPow(x, n / 2);
        return half * half;
    } else {
        let half = myPow(x, Math.floor(n / 2));
        return half * half * x;
    }
}