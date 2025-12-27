// https://www.geeksforgeeks.org/sum-k-smallest-elements-bst/


function calculateSum(root, k, ans) {
    if (root.left !== null) {
        calculateSum(root.left, k, ans);
    }

    if (k.val > 0) {
        ans.val += root.data;
        k.val--;
    } 
    else {
        return;
    }

    if (root.right !== null) {
        calculateSum(root.right, k, ans);
    }
}

// Function to find the sum of the first k 
// smallest elements
function sumKSmallest(root, k) {
    let ans = { val: 0 };
    let kObj = { val: k };
    calculateSum(root, kObj, ans);
    return ans.val;
}

function sum(root, k) {
    let current = root;
    let count = 0;
    let result = 0;
  
    while (current !== null) {
      if (current.left === null) {
      
        // Visit this node
        count++;
        result += current.data;
        if (count === k) {
          return result;
        }
        
        // Move to the right subtree
        current = current.right;
      } 
      else {
      
        // Find the predecessor (rightmost node in left subtree)
        let pre = current.left;
        while (pre.right !== null && pre.right !== current) {
          pre = pre.right;
        }
  
        if (pre.right === null) {
        
          // Establish thread/link from predecessor to current
          pre.right = current;
          
          // Move to the left subtree
          current = current.left;
        }
        else {
        
          // Revert the thread/link from predecessor to current
          pre.right = null;
          
          // Visit this node
          count++;
          result += current.data;
          if (count === k) {
            return result;
          }
          
          // Move to the right subtree
          current = current.right;
        }
      }
    }

}