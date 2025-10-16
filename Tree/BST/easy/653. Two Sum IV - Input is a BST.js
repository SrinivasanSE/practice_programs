// https://leetcode.com/problems/two-sum-iv-input-is-a-bst/description/


/*

Brute - Find inorder array which will be sorted and apply two sum logic

O(N) + O(N) & O(N)

*/



const getSortedArr = (root) => {
    const arr = []
    let curr = root, prev

    while (curr) {
        if (curr.left == null) {
            arr.push(curr.val)
            curr = curr.right
        } else {
            prev = curr.left
            while (prev.right && prev.right != curr) {
                prev = prev.right
            }

            if (prev.right == null) {
                prev.right = curr
                curr = curr.left
            } else {
                prev.right = null
                arr.push(curr.val)
                curr = curr.right
            }
        }
    }

    return arr
}
var findTarget = function(root, k) {
    const arr = getSortedArr(root)
    let l = 0, r = arr.length - 1
    let sum = 0

    while (l < r) {
        sum = arr[l] + arr[r]
        if (sum === k) {
            return true
        }

        if (sum < k) {
            l++
        } else {
            r--
        }
    }

    return false
};


/*

Better

O(n) & O(n)

*/


var findTarget = function(root, k) {
    const seen = new Set()

    const dfs = (root) => {
        if (root == null) return false

        if (seen.has(k - root.val)) return true

        seen.add(root.val)

        return dfs(root.left) || dfs(root.right)

    }

    return dfs(root)
};



/*

Optimal - Similar to 173 program, applying both next and before logic which produces elements in descending order

O(n) & O(h)


*/


class BSTIterator {
    constructor (root, isReverse) {
        this.stack = []
        this.isReverse = isReverse
        this.pushNodes(root)
    }

    pushNodes(node) {
        while (node) {
            this.stack.push(node)
            if (this.isReverse) {
                node = node.right
            } else {
                node = node.left
            }
        }
    }

    next() {
        const node = this.stack.pop()
        if (this.isReverse) {
            this.pushNodes(node.left)
        } else {
            this.pushNodes(node.right)
        }

        return node.val
    }
}

var findTarget = function(root, k) {
    if (root == null) return false

    const left = new BSTIterator(root, false) // this will return the elements in asc order
    const right = new BSTIterator(root, true) // this will return the elements in desc order

    let l = left.next(), r = right.next()
    let sum = 0

    while (l < r) {
        sum = l + r
        if (sum === k) {
            return true
        }

        if (sum < k) {
            l = left.next()
        } else {
            r = right.next()
        }
    }

    return false
};
