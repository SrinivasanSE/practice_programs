// https://www.geeksforgeeks.org/dsa/check-for-majority-element-in-a-sorted-array/

function lowerBound(arr, n, x) {
    let low = 0, high = n - 1;
    while (low <= high) {
        let mid = Math.floor((low + high) / 2);
        if (arr[mid] >= x) high = mid - 1;
        else low = mid + 1;
    }
    return low;
}

function isMajorityElement(arr, x) {
    const n = arr.length;
    const firstIndex = lowerBound(arr, n, x); // find the first occurence of the target

    // check the element at firstIndex + n/2
    const checkIndex = firstIndex + Math.floor(n / 2); // if it is majority element, it should be present at i + n/2 index as well
    return checkIndex < n && arr[checkIndex] === x;
}
