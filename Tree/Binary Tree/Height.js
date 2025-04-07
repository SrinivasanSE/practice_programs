// https://www.geeksforgeeks.org/find-the-maximum-depth-or-height-of-a-tree/


class Solution {
    /**
     * @param {Node} node
     * @returns {number}
     */

    height(node) {
        // code here
        let level = 0
        let q = []
        q.push(node)
        let curr
        while (q.length > 0) {
            let len = q.length
            
            for(let i = 0; i < len; i++) {
                curr = q.shift()
                
                if (curr.left) q.push(curr.left)
                if (curr.right) q.push(curr.right)
            }
            level++
        }
        
        return level - 1
    }
}


class Solution {
    /**
     * @param {Node} node
     * @returns {number}
     */

    height(node) {
        // code here
        if (node === null) {
            return -1
        }
        
        const leftHeight = this.height(node.left)
        const rightHeight = this.height(node.right)
        
        return Math.max(leftHeight, rightHeight) + 1
    }
}