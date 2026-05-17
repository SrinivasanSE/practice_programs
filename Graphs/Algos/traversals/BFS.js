// https://www.geeksforgeeks.org/dsa/breadth-first-search-or-bfs-for-a-graph/

/*

O(V + E) & O(V)

*/

class Solution {
  bfs(adj) {
    // ---------------------------------------------------
    // Number of vertices in the graph
    // adj.length = total nodes
    // ---------------------------------------------------
    const v = adj.length;

    // ---------------------------------------------------
    // visited[i] = true  → node i has already been visited
    // This prevents revisiting nodes and infinite loops
    // ---------------------------------------------------
    const visited = new Array(v).fill(false);

    // ---------------------------------------------------
    // Queue for BFS traversal
    // BFS works level-by-level using a queue
    // ---------------------------------------------------
    const q = [];

    // ---------------------------------------------------
    // Start BFS from node 0
    // Mark it visited and push into the queue
    // ---------------------------------------------------
    visited[0] = true;
    q.push(0);

    // ---------------------------------------------------
    // Result array to store BFS traversal order
    // ---------------------------------------------------
    const res = [];

    let curr;

    // ---------------------------------------------------
    // BFS traversal loop
    // Continue until there are no nodes left in the queue
    // ---------------------------------------------------
    while (q.length > 0) {
      // -------------------------------------------------
      // Remove the front element of the queue
      // This ensures FIFO order (level-by-level traversal)
      // -------------------------------------------------
      curr = q.shift();

      // Add the current node to BFS result
      res.push(curr);

      // -------------------------------------------------
      // Visit all neighbors of current node
      // -------------------------------------------------
      for (let n of adj[curr]) {
        // If neighbor is not visited yet
        if (!visited[n]) {
          // Mark neighbor as visited
          visited[n] = true;

          // Push neighbor into queue for future processing
          q.push(n);
        }
      }
    }

    // ---------------------------------------------------
    // Return BFS traversal starting from node 0
    // ---------------------------------------------------
    return res;
  }
}
