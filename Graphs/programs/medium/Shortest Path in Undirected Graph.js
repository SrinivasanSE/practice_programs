// https://www.geeksforgeeks.org/problems/shortest-path-in-undirected-graph-having-unit-distance/1

/*

BFS

O(V + E) & O(V + E)

*/

class Solution {
  shortestPath(V, edges, src) {
    // code here
    const dist = new Array(V).fill(-1);
    const adj = Array.from({ length: V }, () => []);
    const q = [src];

    for (let [u, v] of edges) {
      adj[u].push(v);
      adj[v].push(u);
    }

    dist[src] = 0;

    while (q.length > 0) {
      const curr = q.shift();

      for (let nei of adj[curr]) {
        if (dist[nei] == -1) {
          dist[nei] = dist[curr] + 1;
          q.push(nei);
        }
      }
    }

    return dist;
  }
}
