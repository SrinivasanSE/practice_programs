// https://www.geeksforgeeks.org/union-of-two-sorted-arrays/

// Brute force
// - O((n1 + n2)log(n1 + n2), O(n1 + n2) // inserting into set takes log time

// Use set and iterate over the two arrays separately and convert the set to array


// Optimal
// O(n1 + n2), O(1)

class Solution {
    // Function to return a list containing the union of the two arrays.
    findUnion(a, b) {
        let union = [];
        let i = 0;
        let j = 0;

        while (i < a.length && j < b.length) {
            while (i + 1 < a.length && a[i] === a[i + 1]) i++ // to skip the duplicates
            while (j + 1 < b.length && b[j] === b[j + 1]) j++
            
            if (a[i] < b[j]) {
                union.push(a[i++])
            } else if (b[j] < a[i]) {
                union.push(b[j++])
            } else { // both are equal, so we take any one
                union.push(b[j++])
                i++
            }
        }
        
        while (i < a.length ) {
            while (i + 1 < a.length && a[i] === a[i + 1]) i++
            union.push(a[i++])
        }
        
        while (j < b.length ) {
            while (j + 1 < b.length && b[j] === b[j + 1]) j++
            union.push(b[j++])
        }

        return union;
    }
}