// https://www.geeksforgeeks.org/maximize-elements-using-another-array/

class Solution {
    /**
    * @param number n
    * @param number[] arr1
    * @param number[] arr2

    * @returns number[]
    */
    maximizeArray(n, arr1, arr2) {
        // code here
        const heap = new MaxHeap()
        
        const ans = []
        
        const set = new Set()
        
        for(let i = 0; i < n; i++) {
            heap.insert(arr1[i])
            heap.insert(arr2[i])
        }
        // instead of heap, a new array can be created combining arr1 and arr2 and sorted in descending order and can be added to set.
        /*
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
        */
        while (set.size != n) {
            set.add(heap.extractMax())
        }
        
        for(let num of arr2) {
            if (set.has(num)) {
                set.delete(num)
                ans.push(num)
            }
        }
        
        if(set.size > 0) {
        for (let num of arr1) {
            if (set.has(num)) {
                set.delete(num)
                ans.push(num)
            }
        }
        }
        return ans
    }
}