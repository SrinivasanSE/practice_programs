// https://leetcode.com/problems/count-good-numbers/description/

const mod = 1_000_000_007n; // Directly as BigInt

function countGoodNumbers(n) {
    let evenCount = BigInt(Math.ceil(n / 2));
    let oddCount = BigInt(Math.floor(n / 2));

    let result = (pow(5n, evenCount) * pow(4n, oddCount)) % mod; // there will be 5 options for choosing a even number and 4 options for choosing a prime number
    return Number(result); 
}

function pow(x, exp) {
    let res = 1n;
    while (exp > 0n) {
        if (exp % 2n === 1n) {
            res = (res * x) % mod;
        }
        x = (x * x) % mod;
        exp = exp / 2n; // No need for Math.floor because bigint division always give integer num, 7/2 = 3
    }
    return res;
}