// https://www.geeksforgeeks.org/insertion-sort-algorithm/

class Solution {

    // Please change the array in-place
    insertionSort(arr) {
        // code here
        const n = arr.length
        let j, key
        
        for(let i = 1; i < n; i++) {
            j = i - 1
            key = arr[i]
            
            while (j >= 0 && arr[j] > key) {
                arr[j + 1] = arr[j]
                j--
            }
            
            arr[j + 1] = key
        }
    }
}

/*

Time - Best - O(n) Worst - O(n^2)
Space - O(1)

Inplace - Yes
Stable - Yes

*/