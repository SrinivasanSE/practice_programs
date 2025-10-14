// https://www.geeksforgeeks.org/floor-and-ceil-from-a-bst/

/*

Recursion

O(logn) & O(logn)

*/


class Solution {
    // Function to return the ceil of given number in BST.
    findCeil(root, x) {
        // your code here
        if (root === null) {
            return -1
        }
        if (root.data === x) {
            return root.data
        }
        
        if (root.data < x) {
            return this.findCeil(root.right, x)
        }
        
        const res = this.findCeil(root.left, x)
        
        return res >= x ? res : root.data
    }
}

/*

Iterative

O(logn) & O(1)

*/


class Solution {
    // Function to return the ceil of given number in BST.
    findCeil(root, x) {
        // your code here
        let res = -1
        
        let curr = root
        
        while(curr != null) {
            if (curr.data < x) {
                curr = curr.right
            } else if (curr.data > x) {
                res = curr.data
                curr = curr.left
            } else {
                return curr.data
            }
        }
        return res
    }
}


