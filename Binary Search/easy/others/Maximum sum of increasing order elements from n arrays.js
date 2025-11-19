// https://www.geeksforgeeks.org/maximum-sum-increasing-order-elements-n-arrays/


/*

Better

*/

function maxSumBetter(arrays) {
    const n = arrays.length;
    const m = arrays[0].length;
    // Sort each array
    for (let i = 0; i < n; i++) arrays[i].sort((a, b) => a - b);

    let prev = Infinity;
    let sum = 0;
    for (let i = n - 1; i >= 0; i--) {
        // Find the largest number less than prev
        let found = false;
        for (let j = m - 1; j >= 0; j--) {
            if (arrays[i][j] < prev) {
                sum += arrays[i][j];
                prev = arrays[i][j];
                found = true;
                break;
            }
        }
        if (!found) return 0;
    }
    return sum;
}

/*

Optimal

 O(n m log m + n log m) & O(1)

*/


function maxSumOptimal(arrays) {
    const n = arrays.length;
    const m = arrays[0].length;
    // Sort each array
    for (let i = 0; i < n; i++) arrays[i].sort((a, b) => a - b);

    let prev = Infinity;
    let sum = 0;
    for (let i = n - 1; i >= 0; i--) {
        // Binary search to find largest < prev
        let l = 0, r = m - 1, idx = -1;
        while (l <= r) {
            let mid = Math.floor((l + r) / 2);
            if (arrays[i][mid] < prev) {
                idx = mid;
                l = mid + 1;
            } else {
                r = mid - 1;
            }
        }
        if (idx === -1) return 0;
        sum += arrays[i][idx];
        prev = arrays[i][idx];
    }
    return sum;
}

