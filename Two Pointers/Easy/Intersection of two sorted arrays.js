// https://www.geeksforgeeks.org/dsa/intersection-of-two-sorted-arrays/


// Brute
// O(n*m) & O(1) // if we don't consider the res array

function intersection(a, b) {
    let res = [];
    let m = a.length;
    let n = b.length;

    for (let i = 0; i < m; i++) {
    
        // Note that duplicates must be 
        // consecutive in a sorted array
        if (i > 0 && a[i - 1] === a[i]) {
            continue;
        }

        // Since we are only searching distinct
        // elements of a[] in b[] and we break as 
        // soon we find a match, we get only
        // distinct elements in result
        for (let j = 0; j < n; j++) {
            if (a[i] === b[j]) {
                res.push(a[i]);
                break;
            }
        }
    }

    return res;
}


// Optimal
// O(n + m) & O(1)


class Solution {
    // Function to return a list containing the intersection of two arrays.
    intersection(arr1, arr2) {
        // your code here
        
        let i = 0, j = 0, n1 = arr1.length, n2 = arr2.length
        
        let res = []
        
        while (i < n1 && j < n2 ) {
            
            while (i < n1 - 1 && arr1[i] === arr1[i + 1]) { // Skip duplicates
                i++
            }
            
            while (j < n2 - 1 && arr2[j] === arr2[j + 1]) {
                j++
            }
            
            if (arr1[i] < arr2[j]) {
                i++
            } else if (arr2[j] < arr1[i]) {
                j++
            } else {
                res.push(arr1[i])
                i++
                j++
            }
        }
        
        return res
    }
}