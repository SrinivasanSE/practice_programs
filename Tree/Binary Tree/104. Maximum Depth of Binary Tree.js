// https://www.geeksforgeeks.org/find-the-maximum-depth-or-height-of-a-tree/
// https://leetcode.com/problems/maximum-depth-of-binary-tree/description/

/*

Brute - Level order traversal

O(n) & O(n)

*/

class Solution {
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


/*

Recursion

O(n) & O(n)

*/


class Solution {
    height(node) {
        // code here
        if (node === null) {
            return -1 // 0 or -1 based on the assumption of initial height as 0 or 1. For 0, use -1, for 1, use 0
        }
        
        const leftHeight = this.height(node.left)
        const rightHeight = this.height(node.right)
        
        return 1 + Math.max(leftHeight, rightHeight)
    }
}