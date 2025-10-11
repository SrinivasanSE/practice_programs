// https://www.geeksforgeeks.org/dsa/convert-an-arbitrary-binary-tree-to-a-tree-that-holds-children-sum-property/

// Make the tree satisfy the children sum property

/*

Recursion

O(n) & O(H)

*/

class Solution {
    // Function to change the values of the nodes
    // based on the sum of its children's values.
    changeTree(root) {
        // Base case: If the current node
        // is null, return and do nothing.
        if (root === null) {
            return;
        }

        // Calculate the sum of the values of
        // the left and right children, if they exist.
        let child = 0;
        if (root.left) {
            child += root.left.val;
        }
        if (root.right) {
            child += root.right.val;
        }

        // Compare the sum of children with
        // the current node's value and update
        if (child >= root.val) {
            root.val = child;
        } else {
            // If the sum is smaller, update the
            // child with the current node's value.
            if (root.left) {
                root.left.val = root.val;
            } else if (root.right) {
                root.right.val = root.val;
            }
        }

        // Recursively call the function
        // on the left and right children.
        this.changeTree(root.left);
        this.changeTree(root.right);

        // Calculate the total sum of the
        // values of the left and right
        // children, if they exist.
        let tot = 0;
        if (root.left) {
            tot += root.left.val;
        }
        if (root.right) {
            tot += root.right.val;
        }

        // If either left or right child
        // exists, update the current node's
        // value with the total sum.
        if (root.left || root.right) {
            root.val = tot;
        }
    }
}