function factorial(X) {
    let ans = 1;

    // Loop from 1 to X to compute factorial
    for (let i = 1; i <= X; i++) {
        ans *= i;
    }

    // Return the final result
    return ans;
}


function factorial(n) {
    // Base case: factorial of 0 is 1
    if (n === 0) {
        return 1;
    }

    // Recursive case: n * factorial of (n-1)
    return n * factorial(n - 1);
}