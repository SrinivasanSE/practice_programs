// https://www.geeksforgeeks.org/check-if-a-given-binary-tree-is-sumtree/

class Solution {
    // Should return true if tree is Sum Tree, else false
    sum(node) {
        if (node == null) {
            return 0
        }
        
        return this.sum(node.left) + node.key + this.sum(node.right)
    }
    isSumTree(root) {
        // code here
        if (root == null || (root.left == null && root.right == null)) {
            return true
        }
        
        let ls = this.sum(root.left)
        let rs = this.sum(root.right)
        
        
        return root.key == ls + rs && this.isSumTree(root.left) && this.isSumTree(root.right)
    }
}


class Solution {
    // Should return true if tree is Sum Tree, else false
    isLeaf(node) {
        if (node === null || (node.left === null && node.right === null)) {
            return true
        }
        return false
    }
    isSumTree(root) {
        // code here
        let ls,rs
        if (root == null || this.isLeaf(root)) {
            return true
        }
        
        if(this.isSumTree(root.left) && this.isSumTree(root.right)) {
            if (root.left == null) ls = 0
            else if (this.isLeaf(root.left)) ls = root.left.key
            else ls = 2*root.left.key
            
            if (root.right == null) rs = 0
            else if (this.isLeaf(root.right)) rs = root.right.key
            else rs = 2*root.right.key
            
            return root.key == ls + rs
            
            
        }
        return false
    }
}

class Solution {
    // Should return true if tree is Sum Tree, else false
    
    _isSumTree(root) {
        // code here
        if (root == null) {
            return 0
        }
        
        if (root.left == null && root.right == null) return root.key
        
        let ls = this._isSumTree(root.left)
        
        if (ls === -1) {
            return -1
        }
        
        let rs = this._isSumTree(root.right)
        
        if (rs === -1) {
            return -1
        }
        if (root.key == ls + rs) return ls + rs + root.key
        else return -1
    }
    
    isSumTree(root) {
        const res = this._isSumTree(root)
        return res != -1
    }
}