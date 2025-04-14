// https://www.geeksforgeeks.org/inorder-predecessor-in-binary-search-tree/

class Solution {
    // returns the inorder predecessor of the Node x in BST (rooted at 'root')
    inOrderPredecessor(root, x) {
        x = x.data;
        if (root === null) {
            return -1;
        }

        let curr;

        // Case 1: If node has a left child → predecessor is the rightmost in left subtree
        if (root.data === x && root.left !== null) {
            curr = root.left;
            while (curr.right !== null) {
                curr = curr.right;
            }
            return curr.data;
        }

        // Case 2: Traverse the tree looking for predecessor
        let pred = -1;
        curr = root;

        while (curr !== null) {
            if (curr.data < x) {
                pred = curr.data;       // Possible predecessor
                curr = curr.right;      // Try to find closer value
            } else {
                curr = curr.left;       // Go left to find smaller values
            }
        }

        return pred;
    }
}
