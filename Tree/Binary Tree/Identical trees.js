// https://www.geeksforgeeks.org/write-c-code-to-determine-if-two-trees-are-identical/
// https://www.geeksforgeeks.org/check-if-two-trees-are-mirror/

class Solution {
    // Function to check if two trees are identical.
    isIdentical(r1, r2) {
        // your code here
        if (r1 === null && r2 === null) {
            return true
        }
        
        if (r1 === null || r2 === null) {
            return false
        }
        
        return r1.data === r2.data && this.isIdentical(r1.left, r2.left) && this.isIdentical(r1.right, r2.right)
    }
}

class Solution {
    // Function to check if two trees are identical.
    isIdentical(r1, r2) {
        // your code here
        if (r1 === null && r2 === null) {
            return true
        }
        
        if (r1 === null || r2 === null) {
            return false
        }
        
        let q1 = [r1]
        let q2 = [r2]
        
        while(q1.length > 0 && q2.length > 0) {
            const c1 = q1.shift()
            const c2 = q2.shift()
            
            if (c1.data != c2.data) {
                return false
            }
            
            if(c1.left && c2.left) {
                q1.push(c1.left)
                q2.push(c2.left)
            } else if (c1.left  || c2.left ) {
                return false
            }
            
            if(c1.right && c2.right) {
                q1.push(c1.right)
                q2.push(c2.right)
            } else if (c1.right  || c2.right) {
                return false
            }
            
            
        }
        
        return q1.length == 0 && q2.length == 0
    }
}

class Solution {
    // Function to check if two trees are identical.
    isIdentical(r1, r2) {
        // your code here
        if (r1 === null && r2 === null) {
            return true
        }
        
        if (r1 === null || r2 === null) {
            return false
        }
        
        while(r1 && r2) {
            if (r1.data != r2.data) {
                return false
            }
            
            if (r1.left == null) {
                r1 = r1.right
            } else {
                let prev = r1.left
                while(prev.right && prev.right != r1) {
                    prev = prev.right
                }
                
                if (prev.right == null) {
                    prev.right = r1
                    r1 = r1.left
                } else {
                    prev.right = null
                    r1 = r1.right
                }
            }
            
            if (r2.left == null) {
                r2 = r2.right
            } else {
                let prev = r2.left
                while(prev.right && prev.right != r2) {
                    prev = prev.right
                }
                
                if (prev.right == null) {
                    prev.right = r2
                    r2 = r2.left
                } else {
                    prev.right = null
                    r2 = r2.right
                }
            }
        }
        return r1 == null && r2 == null
    }
}