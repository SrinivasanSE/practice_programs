// https://www.geeksforgeeks.org/convert-bst-to-max-heap/

class Solution {
    inOrder(root, arr) {
        if (root == null) {
            return
        }
        this.inOrder(root.left, arr)
        arr.push(root.data)
        this.inOrder(root.right, arr)
    } 
    
    postOrder(root, arr, index) { // use preorder for min heap
        if (root == null) {
            return
        
        }
        this.postOrder(root.left, arr, index)
        this.postOrder(root.right, arr, index)
        root.data = arr[index[0]]
        index[0]++
        
    }
    
    
    convertToMaxHeapUtil(root) {
        // code here
        let arr = []
        this.inOrder(root, arr)
        
        let index = [0]
        this.postOrder(root, arr, index)
        return root
    }
}


// Node class
class Node {
    constructor(data) {
        this.data = data;
        this.left = null;
        this.right = null;
    }
}

// Helper function to create a new Node
function getNode(data) {
    return new Node(data);
}

// Step 1: Collect all nodes in level order
function collectNodes(root) {
    let q = [];
    if (root === null) return q;

    let temp = [root];
    while (temp.length > 0) {
        let node = temp.shift();
        q.push(node);
        if (node.left) temp.push(node.left);
        if (node.right) temp.push(node.right);
    }
    return q;
}

// Step 2: Heapify Down (build max-heap)
function heapifyDown(q, n, i) {
    let largest = i;
    let left = 2 * i + 1;
    let right = 2 * i + 2;

    if (left < n && q[left].data > q[largest].data) {
        largest = left;
    }
    if (right < n && q[right].data > q[largest].data) {
        largest = right;
    }

    if (largest !== i) {
        [q[i], q[largest]] = [q[largest], q[i]];
        heapifyDown(q, n, largest);
    }
}

function heapify_up(q, i) {
    while (i > 0 && q[parent(i)].data < q[i].data) {
    [q[parent(i)], q[i]] = [q[i], q[parent(i)]];
    i = parent(i);
    }
    }


// Step 3: Build Max Heap from the array
function buildMaxHeap(q) {
    let n = q.length;
    for (let i = Math.floor((n - 2) / 2); i >= 0; i--) {
        heapifyDown(q, n, i);
    }

    /*
    for (let i = 1; i < q.length; i++) {
        heapify_up(q, i);
    }
        */
    
}

// Step 4: Reconnect nodes to form tree
function reconnectTree(q) {
    let n = q.length;
    for (let i = 0; i < n; i++) {
        q[i].left = (2 * i + 1 < n) ? q[2 * i + 1] : null;
        q[i].right = (2 * i + 2 < n) ? q[2 * i + 2] : null;
    }
}

// Main function to convert BST to Max Heap
function convertToMaxHeap(root) {
    let q = collectNodes(root);
    buildMaxHeap(q);
    reconnectTree(q);
    return q[0];
}







