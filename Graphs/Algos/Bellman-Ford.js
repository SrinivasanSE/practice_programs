// https://www.geeksforgeeks.org/dsa/bellman-ford-algorithm-dp-23/

/*

What problem Bellman–Ford solves ?

Bellman–Ford finds the shortest distance from a source to all vertices, even when edge weights are negative.

Key properties:

Works with negative weights

Can detect negative cycles

Slower than Dijkstra, but more powerful.

-------------------------------------------

Why Bellman–Ford works ?

Instead of “finalizing” nodes like Dijkstra, Bellman–Ford:

Relaxes every edge

Repeats this process multiple times

Allows distances to keep decreasing until they stabilize

-------------------------------------------

Why V − 1 in Bellman–Ford?

In a graph with V vertices, the longest possible shortest path (without cycles) has at most V − 1 edges.

A shortest path between two vertices can have at most (V - 1) edges. It is not possible to have a simple path with more than (V - 1) edges (otherwise it would form a cycle). 
Therefore, repeating the relaxation process (V - 1) times ensures that all possible paths between source and any other node have been covered.

-------------------------------------------

Observation 2: Negative cycle detection

If after V - 1 relaxations:

You can still relax any edge

Then a negative cycle exists

Because:

Distance keeps decreasing forever

No well-defined shortest path exists


*/

// O(V*E) & O(V)

class Solution {
  bellmanFord(V, edges, src) {
    // dist[i] = shortest distance from src to node i
    // Initialize all distances as "infinity"
    const dist = new Array(V).fill(1e8);

    // Distance to source is 0
    dist[src] = 0;

    // We relax all edges V times
    // First (V - 1) iterations → find shortest paths
    // V-th iteration → detect negative cycle
    for (let i = 0; i < V; i++) {
      // Try relaxing every edge
      for (let [u, v, w] of edges) {
        // If u is reachable
        if (dist[u] !== 1e8 && dist[u] + w < dist[v]) {
          // If relaxation happens on V-th iteration,
          // it means distances can still decrease
          // → negative cycle exists
          if (i === V - 1) {
            return [-1];
          }

          // Update distance of v
          dist[v] = dist[u] + w;
        }
      }
    }

    // If no negative cycle, return shortest distances
    return dist;
  }
}
