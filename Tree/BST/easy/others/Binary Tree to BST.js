// https://www.geeksforgeeks.org/binary-tree-to-binary-search-tree-conversion/

class Solution {
    inOrder(node, v) {
        if (node === null) {
            return 
        }
        
        this.inOrder(node.left, v)
        v.push(node.data)
        this.inOrder(node.right, v)
    }
    buildBst(node, values, index) {
        if (node === null) {
            return
        }
        
        this.buildBst(node.left, values, index)
        node.data = values[index[0]]
        index[0]++
        this.buildBst(node.right, values, index)
    }
  	binaryTreeToBST(root){
  		//code here
  		
  		const v = []
  		this.inOrder(root, v)
  		
  		v.sort((a, b) => a - b)
  		
  		let index = [0]
  		
  		this.buildBst(root, v, index)
  		
  		return root
  		
  		
  	}
}