// https://www.geeksforgeeks.org/problems/shortest-path-in-undirected-graph/1

/*

BFS

O(V + E) & O(V + E)

*/

class Solution {
  shortestPath(V, edges) {
    // ---------------------------------------
    // STEP 1: BUILD GRAPH
    // ---------------------------------------
    const adj = Array.from({ length: V }, () => []);
    const inDegree = new Array(V).fill(0);

    // edges: [u, v, weight]
    for (let [u, v, wt] of edges) {
      adj[u].push([v, wt]);
      inDegree[v]++;
    }

    // ---------------------------------------
    // STEP 2: TOPOLOGICAL SORT (BFS / KAHN)
    // ---------------------------------------
    const q = [];

    // Push nodes with indegree 0
    for (let i = 0; i < V; i++) {
      if (inDegree[i] === 0) {
        q.push(i);
      }
    }

    const topo = [];

    while (q.length > 0) {
      const node = q.shift();
      topo.push(node);

      for (let [nei] of adj[node]) {
        inDegree[nei]--;
        if (inDegree[nei] === 0) {
          q.push(nei);
        }
      }
    }

    // ---------------------------------------
    // STEP 3: SHORTEST PATH RELAXATION
    // ---------------------------------------
    const dist = new Array(V).fill(Infinity);
    dist[0] = 0; // source

    for (let u of topo) {
      if (dist[u] !== Infinity) {
        for (let [v, wt] of adj[u]) {
          if (dist[u] + wt < dist[v]) {
            dist[v] = dist[u] + wt;
          }
        }
      }
    }

    // ---------------------------------------
    // STEP 4: HANDLE UNREACHABLE NODES
    // ---------------------------------------
    for (let i = 0; i < V; i++) {
      if (dist[i] === Infinity) dist[i] = -1;
    }

    return dist;
  }
}


/*

Bellman ford algo - Not efficient

O(V*E) & O(V)

*/


class Solution {
    shortestPath(n, m, edges) {
        // -----------------------------------------
        // STEP 1: Distance initialization
        // -----------------------------------------
        // dist[i] = shortest distance from source (0) to node i
        const dist = new Array(n).fill(Infinity);

        // Distance from source to itself is always 0
        dist[0] = 0;

        // -----------------------------------------
        // STEP 2: Relax all edges (n - 1) times
        // -----------------------------------------
        // Why (n - 1)?
        // In the worst case, the longest simple path
        // can have at most (n - 1) edges.
        for (let i = 0; i < n - 1; i++) {

            // Try to relax every edge
            for (let [src, dest, weight] of edges) {

                // If source is reachable AND
                // going through src gives a shorter path to dest
                if (
                    dist[src] !== Infinity &&
                    dist[src] + weight < dist[dest]
                ) {
                    dist[dest] = dist[src] + weight;
                }
            }
        }

        // -----------------------------------------
        // STEP 3: Convert unreachable nodes to -1
        // -----------------------------------------
        for (let i = 0; i < n; i++) {
            if (dist[i] === Infinity) {
                dist[i] = -1;
            }
        }

        return dist;
    }
}
