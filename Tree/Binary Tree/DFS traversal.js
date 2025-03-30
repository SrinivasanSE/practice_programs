// https://www.geeksforgeeks.org/inorder-traversal-of-binary-tree/
// https://www.geeksforgeeks.org/preorder-traversal-of-binary-tree/
// https://www.geeksforgeeks.org/postorder-traversal-of-binary-tree/

//====================================== Recursion

// Inorder (left, current, right)

class Solution {
    traversal(node, res) {
        if(node == null) {
            return
        }
        this.traversal(node.left, res)
        res.push(node.data)
        this.traversal(node.right, res)
    }
    inOrder(root) {
        // your code here
        let res = []
        this.traversal(root, res)
        return res
    }
}

// preorder (current, left, right)

class Solution {
    traversal(node, res) {
        if(node == null) {
            return
        }
        res.push(node.data)
        this.traversal(node.left, res)
        this.traversal(node.right, res)
    }
    preOrder(root) {
        // your code here
        let res = []
        this.traversal(root, res)
        return res
    }
}

// postorder (left, right, current)

class Solution {
    traversal(node, res) {
        if(node == null) {
            return
        }
        this.traversal(node.left, res)
        this.traversal(node.right, res)
        res.push(node.data)
    }
    postOrder(root) {
        // your code here
        let res = []
        this.traversal(root, res)
        return res
    }
}

// =====================================================  STACK =======================================================

// Inorder

class Solution {
    
    inOrder(root) {
        // your code here
        let res = []
        let s = []
        
        let curr = root
        
        while (curr != null || s.length > 0) {
            
            while (curr != null) {
                s.push(curr)
                curr = curr.left
            }
            
            curr = s.pop()
            res.push(curr.data)
            
            curr = curr.right
        }
        
        return res
    }
}

// Preorder

class Solution {
    //Function to return a list containing the preorder traversal of the tree.

    preorder(root)
    {
        //your code here
        let res = []
        let s = []
        
        let curr = root
        
        while (curr != null || s.length > 0) {
            
            while (curr != null) {
                res.push(curr.data)
                
                if(curr.right != null)
                    s.push(curr.right)
                
                curr = curr.left
            }
            
            if (s.length > 0) {
                curr = s.pop()
            }
        }
        
        return res
    }
}


// Postorder

// Two stacks

class Node {
    constructor(x) {
        this.data = x;
        this.left = this.right = null;
    }
}

function postOrderTwoStacks(root) {
    if (!root) return;
    
    let stack1 = [], stack2 = [];
    stack1.push(root);

    while (stack1.length > 0) {
        let node = stack1.pop();
        stack2.push(node);

        if (node.left) stack1.push(node.left);
        if (node.right) stack1.push(node.right);
    }

    // Print stack2 in reverse order
    while (stack2.length > 0) {
        process.stdout.write(stack2.pop().data + " ");
    }
}

/*

Approach:
Use a single stack and push nodes in Root → Right → Left order (Reverse Preorder).

Instead of processing nodes immediately, push them into a result array.

Once traversal is done, reverse the result array to get Left → Right → Root order.

*/

function postOrderOneStack(root) {
    if (!root) return;

    let stack = [], result = [];
    stack.push(root);

    while (stack.length > 0) {
        let node = stack.pop();
        result.push(node.data);  // Store in reverse

        if (node.left) stack.push(node.left);
        if (node.right) stack.push(node.right);
    }

    // Reverse to get postorder
    process.stdout.write(result.reverse().join(" ") + " ");
}

class Solution {
    //Function to return a list containing the postorder traversal of the tree.
    
    postOrder(root)
    {
        //your code here
        let res = []
        let stk = []
        let curr = root
        let lastProcessed = null
        while(curr || stk.length > 0) {
            
            if (curr) {
                stk.push(curr)
                curr = curr.left
            } else {
                const peekNode = stk[stk.length - 1]
                
                if (peekNode.right && peekNode.right != lastProcessed) {
                    curr = peekNode.right
                } else {
                    res.push(peekNode.data)
                    lastProcessed = stk.pop()
                }
            }
        }
        
        return res
        
    }
}

// JavaScript program for iterative postorder traversal
// using one stack with states (using tuple-like array)
class Node {
    constructor(data) {
        this.data = data;
        this.left = null;
        this.right = null;
    }
}

// Function for iterative post-order traversal 
// using a single stack
function postOrder(root) {
    let result = [];
    if (root === null) {
        return result;
    }

    // Stack to store tuples of [Node, state]
    let stk = [];
    stk.push([root, 0]);

    while (stk.length > 0) {
    
        // Get the top element of the stack
        let [node, state] = stk[stk.length - 1];

        if (state === 0) {
        
            // State 0: Push left child and move to it
            stk[stk.length - 1][1] = 1; 
            if (node.left !== null) {
                stk.push([node.left, 0]);
            }
        } 
        else if (state === 1) {
        
            // State 1: Push right child and move to it
            stk[stk.length - 1][1] = 2; 
            if (node.right !== null) {
                stk.push([node.right, 0]);
            }
        } 
        else {
        
            // State 2: Process the node
            result.push(node.data);
            stk.pop();  
        }
    }

    return result;
}






// ========================================================================== Morris Traversal =======================================================================


// Inorder


class Solution {
    
    inOrder(root) {
        // your code here
        let res = []
        
        let curr = root
        let prev
        while (curr != null) {
            
            if (curr.left === null) {
                res.push(curr.data)
                curr = curr.right // move to the linked node
            } else {
                prev = curr.left
                while (prev.right != null && prev.right != curr) {
                    prev = prev.right
                }
                
                if(prev.right === null) { // no link, link it
                    prev.right = curr
                    curr = curr.left
                } else { // link found
                    prev.right = null
                    res.push(curr.data) // parent found
                    curr = curr.right
                }
                
            }      
        }
        
        return res
    }
}


// Preorder

class Solution {
    //Function to return a list containing the preorder traversal of the tree.

    preorder(root)
    {
        //your code here
        let res = []
        let curr = root
        let prev
        while (curr != null) {
            
            if (curr.left === null) {
                res.push(curr.data)
                curr = curr.right
            } else {
                prev = curr.left
                
                while(prev.right != null && prev.right != curr) {
                    prev = prev.right
                }
                
                if (prev.right == null) {
                    res.push(curr.data) // this is the only diff, do push in if instead of else block in inorder
                    prev.right = curr
                    curr = curr.left
                } else {
                    prev.right == null
                    curr = curr.right
                }
            }
        }
        
        return res
    }
}

// postorder

// similar to preorder, just change left to right and right to left in all the places

class Solution {
    //Function to return a list containing the postorder traversal of the tree.
    
    postOrder(root)
    {
        //your code here
        let res = []
        let curr = root
        let prev
        
        while (curr) {
            if (curr.right === null) {
                res.push(curr.data)
                curr = curr.left
            } else {
                prev = curr.right
                
                while(prev.left && prev.left != curr) {
                    prev = prev.left
                }
                
                if (prev.left == null) {
                    res.push(curr.data)
                    prev.left = curr
                    curr = curr.right
                } else {
                    prev.left = null
                    curr = curr.left
                }
            }
        }
        
        return res.reverse() // reverse is needed
    }
}