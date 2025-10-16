// https://www.geeksforgeeks.org/inorder-predecessor-in-binary-search-tree/


/*

Brute

O(n) + O(logn) & O(n)

*/


const lowerBound = (arr, val) => {
    let l = 0, r = arr.length - 1;
    while (l <= r) {
        const mid = l + Math.floor((r - l) / 2);
        if (arr[mid] < val) {
            l = mid + 1;
        } else {
            r = mid - 1;
        }
    }
    return r;
}

class Solution {
    inOrderPredecessor(root, x) {
        let inOrder = [];
        let curr = root, prev;
        while (curr) {
            if (curr.left == null) {
                inOrder.push(curr.data);
                curr = curr.right;
            } else {
                prev = curr.left;
                while (prev.right && prev.right != curr) {
                    prev = prev.right;
                }
                if (prev.right == null) {
                    prev.right = curr;
                    curr = curr.left;
                } else {
                    prev.right = null;
                    inOrder.push(curr.data);
                    curr = curr.right;
                }
            }
        }
        const index = lowerBound(inOrder, x.data);
        return index < 0 ? -1 : inOrder[index];
    }
}


/*

Better - Morris traversal and return when we find the element greater than the given element

O(n) & O(1)

*/


class Solution {
    inOrderPredecessor(root, x) {
        let curr = root, prev;
        let result = -1;
        while (curr) {
            if (curr.left == null) {
                if (curr.data < x.data) {
                    result = curr.data;
                }
                curr = curr.right;
            } else {
                prev = curr.left;
                while (prev.right && prev.right != curr) {
                    prev = prev.right;
                }
                if (prev.right == null) {
                    prev.right = curr;
                    curr = curr.left;
                } else {
                    prev.right = null;
                    if (curr.data < x.data) {
                        result = curr.data;
                    }
                    curr = curr.right;
                }
            }
        }
        return result;
    }
}


/*

Optimal - Move the node based on the given val and store the res, if the curr.val is greater than the given val

O(h) & O(1)

*/


class Solution {
    inOrderPredecessor(root, x) {
        let curr = root, res = -1;
        while (curr) {
            if (curr.data < x.data) {
                res = curr.data;
                curr = curr.right;
            } else {
                curr = curr.left;
            }
        }
        return res;
    }
}