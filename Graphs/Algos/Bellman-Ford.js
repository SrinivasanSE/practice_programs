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
    // A large number used to represent "infinity"
    // Means the node is currently unreachable from src
    const INF = 1e8;

    // dist[i] = shortest distance from src to node i
    // Initialize all distances as infinity
    const dist = new Array(V).fill(INF);

    // Distance from source to itself is always 0
    dist[src] = 0;

    /*
      Bellman–Ford main loop

      Key facts:
      - The shortest path between two nodes can have at most (V - 1) edges
      - If we can still relax an edge on the V-th iteration,
        then a negative cycle exists

      We run the loop V times:
      - First (V - 1) iterations → compute shortest paths
      - V-th iteration → detect negative cycle
    */
    for (let i = 0; i < V; i++) {
      // Flag to check whether any distance got updated
      // in this iteration
      let relaxed = false;

      // Try relaxing all edges
      for (let [u, v, w] of edges) {
        /*
          Relaxation condition:
          1. Node u must be reachable from src
          2. Path through u gives a shorter distance to v
        */
        if (dist[u] !== INF && dist[u] + w < dist[v]) {
          // Update the shortest distance to node v
          dist[v] = dist[u] + w;

          // Mark that at least one relaxation happened
          relaxed = true;

          /*
            If relaxation happens on the V-th iteration,
            it means distances can still be reduced even
            after V - 1 relaxations.

            This is only possible if there is a
            NEGATIVE WEIGHT CYCLE reachable from src.
          */
          if (i === V - 1) return [-1];
        }
      }

      /*
        Optimization: Early stopping

        If no edge was relaxed in this iteration,
        it means:
        - All shortest distances are finalized
        - Further iterations will not change anything
      */
      if (!relaxed) break;
    }

    // No negative cycle detected
    // Return shortest distances from src
    return dist;
  }
}
