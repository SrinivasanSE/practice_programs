// https://leetcode.com/problems/powx-n/description/

// Binary Exponentiation

/*
Iterative approach
O(logn) & O(1)

*/

var myPow = function (x, n) {
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



/*

Recursive

O(logn) & O(logn)

*/

var myPow = function (x, n) {

    const calculate = (x, n) => {
        if (x === 0) return 0
        if (n === 0) return 1

        let res = calculate(x, Math.floor(n / 2))
        res *= res

        if (n % 2 === 1) {
            return res * x // when odd, we take the extra x and mutiply with res
        }

        return res
    }

    let ans = calculate(x, Math.abs(n))

    if (n < 0) {
        return 1 / ans
    }

    return ans
};

