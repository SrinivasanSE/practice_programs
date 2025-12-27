// https://www.geeksforgeeks.org/inorder-successor-in-binary-search-tree/

/*

Brute

O(n) + O(logn) & O(n)

*/

// Find the inorder array and using binary search, find the number greater than the given val

const upperBound = (arr, val) => {
  let l = 0,
    r = arr.length - 1;
  while (l <= r) {
    const mid = l + Math.floor((r - l) / 2);

    if (arr[mid] > val) {
      r = mid - 1;
    } else {
      l = mid + 1;
    }
  }

  return l;
};

class Solution {
  inOrderSuccessor(root, x) {
    // code here
    let inOrder = [];
    let curr = root,
      prev;

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

    const index = upperBound(inOrder, x.data);
    return index >= inOrder.length ? -1 : inOrder[index];
  }
}

/*

Better - Morris traversal and return when we find the element greater than the given element

O(n) & O(1)

*/

class Solution {
  inOrderSuccessor(root, x) {
    // code here
    let curr = root,
      prev;

    while (curr) {
      if (curr.left == null) {
        if (curr.data > x.data) {
          return curr.data;
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
          if (curr.data > x.data) {
            return curr.data;
          }
          curr = curr.right;
        }
      }
    }

    return -1;
  }
}

/*

Optimal - Move the node based on the given val and store the res, if the curr.val is greater than the given val

O(h) & O(1)

*/

class Solution {
  inOrderSuccessor(root, x) {
    let curr = root,
      res = -1;

    while (curr) {
      if (curr.data <= x.data) {
        curr = curr.right;
      } else {
        res = curr.data;
        curr = curr.left;
      }
    }

    return res;
  }
}
