// https://www.geeksforgeeks.org/find-maximum-or-minimum-in-binary-tree/


class Solution {
    findMax(root) {
      //code here
      if (root === null) {
          return Number.MIN_VALUE
      }
      let res = root.data
      let left = this.findMax(root.left)
      let right = this.findMax(root.right)
      
      if (left > res) {
          res = left
      }
      if (right > res) {
          res = right
      }
      
      return res
    }
    findMin(root) {
      //code here
      if (root === null) {
          return Number.MAX_VALUE
      }
      let res = root.data
      let left = this.findMin(root.left)
      let right = this.findMin(root.right)
      
      if (left < res) {
          res = left
      }
      if (right < res) {
          res = right
      }
      
      return res
    }
  }