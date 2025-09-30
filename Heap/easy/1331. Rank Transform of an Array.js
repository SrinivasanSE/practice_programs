// https://leetcode.com/problems/rank-transform-of-an-array/description/


/*

Better
O(NLogN) & O(N)
*/


var arrayRankTransform = function(arr) {
    const n = arr.length
    const temp =  [...arr].sort((a, b) => a - b)

    const map = new Map()
    let rank = 1

    for (let i = 0; i < n; i++) {
        if (!map.has(temp[i])) {
            map.set(temp[i], rank++)
        }
    }

    for (let i = 0; i < n; i++) {
        arr[i] = map.get(arr[i])
    }

    return arr
    
};


/*

Optimal - Map is not used
O(NLogN) & O(N)

*/


var arrayRankTransform = function (arr) {
    const n = arr.length
    if (n === 0) return []
    const temp = arr.map((val, i) => [val, i]).sort((a, b) => a[0] - b[0])

    let rank = 1, prev = temp[0][0]
    for (let i = 0; i < n; i++) {
        if (prev < temp[i][0]) { // if prev is lesser than the new element, we need to increase the rank, this condition will not execute if the elements are same
            rank++
        }
        arr[temp[i][1]] = rank // original index is used to place the rank
        prev = temp[i][0]
    }

    return arr

};


// Using heap - O(NLogN) & O(N)


function arrayRankTransform(arr) {
    // Step 1: Insert all unique elements into the heap
    const heap = new MinHeap(); // Assume MinHeap is implemented elsewhere
    const unique = new Set(arr);
    for (let num of unique) {
        heap.insert(num);
    }

    // Step 2: Pop elements from the heap and assign ranks
    const rankMap = new Map();
    let rank = 1;
    while (!heap.isEmpty()) {
        const num = heap.extractMin();
        rankMap.set(num, rank);
        rank++;
    }

    // Step 3: Transform the array using the rankMap
    return arr.map(num => rankMap.get(num));
}