// https://www.geeksforgeeks.org/inorder-predecessor-successor-given-key-bst/


/*

Brute - two traversal

O(h) & O(1)

*/


class Solution {
    findPreSuc(root, key) {
        // code here
        let curr = root, pre = null, succ = null
        
        while (curr) {
            if (curr.data <= key) {
                curr = curr.right
            } else  {
                succ = curr
                curr = curr.left
            }
        }
        curr = root
        while (curr) {
            if (curr.data < key) {
                pre = curr
                curr = curr.right
            } else  {
                curr = curr.left
            }
        }
        
        return [pre, succ]
        
    }
}


/*

Optimised - Single traversal

O(h) & O(1)

*/


const rightMost = (node) => {
    while (node.right) node = node.right
    return node
}

const leftMost = (node) => {
    while (node.left) node = node.left
    return node
}

class Solution {
    findPreSuc(root, key) {
        // code here
        let curr = root, pre = null, succ = null
        
        while (curr) {
            if (curr.data < key) {
                pre = curr
                curr = curr.right
            } else if (curr.data > key) {
                succ = curr
                curr = curr.left
            } else { // if the curr's val is equal to the given value, predecessor will be in left's tree - right side of the tree and successor will be on the right side's left tree
                if (curr.left) pre = rightMost(curr.left)
                if (curr.right) succ = leftMost(curr.right)
                break
            }
        }
        
        
        return [pre, succ]
        
    }
}