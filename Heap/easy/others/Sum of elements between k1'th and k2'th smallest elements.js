// https://www.geeksforgeeks.org/sum-elements-k1th-k2th-smallest-elements/

// O(NLogn)

// Using Min Heap
class Solution {
  sumBetweenTwoKth(A, N, K1, K2) {
    // code here
    let sum = 0;
    const heap = new MinHeap();
    for (let num of A) {
      heap.insert(num);
    }

    for (let i = 0; i < K1; i++) {
      heap.extractMin();
    }

    for (let i = K1; i < K2 - 1; i++) {
      sum += heap.extractMin();
    }

    return sum;
  }
}

// Using Max Heap - O(NlogK2)

class Solution {
  sumBetweenTwoKth(A, N, K1, K2) {
    // code here
    const heap = new MaxHeap();

    for (let num of A) {
      heap.insert(num);
      if (heap.size() > K2) {
        heap.extractMax();
      }
    }
    // Heap will contain the elements in opposite order, K2 smallest element will be at the top
    heap.extractMax(); // K2 element is not included
    let sum = 0;
    while (heap.size() > K1) {
      // we sum the elements at the top leaving only K1 smallest elements at the end
      sum += heap.extractMax();
    }

    return sum;
  }
}
