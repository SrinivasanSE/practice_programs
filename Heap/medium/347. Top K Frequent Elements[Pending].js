// https://leetcode.com/problems/top-k-frequent-elements/description/

// check other approaches


/*
Better - Max Heap
O(N + UlogU + klogU) & O(U + k)

*/

var topKFrequent = function(nums, k) {
    const hashmap = new Map()

    for (let num of nums) { // O(N)
        hashmap.set(num, (hashmap.get(num) || 0) + 1)
    }

    const heap = new MaxHeapC()

    for (let key of hashmap.keys()) { // O(UlogU)
        heap.insert({freq: hashmap.get(key), num: key}) // push freq of all elements
    }

    let res = [], curr

    while (k > 0) { // O(klogU)
        curr = heap.extractMax()
        res.push(curr.num)
        k--
    }

    return res
};




/*
When k is smaller than U, it's much better, Ulogk gives very less value than UlogN
Optimal - Min Heap
O(N + Ulogk + klogk) & O(U + k)

*/


var topKFrequent = function(nums, k) {
    const hashmap = new Map()

    for (let num of nums) {
        hashmap.set(num, (hashmap.get(num) || 0) + 1)
    }

    const heap = new MinHeapC()

    for (let key of hashmap.keys()) {
         heap.insert({freq: hashmap.get(key), num: key}) // push freq of only k elements
        if (heap.size() > k) {
            heap.extractMin()
        }
      
    }

    let res = [], curr

    while (heap.size() > 0) {
        curr = heap.extractMin()
        res.push(curr.num)
    }

    return res
};