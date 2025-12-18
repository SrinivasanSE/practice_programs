// https://www.geeksforgeeks.org/k-th-largest-sum-contiguous-subarray/

/*

Brute - Sorting

O(n^2logn) & O(n^2)

*/

function kthLargest(arr, k) {
  let n = arr.length;

  // to store all subarray sums
  let sums = [];

  // Generate all subarrays
  for (let i = 0; i < n; i++) {
    let sum = 0;
    for (let j = i; j < n; j++) {
      sum += arr[j];
      sums.push(sum);
    }
  }

  // Sort in decreasing order
  sums.sort((a, b) => b - a);

  // return the Kth largest sum
  return sums[k - 1];
}

/*

Better - Prefix sum

O(n^2logk) & O(n)

*/

class Solution {
  // Function to find the kth largest element in the given array.
  kthLargest(arr, k) {
    const heap = new MinHeap();

    const n = arr.length;

    if (n === 1) {
      return arr[0];
    }
    const ps = new Array(n + 1).fill(0);
    ps[1] = arr[0];
    for (let i = 2; i <= n; i++) {
      // should run upto n
      // should go till n
      ps[i] = ps[i - 1] + arr[i - 1];
    }
    let currSum;
    for (let i = 0; i < n; i++) {
      for (let j = i; j < n; j++) {
        currSum = ps[j + 1] - ps[i];
        if (heap.size() === k) {
          if (heap.getMin() < currSum) {
            heap.extractMin();
            heap.insert(currSum);
          }
        } else {
          heap.insert(currSum);
        }
      }
    }
    //console.log(heap.heap)
    return heap.extractMin();
  }
}

/*

Optimal

O(n^2logk) & O(1)

*/

class Solution {
  // Function to find the kth largest element in the given array.
  kthLargest(arr, k) {
    const heap = new MinHeap();

    const n = arr.length;

    if (n === 1) {
      return arr[0];
    }
    let currSum = 0;
    for (let i = 0; i < n; i++) {
      currSum = 0;
      for (let j = i; j < n; j++) {
        currSum += arr[j];
        if (heap.size() === k) {
          if (heap.getMin() < currSum) {
            heap.extractMin();
            heap.insert(currSum);
          }
        } else {
          heap.insert(currSum);
        }
      }
    }
    //console.log(heap.heap)
    return heap.extractMin();
  }
}
