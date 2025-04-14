// https://www.geeksforgeeks.org/insertion-in-binary-search-tree/

class Solution {
    // Function to insert a node in a BST.
    insert(node, key) {
        // your code here
        if (node === null) {
            return new Node(key)
        }
        
        if (node.data < key) {
            node.right = this.insert(node.right, key)
        } else if (node.data > key) {
            node.left = this.insert(node.left, key)
        }
        
        return node
        
    
    }
}

class Solution {
    // Function to insert a node in a BST.
    insert(node, key) {
        // your code here
        const temp = new Node(key)
        if (node === null) {
            return temp
        }
        
        let curr = node
        let parent = null
        while (curr) {
            parent = curr
            
            if (curr.data < key) {
                curr = curr.right
            } else if (curr.data > key) {
                curr = curr.left
            } else {
                return node
            }
        }
        
        if (parent.data < key) {
            parent.right = temp
        } else {
            parent.left = temp
        }
        
        return node
    
    }
}

