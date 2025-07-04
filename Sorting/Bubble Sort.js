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


  function bubbleSort(arr, n)
{

    // Base case
    if (n == 1)
        return;

    var count = 0;
    // One pass of bubble
    // sort. After this pass,
    // the largest element
    // is moved (or bubbled)
    // to end.
    
    for (var i = 0; i < n - 1; i++)
        if (arr[i] > arr[i + 1])
        {
        
            // swap arr[i], arr[i+1]
            var temp = arr[i];
            arr[i] = arr[i + 1];
            arr[i + 1] = temp;
            count++;
        }

    // Check if any recursion happens or not
      // If any recursion is not happen then return
    if (count == 0)
        return;

    // Largest element is fixed,
    // recur for remaining array
    bubbleSort(arr, n - 1);
}
 


/*
Time - Best - O(n) if it's already in correct order
       Worst - O(n^2)
Space - O(1)

Inplace - Yes
Stable - Yes

*/