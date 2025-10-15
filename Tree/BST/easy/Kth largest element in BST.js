// https://www.geeksforgeeks.org/kth-largest-element-in-bst-when-modification-to-bst-is-not-allowed/

/*

Recursion

O(n) & O(n)

*/


class Solution {
    // return the Kth largest element in the given BST rooted at 'root'
    kthLargest(root, k) {
        // code here
       let res = {c: 0, ans: -1}
       
       const findKthLargest = (root, k, res) => {
           
           if (root === null || res.c >= k) {
               return
           }
           
           findKthLargest(root.right, k, res)
           
           res.c+=1
           
           if (res.c == k) {
               res.ans = root.data
               return
           }
           
           findKthLargest(root.left, k, res)
       }
       
       findKthLargest(root, k, res)
       return res.ans
    }
}

/*

Morris traversal

O(n) & O(1)

*/


class Solution {
    kthLargest(root, k) { // reverse inorder, use right instead of left
        // code here
        if (root == null) {
            return
        }
        
        let curr = root
        let count = 0
        while (curr) {
            if (curr.right === null) {
                count++
                if (count === k) {
                    return curr.data
                }
                
                curr = curr.left
            } else {
                let succ = curr.right
                while (succ.left && succ.left != curr) {
                    succ = succ.left
                }
                
                if (succ.left === null) {
                    succ.left = curr
                    curr = curr.right
                } else {
                    succ.left = null
                    count++
                    if (count === k) {
                        return curr.data
                    }
                    curr = curr.left
                }
            }
        }
    }
}


