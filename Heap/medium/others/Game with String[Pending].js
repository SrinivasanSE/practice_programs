// https://www.geeksforgeeks.org/minimum-sum-squares-characters-counts-given-string-removing-k-characters/

// O(n) efficient sol is there

class Solution {
  minValue(s, k) {
    // code here
    const freq = {}; // can use array with 26 space

    for (let char of s) {
      freq[char] = (freq[char] || 0) + 1;
    }
    const heap = new MaxHeap();
    for (let key of Object.keys(freq)) {
      heap.insert(freq[key]); // store the freq in the heap
    }

    while (k > 0) {
      let val = heap.extractMax();

      if (val > 0) { // keep reducing the freq of the max freq
        val -= 1;
        heap.insert(val);
      }
      k -= 1;
    }
    let ans = 0;
    while (!heap.isEmpty()) {
      const val = heap.extractMax();
      //console.log(char, val)
      ans += val * val;
    }

    return ans;
  }
}
