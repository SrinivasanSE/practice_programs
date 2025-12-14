// https://www.geeksforgeeks.org/dsa/replace-each-element-of-array-with-its-corresponding-rank/


/*

Brute

O(n^2) & O(n)

*/


class Solution {
    replaceWithRank(n, arr) {
        // your code here
        const res = new Array(n)
        
        for (let i = 0; i < n; i++) {
            const set = new Set() // we use set to skip the duplicates so that rank doesn't increase wrongly
            for (let j = 0; j < n; j++) {
                if (arr[j] < arr[i]) { // count num of smaller elements for the current element
                    set.add(arr[j])
                }
            }
            
            res[i] = set.size + 1 // rank starts from 1, so we add + 1
        }
        
        return res
    }
}

/*

Optimal - Sorting

O(nlogn) & O(n)

*/



class Solution {
    // Function to replace each element of the array with its rank.
    replaceWithRank(n, arr) {
        // Convert the arr to [value, index] and sort the array by value
        const sorted = [...arr].map((num, i) => [num, i]).sort((a, b) => a[0] - b[0])
        
        let rank = 0 // to track the rank
        let lastNum = null
        
        for (let item of sorted) {
            if (lastNum == null || item[0] != lastNum) { // to ignore the duplicates, for duplicates, the rank is same
                rank++
            }
            
            arr[item[1]] = rank // Replace the element by it's rank at the index we get
            lastNum = item[0]
        }
        
        return arr
    }
}


/*

Optimal - Heap

O(nlogn) & O(n)

*/


class Solution {
    replaceWithRank(n, arr) {
        // your code here
        const heap = new MinHeap()
        for (let i = 0; i <n; i++) { // insert all the elements to the heap
            heap.insert({value: arr[i], index: i})
        }
        let rank = 0
        let lastNum = null
        
        while (!heap.isEmpty()) {
            const item = heap.extractMin()
        
            if (lastNum == null || item.value != lastNum) {
                rank++
            }
            
            arr[item.index] = rank
            lastNum = item.value
        }
        
        return arr
    }
}