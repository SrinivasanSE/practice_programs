// https://www.geeksforgeeks.org/lowest-common-ancestor-in-a-binary-search-tree/

/*
For two given values n1 and n2, start from the root:

If both n1 and n2 are smaller than the current node, LCA must be in the left subtree.

If both n1 and n2 are greater than the current node, LCA must be in the right subtree.

If one value is on the left and the other is on the right, OR if the current node matches one of them — you’ve found the LCA!

*/

class Solution {
    LCA(root, n1, n2) {
        // your code here
        
        if (root === null) {
            return null
        }
        //console.log(root.data, n1, n2)
        if (n1.data < root.data && n2.data < root.data) {
            return this.LCA(root.left, n1, n2)
        } 
        if (n1.data > root.data && n2.data > root.data) {
            return this.LCA(root.right, n1, n2)
        } 
        return root
        
    }
}

class Solution {
    LCA(root, n1, n2) {
        // your code here
        
        if (root === null) {
            return null
        }
        
        let curr = root
        
        while(curr) {
            if (n1.data > curr.data && n2.data > curr.data) {
                curr = curr.right
            } else if (n1.data < curr.data && n2.data < curr.data) {
                curr = curr.left
            } else {
                return curr
            }
        }
        
    }
}