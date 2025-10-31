// https://www.geeksforgeeks.org/selection-sort-algorithm-2/
// https://www.geeksforgeeks.org/stable-selection-sort/

/*

Selection Sort is a comparison-based sorting algorithm. 
It sorts an array by repeatedly selecting the smallest (or largest) element from the unsorted portion and swapping it with the first unsorted element. 
This process continues until the entire array is sorted.

Time - O(n^2)
Space - O(1)

Stable - Yes ( Not by default, but can be made stable)
Inplace - Yes

*/

class Solution {

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

// Stable sort

class Solution {
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
            
            let key = arr[minIdx]  // arr = [4,2,5,1], minIdx = 3 
            // arr[3] = arr[2] (5) → [4, 2, 5, 5] arr[2] = arr[1] (2) → [4, 2, 2, 5] arr[1] = arr[0] (4) → [4, 4, 2, 5]
            while (minIdx > i) {
                arr[minIdx] = arr[--minIdx] // we just move elements forward by 1
            }
            arr[i] = key
        }
    }
}

