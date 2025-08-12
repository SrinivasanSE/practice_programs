// https://leetcode.com/problems/fibonacci-number

const fib = (n) => {
    if (n <= 1) {
        return n
    }

    return fib(n - 1) + fib(n - 2)
}

const fibo = (n) => {
    if (n <= 1) {
        return n
    }

    let n1 = 0, n2 = 1, curr

    for(let i = 2; i <= n; i++) {
        curr = n1 + n2
        n1 = n2
        n2 = curr
    }

    return n2
}