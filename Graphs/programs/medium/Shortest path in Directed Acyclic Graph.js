// https://www.geeksforgeeks.org/problems/shortest-path-in-undirected-graph/1

/*

BFS

*/

class Solution {
  shortestPath(V, E, edges) {
    // code here.
    const dist = new Array(V).fill(1e9);
    const adj = Array.from({ length: V }, () => []);

    for (let [u, v, w] of edges) {
      adj[u].push([v, w]);
    }

    const q = [0];
    dist[0] = 0;

    while (q.length > 0) {
      const curr = q.shift();

      for (let [nei, w] of adj[curr]) {
        if (dist[curr] + w < dist[nei]) {
          dist[nei] = dist[curr] + w;
          q.push(nei);
        }
      }
    }

    for (let i = 0; i < V; i++) {
      if (dist[i] == 1e9) dist[i] = -1;
    }

    return dist;
  }
}
