// https://www.geeksforgeeks.org/print-left-view-binary-tree/


class Solution {
    
    preOrder(curr, level, left) {
        if (curr === null) return
        
        if (level > left.length) left.push(curr.data)
        
        this.preOrder(curr.left, level + 1, left)
        this.preOrder(curr.right, level + 1, left)
    }
    leftView(root) {
        // your code here
        let res = []
        if (!root) {
            return res
        }
        
        this.preOrder(root, 1, res)
        return res
        
        
    }
}



class Solution {
    
    
    leftView(root) {
let result = [];

    if (root === null) {
        return result;
    }

    // Queue for level order traversal
    let queue = [root];

    while (queue.length > 0) {
    
    	// Temporary array for the next level
        let currqueue = []; 

        // Number of nodes at the current level
        let levelSize = queue.length;

        for (let i = 0; i < levelSize; i++) {
            let curr = queue[i];

            // If it's the first node of the current level
            if (i === 0) {
                result.push(curr.data);
            }

            // Enqueue left child
            if (curr.left !== null) {
                currqueue.push(curr.left);
            }

            // Enqueue right child
            if (curr.right !== null) {
                currqueue.push(curr.right);
            }
        }
        // Move to the next level
        queue = currqueue;
    }

    return result;
        
        
    }
}