// https://www.geeksforgeeks.org/heap-sort/


class Solution {
    
    heapify(arr, n, i) {
        let largest = i
        const left = 2*i + 1
        const right = 2*i + 2
        
        if (left < n && arr[left] > arr[largest]) {
            largest = left
        }
        
        if (right < n && arr[right] > arr[largest]) {
            largest = right
        }
        
        if (largest != i) {
            [arr[largest], arr[i]] = [arr[i], arr[largest]]
            this.heapify(arr, n, largest)
        }
    }
    heapSort(arr) {
        // code here
        const n = arr.length
        
        for(let i = Math.floor(n/2) - 1; i >= 0; i--) {
            this.heapify(arr, n, i)
        }
        
        for(let i = n - 1; i >= 0; i--) {
            [arr[i], arr[0]] = [arr[0], arr[i]] // swap the first element which is the largest with the last element, so the max element is now at the end
            this.heapify(arr, i, 0) // i is the size of the tree now, we have ignored the last element since it's already sorted,
            //  0 should be constant since we have swapped the root, so from the root, we need to heapify
        }
    }
}


/*
Time - O(nlogn)
Space - O(logn)

Stable - No ( Not by default, but can be made stable)
Inplace - Yes

*/