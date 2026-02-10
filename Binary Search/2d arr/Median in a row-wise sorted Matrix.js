// https://www.geeksforgeeks.org/dsa/find-median-row-wise-sorted-matrix/

/*
Brute 
O(m*n) + O(m*nlog(m*n)) & O(1)

*/

function median(matrix, m, n) {
  const lst = [];

  // Traverse the matrix and
  // copy the elements to the list:
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      lst.push(matrix[i][j]);
    }
  }

  // Sort the list:
  lst.sort((a, b) => a - b);
  return lst[Math.floor((m * n) / 2)];
}

/*
Better - Using priority queue
O((r*c)/2)*log(n)) & O(1)
*/

class PriorityQueue {
  constructor() {
    this.heap = [];
  }
  enqueue(value, row, col) {
    this.heap.push({ value, row, col });

    // Min-heap based on value
    this.heap.sort((a, b) => a.value - b.value);
  }
  dequeue() {
    // Remove and return the smallest element
    return this.heap.shift();
  }
  isEmpty() {
    return this.heap.length === 0;
  }
}

function median(mat) {
  let r = mat.length;
  let c = mat[0].length;
  let minHeap = new PriorityQueue();
  let cnt = 0;
  let res = -1;

  // Calculate the median index
  let mid = Math.floor((r * c) / 2);

  // Push the first element of each row into the priority queue
  for (let i = 0; i < r; i++) {
    minHeap.enqueue(mat[i][0], i, 0);
  }

  // Extract the min elements from the priority queue to find the median, there will be mid count min elements
  while (cnt <= mid) {
    let { value, row, col } = minHeap.dequeue();
    res = value;
    cnt++;

    // If there are more elements in the row, push the next element
    if (col + 1 < c) {
      minHeap.enqueue(mat[row][col + 1], row, col + 1);
    }
  }

  return res;
}

/*
Optimal - Binary search
O(n*logm * log(max - min)) & O(1)
*/


// The binary search ensures you find the smallest number for which more than half the elements are ≤ that number, which is the definition of the median in a sorted array.
 // The idea is that for a number x to be median there should be exactly n * m / 2 numbers that are less than this number.
 
class Solution {
  // Function to find median of the matrix.

  median(mat) {
    // your code here
    const n = mat.length;
    const m = mat[0].length;

    const req = Math.floor((n * m) / 2);
    let low = Number.MAX_SAFE_INTEGER,
      high = Number.MIN_SAFE_INTEGER;

    for (let i = 0; i < n; i++) {
      low = Math.min(low, mat[i][0]);
      high = Math.max(high, mat[i][m - 1]);
    }
    while (low <= high) {
      // iterate through the elements from lowest element and highest element in the matrix
      const mid = low + Math.floor((high - low) / 2);
      const count = this.countSmaller(mat, n, m, mid);
      if (count <= req) {
        // if the count is low, we need to increase the number to make more numbers before the req
        low = mid + 1;
      } else {
        high = mid - 1;
      }
    }

    return low;
  }

   upperBound(arr, n, target) {
    let low = 0,
      high = n - 1;
    while (low <= high) {
      const mid = low + Math.floor((high - low) / 2);

      if (arr[mid] > target) {
        high = mid - 1;
      } else {
        low = mid + 1;
      }
    }

    return low;
  }

  countSmaller(arr, n, m, num) {
    let count = 0;
    for (let i = 0; i < n; i++) {
      count += this.upperBound(arr[i], m, num); // finds the count of elements less than num in each row
    }

    return count;
  }

}
