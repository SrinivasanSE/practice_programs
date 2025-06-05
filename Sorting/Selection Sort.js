// https://www.geeksforgeeks.org/selection-sort-algorithm-2/
// https://www.geeksforgeeks.org/stable-selection-sort/

class Solution {
    /**
     * @param {number[]} arr
     * @returns {number[]}
     */

    // Function to implement selection sort
    selectionSort(arr) {
        // your code here
        const n = arr.length
        for(let i = 0; i < n; i++ ) {
            let minIdx = i
            for(let j = i + 1; j < n; j++) {
                if (arr[j] < arr[minIdx]) {
                    minIdx = j
                }
            }
            
            [arr[minIdx], arr[i]] = [arr[i], arr[minIdx]]
        }
    }
}


class Solution {
    /**
     * @param {number[]} arr
     * @returns {number[]}
     */

    // Function to implement selection sort
    selectionSort(arr) {
        // your code here
        const n = arr.length
        for(let i = 0; i < n; i++ ) {
            let minIdx = i
            for(let j = i + 1; j < n; j++) {
                if (arr[j] < arr[minIdx]) {
                    minIdx = j
                }
            }
            
            let key = arr[minIdx]
            while (minIdx > i) {
                arr[minIdx] = arr[--minIdx]
            }
            arr[i] = key
        }
    }
}


/*
Time - O(n^2)
Space - O(1)

Stable - Yes ( Not by default, but can be made stable)
Inplace - Yes

*/