// https://www.geeksforgeeks.org/how-to-check-if-a-given-array-represents-a-binary-heap/

// Max Heap

/*

Iterative 
O(n) & O(1)

*/

class Solution {
    isMaxHeap(n, arr) {
        // code here
        for (let i = 0; i <= Math.floor(n/2) - 1; i++) {
            if (2*i + 1 < n && arr[i] < arr[2*i + 1]) {
                return false
            }
            
            if (2*i + 2 < n && arr[i] < arr[2*i + 2]) {
                return false
            }
        }
        
        return true
    }
}

/*

Recursive
O(n) & O(H)

*/

const isHeap = (arr, i, n) => {
    // If left child index is out of bounds, it's a leaf
    if (2*i + 1 >= n) {
        return true;
    }
    // Check left child
    if (arr[i] < arr[2*i + 1]) return false;
    // Check right child if it exists
    if (2*i + 2 < n && arr[i] < arr[2*i + 2]) return false;
    // Recurse for children
    return isHeap(arr, 2*i + 1, n) && isHeap(arr, 2*i + 2, n);
}

class Solution {
    isMaxHeap(n, arr) {
        // code here
        return isHeap(arr, 0, n)
    }
} 



// Min Heap

/*

Iterative 
O(n) & O(1)

*/

class Solution {
    isMinHeap(n, arr) {
        // code here
        for (let i = 0; i <= Math.floor(n/2) - 1; i++) {
            if (2*i + 1 < n && arr[i] > arr[2*i + 1]) {
                return false
            }
            
            if (2*i + 2 < n && arr[i] > arr[2*i + 2]) {
                return false
            }
        }
        
        return true
    }
}

/*

Recursive
O(n) & O(H)

*/

const isMinHeap = (arr, i, n) => {
    // If left child index is out of bounds, it's a leaf
    if (2*i + 1 >= n) {
        return true;
    }
    // Check left child
    if (arr[i] > arr[2*i + 1]) return false;
    // Check right child if it exists
    if (2*i + 2 < n && arr[i] > arr[2*i + 2]) return false;
    // Recurse for children
    return isHeap(arr, 2*i + 1, n) && isHeap(arr, 2*i + 2, n);
}

class Solution {
    isMinHeap(n, arr) {
        // code here
        return isMinHeap(arr, 0, n)
    }
} 