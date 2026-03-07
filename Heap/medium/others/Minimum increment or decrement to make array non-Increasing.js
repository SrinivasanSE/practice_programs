// https://www.geeksforgeeks.org/minimum-incrementdecrement-to-make-array-non-increasing/

function helper(arr, idx, prev) {
// If idx is at the end of the array, return 0 (no more elements to process).
  if (idx === arr.length) return 0;

  let best = Infinity;

  // Enumerate all possible values for arr[idx] in range [0..prev]
  for (let val = 0; val <= prev; val++) {
    let cost = Math.abs(arr[idx] - val) + helper(arr, idx + 1, val);
    best = Math.min(best, cost);
  }
  return best;
}

function decreasingArray(arr) {
  let maxVal = Math.max(...arr);

  // Start with the maximum element
  return helper(arr, 0, maxVal);
}

/*

The heap ensures we always adjust the smallest element first.If we increase a bigger element first, the cost becomes larger later. So fixing the smallest first is optimal.
*/

class Solution {
  // Function to find minimum number of operations to make all elements equal.
  minOperations(arr, n) {
    // your code here
    const heap = new MinHeap();
    let ans = 0;
    for (let i = 0; i < n; i++) {
      if (!heap.isEmpty() && heap.getMin() < arr[i]) {
        ans += arr[i] - heap.getMin(); // This conceptually means we are paying the cost to "raise" the level of the smallest element (heap.getMin()) to match the current element (arr[i]).
        heap.extractMin();
        heap.insert(arr[i]);
      }
      heap.insert(arr[i]); 
      /*
      Why do we insert again here?

      we are keeping the current element as another pending value.

      Think of it like this:

      Each element in the heap represents a number that must eventually match the final value.

      When we processed 3, we:

      Converted 1 → 3

      But 3 itself must also participate in future comparisons

      So we insert it again.

      */
    }
    return ans;
  }
}



/*

Recursion exp

How the Recursion Works
Key Idea
At each position in the array, you can choose any value for that position, as long as it does not increase compared to the previous value (to maintain non-increasing order). For every possible value, you:

Compute the cost to change the current element to that value.
Recursively solve the rest of the array, updating the constraint for the next element.

Step-by-Step Logic


Start with the largest possible value
The first call allows the first element to be any value up to the maximum in the original array, since you can only decrease or keep the same for the next elements.


At each index
For arr[idx], you try all values from 0 to prev (the value chosen for the previous element). This ensures the non-increasing property.


Calculate cost
For each possible value, you:

Calculate the cost to change the current element.
Recursively find the minimum cost for the rest of the array, using the chosen value as the new upper bound.



Base case
When you reach the end of the array (idx === arr.length), return 0 (no further cost).


Choose the minimum
You keep track of the minimum cost across all possible choices for the current index.

*/