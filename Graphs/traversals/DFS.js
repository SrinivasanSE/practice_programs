// https://www.geeksforgeeks.org/problems/depth-first-traversal-for-a-graph/1

class Solution {
  dfs(adj) {
    // code here
    const v = adj.length;
    const visited = new Array(v).fill(false);
    const res = [];

    const traverse = (node) => {
      res.push(node);
      visited[node] = true;

      for (let n of adj[node]) {
        if (!visited[n]) {
          traverse(n);
        }
      }
    };

    traverse(0);

    return res;
  }
}
