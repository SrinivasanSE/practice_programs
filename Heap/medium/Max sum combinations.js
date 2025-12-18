// https://www.geeksforgeeks.org/k-maximum-sum-combinations-two-arrays/

// Similar to Heap/medium/others/Find K Smallest Sum Pairs.js

/*

Brute

 O(n * m + nmlog(nm)) & O(nm)

*/

class Solution {
  // Function to return k largest valid sum combinations
  maxCombinations(nums1, nums2, k) {
    // Array to store all pair sums
    let allSums = [];

    // Iterate through each element in nums1
    for (let i = 0; i < nums1.length; i++) {
      // Iterate through each element in nums2
      for (let j = 0; j < nums2.length; j++) {
        // Push the sum of the pair into allSums
        allSums.push(nums1[i] + nums2[j]);
      }
    }

    // Sort in descending order
    allSums.sort((a, b) => b - a);

    // Return first k elements
    return allSums.slice(0, k);
  }
}

/*

Efficient when K is large, but bad if K is tiny compared to N
O(NlogN) + O(KlogN) & O(N)

*/

const _maxCombinations = (N, K, A, B) => {
  A.sort((a, b) => b - a);
  B.sort((a, b) => b - a);
  const res = [];
  const heap = new MaxHeap();

  for (let i = 0; i < N; i++) {
    heap.insert({ sum: A[i] + B[0], index: 0 }); // we are keeping B constant and the first pair will be always from this pairs only since both A and B is in desc order
  }
  let curr;
  while (K > 0) {
    curr = heap.extractMax();
    res.push(curr.sum);

    if (curr.index + 1 < N) {
      heap.insert({
        sum: curr.sum - B[curr.index] + B[curr.index + 1],
        index: curr.index + 1,
      }); // we are getting the A's value by subtracting the B's value from sum
    }
    K--;
  }

  return res;
};

/*

Efficient when N is large and K is small
O(NlogN) + O(KlogK) & O(n)

*/

// Another approach using set, set is needed because of duplicates
const maxCombinations = (N, K, A, B) => {
  A.sort((a, b) => b - a);
  B.sort((a, b) => b - a);
  const res = [];
  const heap = new MaxHeap();

  heap.insert({ sum: A[0] + B[0], i: 0, j: 0 }); // insert only the first pair
  const visited = new Set();
  visited.add(`0_0`); // since we push two times, we might push same pair again, (0,1) will push (1, 1) and (1, 0) will push (1, 1) again
  while (K > 0) {
    // O(klogk) heap contains at most k elements only
    const { sum, i, j } = heap.extractMax();
    res.push(sum);

    if (i + 1 < N && !visited.has(`${i + 1}_${j}`)) {
      heap.insert({ sum: A[i + 1] + B[j], i: i + 1, j });
      visited.add(`${i + 1}_${j}`);
    }
    if (j + 1 < N && !visited.has(`${i}_${j + 1}`)) {
      heap.insert({ sum: A[i] + B[j + 1], i, j: j + 1 });
      visited.add(`${i}_${j + 1}`);
    }
    K--;
  }

  return res;
};


class Solution {
    topKSumPairs(arr1, arr2, k) {
        // code here
        let res = []
        arr1.sort((a, b) => b - a)
        arr2.sort((a, b) => b - a)
        const n = arr1.length
        const m = arr2.length
        
        if (m === 0 || n === 0 || k === 0) return res
        
        
        const heap = new MaxHeap()
        
        for (let i = 0; i < Math.min(k, n); i++) { // run till the min of (k, n) push all the elements from one array with first element from the another array
            heap.insert({i, j: 0, sum: arr1[i] + arr2[0]})
        }
        
        
        while (!heap.isEmpty() && k > 0) {
            const {i, j, sum} = heap.extractMax()
            
            res.push(sum)
            
            if (j + 1 < m) { // keep pushing the next element from the arr2
                heap.insert({i, j: j + 1, sum: arr1[i] + arr2[j + 1]})
            }
            k--
        }
        return res
    }
}


/*

Why Heap Size Is At Most K


At each iteration:

You extract one element (the current max).
You insert up to two new elements.
So, the heap size increases by at most 1 per iteration (insert 2, remove 1).



After the first extraction:

Heap size: 1 (initial)
After 1st iteration: up to 2 (insert 2, remove 1)
After 2nd iteration: up to 3 (insert 2, remove 1)
...
After K iterations: up to K (insert 2 each time, remove 1 each time)



But:

Not every insert is unique (the visited set prevents duplicates).
So, the heap size could be less than K, but never more than K.

*/