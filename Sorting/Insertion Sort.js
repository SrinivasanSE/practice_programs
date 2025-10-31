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
            
            // Shift elements greater than key to the right
            while (j >= 0 && arr[j] > key) {
                arr[j + 1] = arr[j]
                j--
            }
            
            arr[j + 1] = key
        }
    }
}

    function insertionSortRecursive(arr,n)
    {
        // Base case
        if (n <= 1)
            return;
       
        // Sort first n-1 elements
        insertionSortRecursive( arr, n-1 );
       
        // Insert last element at its 
        // correct position in sorted array.
        let last = arr[n-1];
        let j = n-2;
       
        /* Move elements of arr[0..i-1], that are
          greater than key, to one position ahead
          of their current position */
        while (j >= 0 && arr[j] > last)
        {
            arr[j+1] = arr[j];
            j--;
        }
        arr[j+1] = last;
    }
/*

Time - Best - O(n) Worst - O(n^2)
Space - O(1)

Inplace - Yes
Stable - Yes

*/