// https://www.geeksforgeeks.org/merge-sort/


class Solution {
    
    merge(arr, l, m, r) {
        const n1 = m - l + 1
        const n2 = r - m
        
        const left = new Array(n1)
        const right = new Array(n2)
        
        for(let i = 0; i < n1; i++) {
            left[i] = arr[l + i]
        }
        for(let j = 0; j < n2; j++) {
            right[j] = arr[m + 1 + j]
        }
        
        let i = 0, j = 0, k = l
        
        while(i < n1 && j < n2) {
            if (left[i] <= right[j]) {
                arr[k] = left[i++]
            } else {
                arr[k] = right[j++]
            }
            k++
        }
        
        while (i < n1 ) {
            arr[k] = left[i++]
            k++
        }
        
        while (j < n2 ) {
            arr[k] = right[j++]
            k++
        }
    }

    mergeSort(arr, l, r) {
        // code here
        if (l >= r) {
            return
        }
        
        const mid = l + Math.floor((r - l)/2)
        this.mergeSort(arr, l, mid)
        this.mergeSort(arr, mid + 1, r)
        this.merge(arr, l, mid, r)
    }
}

/*

Time - O(nlogn)
Space - O(1)

Inplace - No
Stable - Yes

*/