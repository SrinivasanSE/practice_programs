// https://www.geeksforgeeks.org/check-two-nodes-cousins-binary-tree/
// https://leetcode.com/problems/cousins-in-binary-tree/description/

class Solution {
    
    siblings(root, a, b) {
        if (root == null) {
            return false
        }
        
        if (root.left && root.right && root.left.data === a && root.right.data === b) {
            return true
        }
        
        if (root.left && root.right && root.left.data === b && root.right.data === a) {
            return true
        }
        
        return this.siblings(root.left, a, b) || this.siblings(root.right, a, b)
    }
    
    level(node, searchNode, lev) { // same as depth, instead of returning 0, return -1
        if (node == null) {
            return 0
        }
        if (node.data === searchNode) {
            return lev
        }
        const l = this.level(node.left, searchNode, lev + 1)
        if (l != 0) {
            return l
        }
        
        return this.level(node.right, searchNode, lev + 1)
    }
    isCousins(root, a, b) {
        // code here
        if (a === b) {
            return false
        }
        
        const alevel = this.level(root, a, 1)
        const blevel = this.level(root, b, 1)
        
        if (alevel == 0 || blevel == 0) {
            return false
        }
        
        return alevel === blevel && !this.siblings(root, a, b)
        
        
        
    }
}

class Solution {
    
    
    isCousins(root, a, b) {
        // code here
        if(!root) {
            return false
        }
        if (a === b) {
            return false
        }
        
        const q = [root]
        let aFound = false
        let bFound = false
        while (q.length > 0) {
            let len = q.length
            for(let i = 0; i < len; i++) {
                let curr = q.shift()
                
                if (curr.data === a  ) {
                    aFound = true
                }
                if (curr.data === b) {
                    bFound = true
                }
                if (curr.left && curr.right && ((curr.left.data === a && curr.right.data === b) || (curr.left.data === b && curr.right.data === a))) {
                    return false
                }
                
                if(curr.left) {
                    q.push(curr.left)
                }
                if (curr.right) {
                    q.push(curr.right)
                }
            }
            
            if (aFound && bFound) {
                return true
            }
            if (aFound || bFound) {
                return false
            }
            
        }
        return false
    }
}