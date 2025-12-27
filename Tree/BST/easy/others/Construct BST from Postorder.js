// https://www.geeksforgeeks.org/construct-a-binary-search-tree-from-given-postorder/


class Solution
{ 
    insert(root, val) {
        if (root === null) {
            return new Node(val)
        }
        
        if (root.data < val) {
            root.right = this.insert(root.right, val)
        } else if (root.data > val) {
            root.left = this.insert(root.left, val)
        }
        
        return root
    }
    constructTree(post,n){
      //code here
      let root = null
      for(let i = post.length - 1; i >= 0; i--) {
          root = this.insert(root, post[i])
      }
      
      return root
    }
 
} 

class Solution
{ 
    
    BST(min, max, index, post) {
        if (index[0] < 0) {
            return null
        }
        let key = post[index[0]]
        let newNode = null
        if (key > min && key < max) {
            newNode = new Node(key)
            index[0]-=1
            newNode.right = this.BST(key, max, index, post)
            newNode.left = this.BST(min, key, index, post)
        }
        return newNode
    }
    
    constructTree(post,n){
      //code here
      let index=[n - 1]
      return this.BST(-Infinity, Infinity, index, post)
    }
 
}  