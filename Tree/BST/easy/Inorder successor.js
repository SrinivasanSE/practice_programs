// https://www.geeksforgeeks.org/inorder-successor-in-binary-search-tree/


class Solution {
    // returns the inorder successor of the Node x in BST (rooted at 'root')
    inOrderSuccessor(root, x) {
        // code here
        x = x.data
        if (root === null) {
            return -1
        }
        let curr
        if (root.data === x && root.right != null) {
            curr = root.right
            while(curr.left != null) {
                curr = curr.left
            }
            return curr.data
        }
        
        let succ = -1
        curr = root
        
        while (curr != null) {
            if (curr.data > x) {
                succ = curr.data
                curr = curr.left
            } else if (curr.data <= x) {
                curr = curr.right
            }
        }
        
        return succ
    }
}