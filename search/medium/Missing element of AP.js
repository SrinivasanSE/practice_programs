// https://www.geeksforgeeks.org/find-missing-number-arithmetic-progression/
// https://www.geeksforgeeks.org/find-repeating-element-sorted-array-size-n/


class Solution {
    findMissing(arr) {
        // code here
        const n = arr.length
        const sum = ((n + 1)/2)*(arr[0] + arr[n - 1])
        const currSum = arr.reduce((accum, curr) => curr + accum, 0)
        return sum - currSum
    }
}


_findMissing(arr, l, r, diff) {
        const mid = l + Math.floor((r - l)/2)
        if (arr[mid + 1] - arr[mid] != diff) {
            return arr[mid] + diff
        }
        
        if (mid > 0 && arr[mid] - arr[mid - 1] != diff) {
            return arr[mid - 1] + diff
        }
        
        if (arr[mid] === arr[0] + mid*diff) {
            return this._findMissing(arr, mid + 1, r, diff)
        }
        
        return this._findMissing(arr, l, mid - 1, diff)
    }
    findMissing(arr) {
        // code here
        const n = arr.length
        const diff = (arr[n - 1] - arr[0])/n
        return this._findMissing(arr, 0, n - 1, diff)
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
        const diff = (arr[n - 1] - arr[0])/n
        return this._findMissing(arr, 0, n - 1, diff)
    }
}
