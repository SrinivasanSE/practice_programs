// https://leetcode.com/problems/kth-missing-positive-number/description/

// understand the code


var findKthPositive = function(arr, k) {
    const n = arr.length
    for(let i = 0; i < n; i++) {
        if (arr[i] <= k) {
            k++
        } else {
            break
        }
    }

    return k
};

var findKthPositive = function(arr, k) {
    const n = arr.length
    let l = 0, r = n - 1
    while (l <= r) {
        const mid = l + Math.floor((r - l)/2)
        const missing = arr[mid] - (mid + 1)
        if (missing < k) {
            l = mid + 1
        } else {
            r = mid - 1
        }
    }
    
    return l + k
};


/*
at the end, high will point to the closest number whether the missing numbers are <=k, 
to find the ans, we need to do arr[high] + more(how many more numbers are needed)
more = k - missing numbers
missing numbers = arr[high] - (high + 1)
arr[high] + k - (arr[high] - high - 1)
arr[high] + k - arr[high] + high + 1
high + 1 + k = low + k

*/