// https://leetcode.com/problems/fibonacci-number
// https://www.geeksforgeeks.org/dsa/program-for-nth-fibonacci-number/


/*

Brute - Recursion

O(2^n) & O(n)


*/

var fib = (n) => {
    if (n <= 1) {
        return n
    }

    return fib(n - 1) + fib(n - 2)
}

/*

Better - Memoization

O(n) & O(n)

*/


const fib = (n) => { // You start at the top (the original problem) and break it down recursively.
    const dp = new Array(n + 1).fill(-1)

    const f = (n) => {
        if (n <= 1) return n

        if (dp[n] != -1) return dp[n]

        dp[n] = f(n - 1) + f(n - 2)
        return dp[n]
    }

    return f(n)
}

/*

Better - Tabulation

O(n) & O(1)

*/

const fib = (n) => { // You start at the bottom (base cases) and build up solutions step by step.
    const dp = new Array(n + 1).fill(-1)

    dp[0] = 0, dp[1] = 1

    for (let i = 2; i <= n; i++) {
        dp[i] = dp[i - 1] + dp[i - 2]
    }

    return dp[n]
}

/*

Optimised

O(n) & O(1)

*/

var fib = (n) => {
    if (n <= 1) {
        return n
    }

    let prev1 = 1, prev2 = 0, curr

    for (let i = 2; i <= n; i++) {
        curr = prev1 + prev2

        prev2 = prev1

        prev1 = curr
    }

    return prev1
}