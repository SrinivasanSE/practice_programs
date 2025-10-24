// https://takeuforward.org/arrays/implement-lower-bound-bs-2/
// https://takeuforward.org/arrays/implement-upper-bound/


// Lower bound

/* Brute */

function lowerBound(arr, n, x) {
    for (let i = 0; i < n; i++) {
        if (arr[i] >= x) {
            // lower bound found:
            return i;
        }
    }
    return n;
}

function lowerBound(arr, n, x) {
    let low = 0, high = n - 1;

    while (low <= high) {
        let mid = Math.floor((low + high) / 2);
        // maybe an answer
        if (arr[mid] >= x) {
            // look for smaller index on the left
            high = mid - 1;
        }
        else {
            low = mid + 1; // look on the right
        }
    }
    return low;
}


// Upper bound


function upperBound(arr, x, n) {
    for (let i = 0; i < n; i++) {
        if (arr[i] > x) {
            // upper bound found:
            return i;
        }
    }
    return n;
}


function upperBound(arr, x, n) {
    let low = 0, high = n - 1;
    let ans = n;

    while (low <= high) {
        let mid = Math.floor((low + high) / 2);
        // maybe an answer
        if (arr[mid] > x) {
            ans = mid;
            //look for smaller index on the left
            high = mid - 1;
        }
        else {
            low = mid + 1; // look on the right
        }
    }
    return ans;
}


const upperBound = (arr, val) => {
    let l = 0, r = arr.length - 1
    while (l <= r) {
        const mid = l + Math.floor((r - l)/2)
        
        if (arr[mid] > val) {
            r = mid - 1
        } else {
            l = mid + 1
        }
    }
    
    return l
}