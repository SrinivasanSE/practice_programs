// https://www.geeksforgeeks.org/count-pairs-from-two-bsts-whose-sum-is-equal-to-a-given-value-x/


class Solution {
    
    findPair(node, val) {
        
        if (node === null) {
            return false
        }
        
        if (node.data === val) {
            return true
        }
        if (node.data < val) {
            return this.findPair(node.right, val)
        }
        
        return this.findPair(node.left, val)
    }
    
    countPairs(root1, root2, x) {
        //code here.
        let ans = 0
        
        if (root1 === null) {
            return 0
        }
        
        if(this.findPair(root2, x - root1.data)) {
            ans++
        }
        
        ans += this.countPairs(root1.left, root2, x)
        ans += this.countPairs(root1.right, root2, x)
        
        return ans
        
    }
}


class Solution {
    
    
    countPairs(root1, root2, x) {
        //code here.
        let ans = 0
        if (root1 == null || root2 == null) {
            return 0
        }
        
        let s1 = [], s2 = []
        let top1, top2
        
        while (true) {
            
            while(root1 != null) {
                s1.push(root1)
                root1 = root1.left
            }
            
            while(root2 != null) {
                s2.push(root2)
                root2 = root2.right
            }
            
            if (s1.length === 0 || s2.length === 0) {
                break
            }
            
            top1 = s1[s1.length - 1]
            top2 = s2[s2.length - 1]
            if (top1.data + top2.data === x) {
                ans++
                s1.pop()
                s2.pop()
                
                root1 = top1.right
                root2 = top2.left
            }
            
            else if (top1.data + top2.data < x) {
                s1.pop()
                root1 = top1.right
            } else {
                s2.pop()
                root2 = top2.left
            }
        }
        
        return ans
        
        
    }
}


class Solution {
    
    inOrder(node, hashmap) {
        if (node == null) {
            return
        }
        
        this.inOrder(node.left, hashmap)
        hashmap.add(node.data)
        this.inOrder(node.right, hashmap)
    }
    countPairs(root1, root2, x) {
        //code here.
        let hashmap = new Set()
        this.inOrder(root1, hashmap)
        //console.log(hashmap)
        let curr = root2
        let count = 0
        while (curr != null) {
            if (curr.left == null) {
                if (hashmap.has(x - curr.data)) {
                    count++
                }
                curr = curr.right
            } else {
                let pred = curr.left
                
                while (pred.right != null && pred.right != curr) {
                    pred = pred.right
                }
                
                if (pred.right == null) {
                    pred.right = curr
                    curr = curr.left
                } else {
                    if (hashmap.has(x - curr.data)) {
                        count++
                    }
                    pred.right = null
                    curr = curr.right
                }
            }
        }
        
        return count
    }
}