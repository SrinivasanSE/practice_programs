// https://www.geeksforgeeks.org/bubble-sort-algorithm/

class Solution {
    // Function to sort the array using bubble sort algorithm.
    bubbleSort(arr) {
        // code here
        const n = arr.length
        let isSwapped
        for(let i = 0; i < n - 1; i++) {
            isSwapped = false
            for(let j = 0; j < n - i - 1; j++) {
                if (arr[j] > arr[j + 1]) {
                    [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]
                    isSwapped = true
                }
            }
            
            if(!isSwapped) {
                return
            }
        }
    }
}


/*
Time - Best - O(n) if it's already in correct order
       Worst - O(n^2)
Space - O(1)

Inplace - Yes
Stable - Yes

*/