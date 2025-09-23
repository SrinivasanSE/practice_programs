// https://leetcode.com/problems/sum-of-subarray-minimums/description/

/*

O(n) & O(n)

*/

const MOD = 10**9 + 7

const findNSE = (arr, n) => {
    const res = [], stk = []

    for(let i = n - 1; i >= 0; i--) {
        while (stk.length > 0 && arr[stk[stk.length - 1]] >= arr[i]) {
            stk.pop()
        }

        res[i] = stk.length === 0 ? n : stk[stk.length - 1]
        stk.push(i)
    }

    return res
}

const findPSE = (arr, n) => {
    const res = [], stk = []

    for(let i = 0; i < n; i++) {
        while (stk.length > 0 && arr[stk[stk.length - 1]] > arr[i]) { // notice the condition here, it's > and not >=
            stk.pop()
        }

        res[i] = stk.length === 0 ? -1 : stk[stk.length - 1]
        stk.push(i)
    }

    return res
}

var sumSubarrayMins = function(arr) {
    const n = arr.length
    let nse = findNSE(arr, n), right
    let pse = findPSE(arr, n), left
    let total = 0

    for (let i = 0; i < n; i++) {
        left = i - pse[i] // we find how many elements are in the left side which has the current index as min
        right = nse[i] - i // we find how many elements are in the right side which has the current index as min

        total = (total + (right*left*arr[i]) % MOD) % MOD // right*left will give total subarrays and multiplying that with arr[i] will give the contribution

    }

    return total

};