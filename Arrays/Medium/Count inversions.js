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
    let left = low
    let right = mid + 1
    const temp = new Array(high - low)
    let k = 0, count = 0
    while (left <= mid && right <= high) {
        if (arr[left] <= arr[right]) {
            temp[k] = arr[left]
            left++
        } else {
            count += (mid - left) + 1
            temp[k] = arr[right]
            right++
        }
        k++
    }
    
    while (left <= mid) {
        temp[k++] = arr[left]
        left++
    }
    
    while (right <= high) {
        temp[k++] = arr[right]
        right++
    }
    
    for(let i = low; i <= high; i++) {
        arr[i] = temp[i - low]
    }
    return count
    
}

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