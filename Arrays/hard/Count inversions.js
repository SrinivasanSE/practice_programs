// https://www.geeksforgeeks.org/inversion-count-in-array-using-merge-sort/


/*
    Brute Force
    O(n^2) & O(1)
*/

function inversionCount(arr) {

    let n = arr.length; 
    let invCount = 0;  
    
    // Loop through the array
    for (let i = 0; i < n - 1; i++) {
        for (let j = i + 1; j < n; j++) {
        
            // If the current element is greater than the next,
            // increment the count
            if (arr[i] > arr[j]) {
                invCount++;
            }
        }
    }
    return invCount;
}

/*
Optimal - Using merge sort
O(nlogn) *& O(n)
*/

const merge = (arr, low, mid, high) => {
    let left = low;        // Pointer for the left subarray (low → mid)
    let right = mid + 1;   // Pointer for the right subarray (mid+1 → high)
    const temp = new Array(high - low); // Temporary array for merging
    let k = 0;             // Index for temp array
    let count = 0;         // Count of inversions

    // -------------------------------------------------------------
    // Merge both halves while counting inversions
    // -------------------------------------------------------------
    while (left <= mid && right <= high) {
        if (arr[left] <= arr[right]) {
            // If current element in left half is smaller,
            // it does NOT contribute to inversions
            temp[k] = arr[left];
            left++;
        } else {
            // If current element in right half is smaller,
            // then all remaining elements in left half
            // (from arr[left] to arr[mid]) are greater than arr[right].
            // Each of them forms an inversion.
            count += (mid - left) + 1;
            temp[k] = arr[right];
            right++;
        }
        k++;
    }

    // -------------------------------------------------------------
    // Copy any remaining elements from the left subarray
    // -------------------------------------------------------------
    while (left <= mid) {
        temp[k++] = arr[left];
        left++;
    }

    // -------------------------------------------------------------
    // Copy any remaining elements from the right subarray
    // -------------------------------------------------------------
    while (right <= high) {
        temp[k++] = arr[right];
        right++;
    }

    // -------------------------------------------------------------
    // Copy the merged, sorted subarray back into the original array
    // -------------------------------------------------------------
    for (let i = low; i <= high; i++) {
        arr[i] = temp[i - low];
    }

    // Return the number of inversions found in this merge step
    return count;
};


const mergeSort = (arr, low, high) => {
    let cnt = 0
    if (low >= high) return cnt
    const mid = low + Math.floor((high - low)/2)
    cnt += mergeSort(arr, low, mid)
    cnt += mergeSort(arr, mid + 1, high)
    cnt += merge(arr, low, mid, high)
    return cnt
    
}
class Solution {
    inversionCount(arr) {
        // code here
        return mergeSort(arr, 0, arr.length - 1)
    }
}