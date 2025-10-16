// https://www.geeksforgeeks.org/dsa/largest-bst-binary-tree-set-2/


/*

Brute

O(n^2) & O(1)

*/


const isValidBST = (node, min, max) => {
    if (node == null) return true
    
    if (node.key >= max || node.key <= min) {
        return false
    }
    
    return isValidBST(node.left, min, node.key) && isValidBST(node.right, node.key, max)
}

const size = (node) => {
    if (node == null) return 0
    
    return 1 + size(node.left) + size(node.right)
}

 
class Solution {
    largestBst(node) {
        // code here
        if (node == null) return 0
        
        if (isValidBST(node, Number.MIN_SAFE_INTEGER, Number.MAX_SAFE_INTEGER)) { // check for each node
            return size(node)
        }
        
        return Math.max(this.largestBst(node.left), this.largestBst(node.right))
        
    }
}

/*

Optimal

O(n) & O(1)

*/


class NodeValue {
    constructor(min, max, size) {
        this.min = min
        this.max = max
        this.maxSize = size
    }
}
 
class Solution {
    largestBst(node) {
        const findLargestBst = (root) => {
            if (root == null) { // set min as max and max as min value, so the condition executes correctly when we hit the null node
                return new NodeValue(Number.MAX_SAFE_INTEGER, Number.MIN_SAFE_INTEGER, 0)
            }
            
            const left = findLargestBst(root.left)
            const right = findLargestBst(root.right)

            if (left.max < root.key && root.key < right.min) { // the largest value in the left side should be lesser than the node's val and
            //  smallest value in the right sise should be greater than the node's val to be a valid BST
                return new NodeValue(Math.min(left.min, root.key), Math.max(root.key, right.max), left.maxSize + right.maxSize + 1) // keep passing the min and max and size to the top, so the top nodes can check if the below children and including it are valid bst or not
            }
            
            // if it's not a valid bst, we set [-inf, inf] and set the max of both size since this is not a valid bst, but the children could be a bst
            return new NodeValue(Number.MIN_SAFE_INTEGER, Number.MAX_SAFE_INTEGER, Math.max(left.maxSize, right.maxSize))
        }
        
        return findLargestBst(node).maxSize // return the maxSize
    }
}