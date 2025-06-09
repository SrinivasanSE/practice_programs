// https://www.geeksforgeeks.org/quick-sort-algorithm/
// https://www.geeksforgeeks.org/quicksort-tail-call-optimization-reducing-worst-case-space-log-n/


class Solution {
    partition(arr, low, high) {
        // Your code here
        const pivot = arr[high]
        
        let i = low
        
        for(let j = low; j < high; j++ ) {
            if (arr[j] < pivot) {
                [arr[j], arr[i]] = [arr[i], arr[j]]
                i++
            }
        }
        
        [arr[high], arr[i]] = [arr[i], arr[high]]
        return i
        
    }

    quickSort(arr, low, high) {
        
        // code here
        if (low < high) {
            const pi = this.partition(arr, low, high)
            this.quickSort(arr, low, pi - 1)
            this.quickSort(arr, pi + 1, high)
        }
    }
}

/*

Time - Best - O(nlogn), Worst - O(n^2) (if pivot is chosen as smallest or largest element)
Space - O(1)

Inplace - No
Stable - Yes

*/