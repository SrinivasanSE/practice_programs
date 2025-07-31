// https://leetcode.com/problems/sort-characters-by-frequency/description/

/*
Brute
O(nlogn) & O(n)
*/

var frequencySort = function(s) {
    const hashmap = {}

    const n = s.length

    for(let i = 0; i < n; i++) {
        hashmap[s[i]] = (hashmap[s[i]] || 0) + 1
    }

    const sortable = []

    for(let key in hashmap) {
        sortable.push([key, hashmap[key]])
    }

    sortable.sort((a, b) => b[1] - a[1])
    let str = ""
    for (let [char, val] of sortable) {
        for(let i = 0; i < val; i++) {
            str += char
        }
    }

    return str
};

/*
Better
O(nlogk) & O(n)
*/

var frequencySort = function(s) {
    const hashmap = {}

    const n = s.length

    for(let i = 0; i < n; i++) {
        hashmap[s[i]] = (hashmap[s[i]] || 0) + 1
    }
    const heap = new MaxHeap()
    for(let key in hashmap) {
        heap.enqueue({char: key, freq: hashmap[key]})
    }

    let res = ""

    while (heap.size() > 0) {
        const top = heap.dequeue()
        res += top.char.repeat(top.freq)
    }
    return res
};

/*
Optimal
O(n) & O(n)

*/

var frequencySort = function(s) {
    const hashmap = {}

    const n = s.length

    for(let i = 0; i < n; i++) {
        hashmap[s[i]] = (hashmap[s[i]] || 0) + 1
    }

    const buckets = new Array(n + 1).fill().map(() => [])

    for(let key in hashmap) {
        buckets[hashmap[key]].push(key)
    }
    let res = ""
    console.log(buckets)
    for(let i = buckets.length - 1; i > 0; i--) {
        for(let char of buckets[i]) {
            res += char.repeat(i)
        }
    }

    return res
};