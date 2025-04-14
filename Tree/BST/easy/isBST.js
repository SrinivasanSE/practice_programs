// https://www.geeksforgeeks.org/a-program-to-check-if-a-binary-tree-is-bst-or-not/


class Solution {
    // Function to check whether a Binary Tree is BST or not.

    _isBST(node, min, max) {
        if (node === null) {
            return true
        }
        
        if (node.data < min || node.data > max) {
            return false
        }
        
        return this._isBST(node.left, min, node.data - 1) && this._isBST(node.right, node.data + 1, max)
    }
     
    isBST(root) {
        // your code 
        
        if (root == null) {
            return true
        }
        
        return this._isBST(root, -Infinity, Infinity)
        
        
        
    }
}


class Solution {
    // Function to check whether a Binary Tree is BST or not.

    Inorder(node, prev) {
        if (node === null) {
            return true
        }
        
        if(!this.Inorder(node.left, prev)) {
            return false
        }
        
        if (prev[0] >= node.data) {
            return false
        }
        
        prev[0] = node.data
        
        return this.Inorder(node.right, prev)
        
    }
     
    isBST(root) {
        // your code 
        let prev = [-Infinity]
        return this.Inorder(root, prev)
 
    }
}


// Morris Inorder traversal
class Solution {
    // Function to check whether a Binary Tree is BST or not.

     
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
