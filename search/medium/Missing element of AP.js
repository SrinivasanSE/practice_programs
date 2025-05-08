// https://www.geeksforgeeks.org/find-missing-number-arithmetic-progression/
// https://www.geeksforgeeks.org/find-repeating-element-sorted-array-size-n/


class Solution {
    findMissing(arr) {
        // code here
        // const sum = ((n + 1)/2)*(arr[0] + arr[n - 1]) // it will fail if the last element is missing
        const diff = getCommonDifference(arr)
        if (diff === 0) return arr[0];
        const totalSum = ((n + 1)/ 2)*(2 * arr[0] + n * diff);  // Sum = n/2 * (2a + (n - 1)d) we use n + 1 because one element is missing
        const currSum = arr.reduce((accum, curr) => curr + accum, 0)
        return totalSum - currSum
    }
}


class Solution {
    
    _findMissing(arr, l, r, diff) {
        while (l <= r) {        
        const mid = l + Math.floor((r - l)/2)
        
        if (arr[mid] === arr[0] + mid*diff) {
            l = mid + 1
        } else {
            r = mid - 1
        }
        
        }
        return arr[r] + diff
    }
    findMissing(arr) {
        // code here
        const n = arr.length
        const diff = (arr[n - 1] - arr[0])/n // this diff will be wrong if the last element is missing, use the commonDiff function to find the diff
        return this._findMissing(arr, 0, n - 1, diff)
    }
}


function getCommonDifference(arr) {
    const n = arr.length;

    if (n < 3) {
        return arr[1] - arr[0]; // trivial case
    }

    const d1 = arr[1] - arr[0];
    const dLast = arr[n - 1] - arr[n - 2];
    const dTotal = (arr[n - 1] - arr[0]) / n;

    // Case 1: Most consistent start and end difference
    if (d1 === dLast) {
        return d1;
    }

    // Case 2: d1 matches average difference over the span
    if (d1 === dTotal) {
        return d1;
    }

    // Case 3: Fall back to last observed difference
    return dLast;
}
