// https://www.geeksforgeeks.org/problems/shortest-path-in-weighted-undirected-graph/1

/*

Dijkstra

O(ELogV) & O(V + E)

*/

class Solution {
  // Returns shortest path from node 1 to node n
  // If unreachable, returns [-1]
  shortestPath(n, m, edges) {
    // -------------------------------
    // Step 1: Build adjacency list
    // -------------------------------
    // Graph is undirected
    // adj[u] = [[v1, w1], [v2, w2], ...]
    const adj = Array.from({ length: n + 1 }, () => []);

    for (let [u, v, w] of edges) {
      adj[u].push([v, w]);
      adj[v].push([u, w]);
    }

    // -------------------------------
    // Step 2: Min heap for Dijkstra
    // -------------------------------
    // Each heap entry: { wt, node }
    const pq = new MinHeap();

    // dist[i] = shortest distance from node 1 to i
    const dist = new Array(n + 1).fill(1e9);

    // parent[i] = previous node in shortest path
    const parent = new Array(n + 1);

    // Initialize parent of every node to itself
    for (let i = 1; i <= n; i++) {
      parent[i] = i;
    }

    // -------------------------------
    // Step 3: Initialize source
    // -------------------------------
    dist[1] = 0;
    pq.insert({ wt: 0, node: 1 });

    // -------------------------------
    // Step 4: Dijkstra’s Algorithm
    // -------------------------------
    while (!pq.isEmpty()) {
      const { wt, node } = pq.extractMin();

      // 🔥 Optimization: skip outdated entries
      if (wt > dist[node]) continue;

      // Relax all adjacent edges
      for (let [v, w] of adj[node]) {
        if (wt + w < dist[v]) {
          dist[v] = wt + w;
          parent[v] = node; // store path
          pq.insert({ wt: dist[v], node: v });
        }
      }
    }

    // -------------------------------
    // Step 5: If destination unreachable
    // -------------------------------
    if (dist[n] === 1e9) return [-1];

    // -------------------------------
    // Step 6: Reconstruct path
    // -------------------------------
    let path = [];
    let node = n;

    // Trace back using parent[]
    while (parent[node] !== node) {
      path.push(node);
      node = parent[node];
    }

    path.push(1); // source node

    // Return distance + path
    return [dist[n], ...path.reverse()];
  }
}
