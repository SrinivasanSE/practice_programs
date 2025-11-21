// https://takeuforward.org/arrays/implement-lower-bound-bs-2/
// https://takeuforward.org/arrays/implement-upper-bound/


// The lower bound of a number is defined as the smallest index in the sorted array where the element is greater than or equal to the target.


function lowerBound(arr, n, x) {
    for (let i = 0; i < n; i++) {
        if (x <= arr[i]) {
            // lower bound found:
            return i;
        }
    }
    return n;
}

function lowerBound(arr, n, target) {
    let low = 0, high = n - 1;

    while (low <= high) {
        let mid = Math.floor((low + high) / 2);
        // maybe an answer
        if (target <= arr[mid]) { // 10 <= 10 or 10 <= 11, both 10 and 11 can be the ans.
            // look for smaller index on the left
            // ans = mid
            high = mid - 1;
        }
        else { // look on the right
            low = mid + 1;           // mid points to the smallest element
        }
    }
    return low;
}


// Upper bound - smallest index in the sorted array where the element is greater than the given number.


function upperBound(arr, x, n) {
    for (let i = 0; i < n; i++) {
        if (x < arr[i]) {
            // upper bound found:
            return i;
        }
    }
    return n;
}


const upperBound = (arr, target) => {
    let l = 0, r = arr.length - 1
    while (l <= r) {
        const mid = l + Math.floor((r - l)/2)
        
        if (target < arr[mid]) {
            r = mid - 1
        } else {
            l = mid + 1
        }
    }
    
    return l
}