// https://leetcode.com/problems/remove-k-digits/


/*

Brute - Greedy

O(n^2) & O(n)

*/

// Wrapper function — only responsible for:
// 1. Calling the recursive logic
// 2. Removing leading zeros ONCE at the end
function removeKdigits(num, k) {
    // Compute the raw result using recursion
    const raw = solve(num, k);

    // Remove leading zeros from the final answer
    const cleaned = raw.replace(/^0+/, "");

    // If everything was removed or result is empty → return "0"
    return cleaned === "" ? "0" : cleaned;
}


// Recursive helper function that applies the greedy rule
function solve(str, k) {

    // Base Case 1: No more deletions needed → return remaining number
    if (k === 0) return str;

    // Base Case 2: If number length <= k → remove everything
    if (str.length <= k) return "";

    // ----------------------------------------------------------
    // Greedy rule:
    // Choose the smallest digit within the first (k+1) characters.
    // Why k+1?
    //   Because we are allowed to remove up to k digits BEFORE choosing
    //   the current digit. So the next digit in the result must be the
    //   smallest among str[0 ... k].
    // ----------------------------------------------------------

    let minIndex = 0;

    // Find smallest digit in first (k+1) characters
    for (let i = 1; i <= k; i++) {
        if (str[i] < str[minIndex]) {
            minIndex = i;      // update the index of smallest digit
        }
    }

    // ----------------------------------------------------------
    // We choose str[minIndex] as the next digit in our result,
    // and we eliminate all digits before it.
    //
    // The number of deletions used = minIndex
    // Remaining deletions = k - minIndex
    //
    // We now recurse on the substring AFTER minIndex
    // ----------------------------------------------------------

    const chosen = str[minIndex];
    const remaining = str.substring(minIndex + 1);

    return chosen + solve(remaining, k - minIndex);
}


/*

Optimal - Stack

O(n) & O(n)

*/


// The intuition is, we need to have smaller digits in the beginning as much as possible

var removeKdigits = function(num, k) {
    const n = num.length
    if (n === k) {
        return '0'
    }

    let stk = [], ans = ""

    for(let char of num) {
        while (k > 0 && stk.length > 0 && stk[stk.length - 1] > char) { // the stack contains a bigger digit than the curr digit, so we pop it
            stk.pop()
            k--
        }

        stk.push(char)
    }

    while (k) { // this condition will execute for case like [1,2,3,4,5,6], in this case, inside the for loop, pop will not happen, so we remove the last k digits
        stk.pop()
        k--
    }
    for(let char of stk) { // Remove leading zeros
        if (!ans && char === '0') {
            continue
        }

        ans += char
    }

    return ans === '' ? '0' : ans // return 0 if it's a empty string
};

