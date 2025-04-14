// https://www.geeksforgeeks.org/deletion-in-binary-search-tree/

// TODO: Learn iterative sol

class Solution {
    // Function to delete a node from BST.
    deleteNode(root, x) {
        // your code here
        if (root === null) {
            return root
        }
        
        if (root.data < x) {
            root.right = this.deleteNode(root.right, x)
        } else if (root.data > x) {
            root.left = this.deleteNode(root.left, x)
        } else {
            if (root.left == null) {
                return root.right
            }
            if (root.right == null) {
                return root.left
            }
            
            let succParent = root
            let succ = root.right
            
            while(succ && succ.left != null) {
                succParent = succ
                succ = succ.left
            }
            
            root.data = succ.data
            root.right = this.deleteNode(root.right, succ.data) // we are iterating again to delete the duplicate node which is not efficient
        }
        return root
    }
}


// Inorder successor
class Solution {
    // Function to delete a node from BST.
    deleteNode(root, x) {
        // your code here
        if (root === null) {
            return root
        }
        
        if (root.data < x) {
            root.right = this.deleteNode(root.right, x)
        } else if (root.data > x) {
            root.left = this.deleteNode(root.left, x)
        } else {
            if (root.left == null) {
                return root.right
            }
            if (root.right == null) {
                return root.left
            }
            
            let succParent = root
            let succ = root.right
            
            while(succ && succ.left != null) {
                succParent = succ
                succ = succ.left
            }
            
            root.data = succ.data
            //root.right = this.deleteNode(root.right, succ.data)
            
            if (succParent.left === succ) {
                succParent.left = succ.right
            } else { // if we are gonna delete the root node and there is no left node
                /*
                Delete 50
                succParent = 50
                      50 -> becomes 60
                        /  \
                    30    60
                                \
                                70
                                \
                                
                                */

                succParent.right = succ.right // 60.right = 70 the root becomes 60 and it's linked to 70 and duplicate 60 gets removed
            }
        }
        return root
    }
}

// Inorder Predecessor

class Solution {
    // Function to delete a node from BST.
    deleteNode(root, x) {
        // your code here
        if (root === null) {
            return root
        }
        
        if (root.data < x) {
            root.right = this.deleteNode(root.right, x)
        } else if (root.data > x) {
            root.left = this.deleteNode(root.left, x)
        } else {
            if (root.left == null) {
                return root.right
            }
            if (root.right == null) {
                return root.left
            }
            
            let succParent = root
            let succ = root.left
            
            while(succ && succ.right != null) {
                succParent = succ
                succ = succ.right
            }
            
            root.data = succ.data
            //root.right = this.deleteNode(root.right, succ.data)
            
            if (succParent.left === succ) {
                succParent.left = succ.left
            } else {
                succParent.right = succ.left
            }
        }
        return root
    }
}