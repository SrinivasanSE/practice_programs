// https://www.geeksforgeeks.org/maximize-elements-using-another-array/

/*

Better - Using arr

O(nlogn) & O(n)

*/

function maximizeArray(a, b) {
  let n = a.length;

  // Auxiliary array to store elements of a and b
  let merged = [...a, ...b];

  // Hash set to store n largest unique elements
  let hashSet = new Set();

  // Sorting merged array in decreasing order
  merged.sort((x, y) => y - x);

  // Finding n largest unique elements
  // and storing in hashSet
  let i = 0;
  while (hashSet.size < n) {
    // If the element is not in hashSet, insert it
    if (!hashSet.has(merged[i])) {
      hashSet.add(merged[i]);
    }

    i++;
  }

  let result = [];

  // Store elements of b in result that
  // are present in hashSet
  for (let x of b) {
    if (hashSet.has(x)) {
      result.push(x);
      hashSet.delete(x);
    }
  }

  // Store elements of a in result that
  // are present in hashSet
  for (let x of a) {
    if (hashSet.has(x)) {
      result.push(x);
      hashSet.delete(x);
    }
  }

  return result;
}

/*

Better - Heap

O(nlogn) & O(n)

*/

class Solution {
  maximizeArray(n, arr1, arr2) {
    // code here
    const heap = new MaxHeap();

    const ans = [];

    const set = new Set();

    for (let i = 0; i < n; i++) {
      // push all the elements to heap
      heap.insert(arr1[i]);
      heap.insert(arr2[i]);
    }

    while (set.size < n) {
      // add top n elements to the set, the elements will be from both arrs
      set.add(heap.extractMax());
    }

    for (let num of arr2) {
      // we give high priority to arr2, they should be first in the new array
      if (set.has(num)) {
        set.delete(num); // the res arr should contain unique elements only, so we delete from the set
        ans.push(num);
      }
    }

    if (set.size > 0) {
      for (let num of arr1) {
        if (set.has(num)) {
          set.delete(num);
          ans.push(num);
        }
      }
    }
    return ans;
  }
}
