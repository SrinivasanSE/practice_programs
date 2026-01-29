// https://www.geeksforgeeks.org/problems/shortest-path-in-undirected-graph-having-unit-distance/1

/*

BFS

O(V + E) & O(V + E)

*/

class Solution {
  shortestPath(V, edges, src) {
    // ----------------------------------------------------
    // dist[i] = shortest distance from src to node i
    // -1 means node i has NOT been visited yet
    // ----------------------------------------------------
    const dist = new Array(V).fill(-1);

    // ----------------------------------------------------
    // Build adjacency list
    // adj[u] contains all neighbors of u
    // ----------------------------------------------------
    const adj = Array.from({ length: V }, () => []);

    // ----------------------------------------------------
    // BFS queue
    // ----------------------------------------------------
    const q = [src];

    // ----------------------------------------------------
    // Convert edge list into adjacency list
    // Since graph is UNDIRECTED:
    // u <-> v (add both directions)
    // ----------------------------------------------------
    for (let [u, v] of edges) {
      adj[u].push(v);
      adj[v].push(u);
    }

    // ----------------------------------------------------
    // Distance of source node from itself is 0
    // This also implicitly marks src as visited
    // ----------------------------------------------------
    dist[src] = 0;

    // ----------------------------------------------------
    // Standard BFS traversal
    // ----------------------------------------------------
    while (q.length > 0) {

      // Remove front element of queue
      const curr = q.shift();

      // Explore all neighbors of current node
      for (let nei of adj[curr]) {

        // If neighbor is NOT visited yet
        if (dist[nei] === -1) {

          // Distance of neighbor = distance of current + 1
          dist[nei] = dist[curr] + 1;

          // Push neighbor into queue for further exploration
          q.push(nei);
        }
      }
    }

    // ----------------------------------------------------
    // dist array now contains:
    // - shortest distance from src to each node
    // - -1 if node is unreachable
    // ----------------------------------------------------
    return dist;
  }
}

