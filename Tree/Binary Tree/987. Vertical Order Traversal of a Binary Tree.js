// https://leetcode.com/problems/vertical-order-traversal-of-a-binary-tree/description/
// https://www.geeksforgeeks.org/dsa/vertical-order-traversal-of-binary-tree-using-map/


// Check GFG variation as well


/*

Recursion - DFS

O(nlogn) & O(n)

*/


var verticalTraversal = function(root) {
    if (root == null) return root
    let nodes = []
    const dfs = (node, row, col) => {
        if (node == null) return

        nodes.push([node.val, row, col])
        dfs(node.left, row + 1, col - 1)
        dfs(node.right, row + 1, col + 1)
    }

    dfs(root, 0, 0) // for each node, create the mappings

    nodes.sort((a, b) => {
        if (a[2] != b[2]) return a[2] - b[2] // sort by col (vertical index)
        if (a[1] != b[1]) return a[1] - b[1] // sort by row (level)
        return a[0] - b[0]                   // sort by value
    })

    let prevCol = null, res = []
    for (let [node, row, col] of nodes) {
        if (col != prevCol) { // we use prevCol to group the same cols together
            res.push([])
            prevCol = col
        }
        res[res.length - 1].push(node)
    }

    return res
};


/*

Iterative - BFS

O(nlogn) & O(n)

*/

var verticalTraversal = function(root) {
    if (root == null) return root
    let nodes = []
    
    let q = [[root, 0, 0]]

    while (q.length > 0) {
        const [node, row, col] = q.shift()

        nodes.push([node.val, row, col])

        if (node.left) {
            q.push([node.left, row + 1, col - 1])
        }
        if (node.right) {
            q.push([node.right, row + 1, col + 1])
        }
    }

    nodes.sort((a, b) => {
        if (a[2] != b[2]) return a[2] - b[2]
        if (a[1] != b[1]) return a[1] - b[1]
        return a[0] - b[0]
    })

    let prevCol = null, res = []
    for (let [node, row, col] of nodes) {
        if (col != prevCol) {
            res.push([])
            prevCol = col
        }
        res[res.length - 1].push(node)
    }

    return res
};


// slight optimised version which prevents col sorting


var verticalTraversal = function(root) {
    if (!root) return [];

    const map = new Map();  // col -> [[value, row]]
    const queue = [[root, 0, 0]]; // [node, col, row]
    let min = 0, max = 0;

    while (queue.length > 0) {
        const [node, col, row] = queue.shift();

        if (!map.has(col)) map.set(col, []);
        map.get(col).push([node.val, row]); // push only value and row (level)

        min = Math.min(min, col);
        max = Math.max(max, col);

        if (node.left) queue.push([node.left, col - 1, row + 1]);
        if (node.right) queue.push([node.right, col + 1, row + 1]);
    }

    const res = [];
    // Nlogk, total nodes = N and assuming each col has k nodes
    for (let c = min; c <= max; c++) { // use the min and max and no need to sort by col
        const arr = map.get(c);
        if (arr.length > 1) {
            arr.sort((a, b) => {
                if (a[1] !== b[1]) return a[1] - b[1];
                return a[0] - b[0];
            });
        }
        res.push(arr.map(([val]) => val));
    }

    return res;
};