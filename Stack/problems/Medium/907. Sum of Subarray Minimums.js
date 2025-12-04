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
        stk.push(i) // we push the index
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
        stk.push(i) // we push the index
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


// Optimised version

/*

Instead of calc for the curr index, we calculate for the popped index, when we pop the index, that means the curr element is the next smallest element for the popped index
The stack is monotonically increasing stack, the previous smallest element for the popped index is the current stack's top.

Stack(it contains index, but let's assume these are values) = [1, 2, 4], curr element = 3.

4 > 3, so for 4, the nse is 3 and pse is 2


*/


var sumSubarrayMins = function (arr) {
    let sum = 0
    const n = arr.length

    // Variables:
    // left  = how many subarrays extend to the LEFT where arr[curr] is minimum
    // right = how many subarrays extend to the RIGHT where arr[curr] is minimum
    // stk   = monotonic INCREASING stack storing indices
    // pse   = Previous Smaller Element index
    // nse   = Next Smaller Element index
    // curr  = index popped from stack (the one we are calculating contribution for)
    let left, right, stk = [], pse, nse, curr

    for (let i = 0; i <= n; i++) {

        // We loop one extra time (i == n) to flush the stack - some elements will remain in the stack at the end, for these elements, 
        // there are no next smallest element, if nse was there, these elements would have been popped, so for all them nse will be considered as n
        // Pop while:
        //   - we reached the end, OR
        //   - the current value arr[i] is smaller than the value at stack top.
        // This means we've found the "next smaller element" for stackTop.
        while (stk.length > 0 && (i === n || arr[i] < arr[stk[stk.length - 1]])) {

            // curr = index whose contribution we are calculating
            curr = stk.pop()

            // nse = Next Smaller Element index
            //      For popped "curr", the next smaller is "i"
            nse = i

            // pse = Previous Smaller Element index
            //      Left boundary: previous smaller is new stack top (if exists)
            //      If no previous smaller → use -1
            pse = stk.length === 0 ? -1 : stk[stk.length - 1]

            // Number of subarrays to the left where arr[curr] remains minimum
            left = curr - pse

            // Number of subarrays to the right where arr[curr] remains minimum
            right = nse - curr

            // Contribution formula:
            // arr[curr] is the minimum of `left * right` different subarrays.
            // Add its contribution into sum.
            sum = (sum + (arr[curr] * left * right) % MOD) % MOD
        }

        // Push current index into stack
        // Stack stores indices in increasing order of arr[]
        stk.push(i)
    }

    return sum
};
