// https://www.geeksforgeeks.org/a-program-to-check-if-a-binary-tree-is-bst-or-not/
// https://leetcode.com/problems/validate-binary-search-tree/

/*

Recursion

O(n) & O(n)

*/

var isValidBST = function(root) { // we check whether each node is in the required range or not
    const isValid = (node, min, max) => {
        if (node == null) return true

        if (node.val >= max || node.val <= min) {
            return false
        }

        return isValid(node.left, min, node.val) && isValid(node.right, node.val, max) // left side node should be lesser than the parent and right side node should be greater than the parent
    }

    return isValid(root, Number.MIN_SAFE_INTEGER, Number.MAX_SAFE_INTEGER)
    
};

/*

Iterative - Morris Inorder traversal

O(n) & O(1)

*/


class Solution { // inorder traversal returns the nodes in sorted order for BST, so if the prev >= current node's val, that means it's not a valid bst
    isBST(root) {
        // your code 
        
        if (root == null) {
            return true
        }
        
        let curr = root
        let prev = -Infinity;
        
        while(curr != null) {
            
            if (curr.left === null) {
                
                if (curr.data <= prev) {
                    return false
                }
                
                prev = curr.data
                curr = curr.right
            } else {
                // Predecessor
                let pred = curr.left
                
                while (pred.right != null && pred.right != curr) {
                    pred = pred.right
                }
                
                if (pred.right == null) {
                    pred.right = curr
                    curr = curr.left
                } else {
                    pred.right = null
                    if (curr.data <= prev) {
                        return false
                    }
                    prev = curr.data
                    curr = curr.right
                }
            }
        }
        
        return true
    }
}
