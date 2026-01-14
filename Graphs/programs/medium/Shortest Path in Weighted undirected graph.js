// https://www.geeksforgeeks.org/problems/shortest-path-in-weighted-undirected-graph/1

class Solution {
  shortestPath(n, m, edges) {
    // code here
    const adj = Array.from({ length: n + 1 }, () => []);
    for (let [u, v, w] of edges) {
      adj[u].push([v, w]);
      adj[v].push([u, w]);
    }

    const q = new MinHeap();
    const dist = new Array(n + 1).fill(1e9);
    const parent = new Array(n + 1);

    for (let i = 0; i <= n; i++) {
      parent[i] = i;
    }
    q.insert({ wt: 0, node: 1 });
    dist[1] = 0;

    while (!q.isEmpty()) {
      const { wt, node } = q.extractMin();
      for (let nei of adj[node]) {
        const [v, w] = nei;
        if (wt + w < dist[v]) {
          dist[v] = wt + w;
          q.insert({ wt: dist[v], node: v });
          parent[v] = node;
        }
      }
    }
    if (dist[n] === 1e9) return [-1];
    let path = [];
    let node = n;
    while (parent[node] != node) {
      path.push(node);
      node = parent[node];
    }
    path.push(1);
    return [dist[n], ...path.reverse()];
  }
}
