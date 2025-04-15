// https://www.geeksforgeeks.org/maximum-width-of-a-binary-tree/

class Solution {
    // Function to get the maximum width of a binary tree.
    getMaxWidth(root) {
        // your code here
        let q = [root]
        let width = 0
        while (q.length > 0) {
            const len = q.length
            width = Math.max(len, width)
            for(let i = 0; i < len ; i++) {
            let curr = q.shift()
            
            if (curr.left) q.push(curr.left)
            if (curr.right) q.push(curr.right)
        }
}
        return width
    }
}

class Solution {
    // Function to get the maximum width of a binary tree.
    getMaxWidth(root) {
        // your code here
        const h = this.height(root)
        let maxWidth = 0
        let width;
        
        for (let i = 1; i <= h; i++) {
            width = this.width(root, i)
            maxWidth = Math.max(width, maxWidth)
        }
        
        return maxWidth
      
    }
    
    height(node) {
        if (node === null) {
            return 0
        }
        
        const left = this.height(node.left)
        const right = this.height(node.right)
        
        return Math.max(left, right) + 1
    }
    
    width(node, level) {
        if (node === null) {
            return 0
        }
        if (level === 1) {
            return 1
        }
        
        return this.width(node.left, level - 1) + this.width(node.right, level - 1)
        
    }
}