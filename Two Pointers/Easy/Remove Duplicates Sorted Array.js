// https://www.geeksforgeeks.org/remove-duplicates-sorted-array/


// Using hashmap 

class Solution {
    // Function to remove duplicates from the given array.
    removeDuplicates(arr) {
        // Code Here
        const set = new Set()
        let idx = 0
        for(let i = 0; i < arr.length; i++) {
            if (!set.has(arr[i])) {
                set.add(arr[i])
                arr[idx++] =arr[i]
            }
        }
        return idx
    }
}


class Solution {
    // Function to remove duplicates from the given array.
    removeDuplicates(arr) {
        // Code Here
        let idx = 1
        for(let i = 1; i < arr.length; i++) {
            if (arr[i] != arr[i - 1]) {
                arr[idx] = arr[i]
                idx++
            }
        }
        return idx
    }
}