// https://www.geeksforgeeks.org/dsa/breadth-first-search-or-bfs-for-a-graph/

/*

O(V + E) & O(V)

*/

class Solution {
  bfs(adj) {
    // code here
    const v = adj.length;
    const visited = new Array(v).fill(false);
    const q = [];

    visited[0] = true;
    q.push(0);
    const res = [];

    let curr;

    while (q.length > 0) {
      curr = q.shift();
      res.push(curr);

      for (let n of adj[curr]) {
        if (!visited[n]) {
          q.push(n);
          visited[n] = true;
        }
      }
    }

    return res;
  }
}
