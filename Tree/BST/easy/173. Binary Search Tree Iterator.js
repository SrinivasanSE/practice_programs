// https://leetcode.com/problems/binary-search-tree-iterator/description/


/*

O(1) & O(h), for N calls, we push N total nodes, so it's O(N/N) ~= O(1)

*/


var BSTIterator = function (root) {
    this.stack = []
    addNodes(root, this.stack) // add all the nodes in the left first
};

const addNodes = (node, stack) => {
    while (node) {
        stack.push(node)
        node = node.left
    }
}

BSTIterator.prototype.next = function () {
    const next = this.stack.pop()
    addNodes(next.right, this.stack) // push all the left nodes from the popped node's right
    return next.val
};


BSTIterator.prototype.hasNext = function () {
    return this.stack.length > 0
};