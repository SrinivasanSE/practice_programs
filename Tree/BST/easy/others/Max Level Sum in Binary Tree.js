// https://www.geeksforgeeks.org/find-level-maximum-sum-binary-tree/

/*

Iterative - Level order traversal

O(n) & O(n)

*/

class Solution {
  maxLevelSum(root) {
    //code here
    let sum = -Infinity;

    let q = [root];

    while (q.length > 0) {
      let len = q.length;
      let temp = 0;
      for (let i = 0; i < len; i++) {
        let curr = q.shift();
        temp += curr.data;
        if (curr.left) q.push(curr.left);
        if (curr.right) q.push(curr.right);
      }

      sum = Math.max(sum, temp); // find the max sum in each level
    }

    return sum;
  }
}

/*

Recursion

O(n) & O(n)

*/

class Solution {
  dfs(node, mm, level) {
    if (node == null) {
      return;
    }

    mm[level] = (mm[level] || 0) + node.data; // add the nodes in each level and store in hashmap.

    this.dfs(node.left, mm, level + 1);

    this.dfs(node.right, mm, level + 1);
  }
  maxLevelSum(root) {
    //code here
    if (root == null) {
      return 0;
    }

    const mm = {};

    this.dfs(root, mm, 0);

    let res = Number.MIN_SAFE_INTEGER;

    for (let val of Object.values(mm)) { // find the max value from the hashmap
      res = Math.max(res, val);
    }

    return res;
  }
}
