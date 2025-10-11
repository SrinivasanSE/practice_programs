function findDepth(root, target, depth = 0) {
    if (root === null) return -1;  // not found
    if (root.val === target) return depth;

    // Search in left subtree
    const leftDepth = findDepth(root.left, target, depth + 1);
    if (leftDepth !== -1) return leftDepth;

    // Search in right subtree
    return findDepth(root.right, target, depth + 1);
}



function findDepthBFS(root, target) {
    if (!root) return -1;

    const queue = [[root, 0]]; // [node, depth]

    while (queue.length > 0) {
        const [node, depth] = queue.shift();

        if (node.val === target) return depth;

        if (node.left) queue.push([node.left, depth + 1]);
        if (node.right) queue.push([node.right, depth + 1]);
    }

    return -1; // not found
}
