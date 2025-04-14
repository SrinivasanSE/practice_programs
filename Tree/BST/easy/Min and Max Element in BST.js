// https://www.geeksforgeeks.org/find-the-minimum-element-in-a-binary-search-tree/

class Solution {
    // Function to find the minimum element in the given BST.
    minValue(root) {
        // your code here
        if(root == null) {
            return -1
        }
        
        let curr = root
        while(curr.left != null) {
            curr = curr.left
        }
        
        return curr.data
    }
}

class Solution {
    // Function to find the minimum element in the given BST.
    minValue(root) {
        // your code here
        if(root.left == null) {
            return root.data
        }
        
        
        
        return this.minValue(root.left)
    }
}


class Solution {
    // Function to find the minimum element in the given BST.
    maxValue(root) {
        // your code here
        if(root == null) {
            return -1
        }
        
        let curr = root
        while(curr.right != null) {
            curr = curr.right
        }
        
        return curr.data
    }
}