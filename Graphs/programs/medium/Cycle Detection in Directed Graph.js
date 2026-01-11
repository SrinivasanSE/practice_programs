// https://www.geeksforgeeks.org/problems/detect-cycle-in-a-directed-graph/1

/*

A cycle exists if during DFS:

we reach a node that is already in the current DFS path

BFS is not possible because it does not maintain recursion path information.

*/

/*

DFS

O(V + E) & O(V)

*/

class Solution {
  isCyclic(V, edges) {
    // Adjacency list representation of the graph
    const adj = Array.from({ length: V }, () => []);

    // vis[i] = 1 → node i has been visited before
    const vis = new Array(V).fill(0);

    // pathVis[i] = 1 → node i is in current DFS recursion path
    const pathVis = new Array(V).fill(0);

    const dfs = (node) => {
      // Mark node as visited
      vis[node] = 1;

      // Mark node as part of current DFS path
      pathVis[node] = 1;

      // Explore all neighbors
      for (let nei of adj[node]) {
        // Case 1: Neighbor not visited → DFS deeper
        if (!vis[nei]) {
          if (dfs(nei) == true) return true;
        }

        // Case 2: Neighbor is already in the current path
        // This indicates a back edge → cycle detected
        else if (pathVis[nei]) {
          return true;
        }
      }

      // Backtrack: remove node from current path
      pathVis[node] = 0;

      // No cycle found in this path
      return false;
    };

    // Build adjacency list from edge list
    for (let [u, v] of edges) {
      adj[u].push(v); // directed edge u → v
    }

    // Check each component (graph may be disconnected)
    for (let i = 0; i < V; i++) {
      if (!vis[i]) {
        if (dfs(i) == true) return true;
      }
    }

    // No cycle found in any component
    return false;
  }
}

/*

DFS - Using one vis arr itself

O(V + E) & O(V)

*/

class Solution {
  isCyclic(V, edges) {
    // ----------------------------------------
    // Build adjacency list for directed graph
    // adj[u] contains all nodes v such that u → v
    // ----------------------------------------
    const adj = Array.from({ length: V }, () => []);

    // ----------------------------------------
    // vis states:
    // 0 → unvisited
    // 1 → currently visiting (in DFS recursion stack)
    // 2 → fully processed (DFS completed, safe node)
    // ----------------------------------------
    const vis = new Array(V).fill(0);

    // DFS function returns:
    // true  → cycle detected
    // false → no cycle in this path
    const dfs = (node) => {
      // ----------------------------------------
      // If node is already in the current DFS path
      // → back edge found → cycle exists
      // ----------------------------------------
      if (vis[node] == 1) return true;

      // ----------------------------------------
      // If node is already fully processed
      // → this node is already verified as safe
      // → no need to explore again
      // ----------------------------------------
      if (vis[node] == 2) return false;

      // Mark node as currently visiting
      vis[node] = 1;

      // Explore all outgoing edges
      for (let nei of adj[node]) {
        if (dfs(nei)) return true;
      }

      // ----------------------------------------
      // All neighbors explored without cycle
      // Mark node as fully processed
      // ----------------------------------------
      vis[node] = 2;

      return false;
    };

    // Build graph from edge list
    for (let [u, v] of edges) {
      adj[u].push(v);
    }

    // Run DFS for all nodes (graph may be disconnected)
    for (let i = 0; i < V; i++) {
      if (dfs(i)) return true;
    }

    return false;
  }
}

/*

BFS - Topo sort algo

O(V + E) & O(V)

*/

/*

Core Intuition (Very Important)

In a Directed Acyclic Graph (DAG):

There is always at least one node with indegree = 0

Kahn’s algorithm can process all nodes

In a Directed Cyclic Graph:

Nodes in the cycle never get indegree = 0

BFS stops early

visited < V

👉 That’s why visited != V means a cycle exists

*/

class Solution {
  isCyclic(V, edges) {
    // -------------------------------
    // STEP 1: Build adjacency list and indegree array
    // -------------------------------

    // adj[u] will store all nodes v such that there is a directed edge u -> v
    const adj = Array.from({ length: V }, () => []);

    // inDegree[v] = number of incoming edges to node v
    const inDegree = new Array(V).fill(0);

    // Fill adjacency list and indegree array
    for (let [u, v] of edges) {
      adj[u].push(v); // u -> v edge
      inDegree[v]++; // v has one more incoming edge
    }

    // -------------------------------
    // STEP 2: Initialize queue with all nodes having indegree 0
    // -------------------------------

    // Queue will store nodes that have no remaining dependencies
    const q = [];

    // Nodes with indegree 0 can be processed first
    for (let i = 0; i < V; i++) {
      if (inDegree[i] == 0) {
        q.push(i);
      }
    }

    // -------------------------------
    // STEP 3: BFS (Kahn’s Algorithm)
    // -------------------------------

    // Count of how many nodes we are able to process
    let visited = 0;

    while (q.length > 0) {
      // Take a node whose dependencies are fully resolved
      const curr = q.shift();
      visited++; // we use this instead of pushing to ans arr as in topo sort

      // Reduce indegree of its neighbors
      for (let nei of adj[curr]) {
        inDegree[nei]--;

        // If neighbor now has no incoming edges,
        // it is ready to be processed
        if (inDegree[nei] == 0) {
          q.push(nei);
        }
      }
    }

    // -------------------------------
    // STEP 4: Detect cycle
    // -------------------------------

    // If we couldn't visit all V nodes,
    // some nodes are part of a cycle
    return visited != V;
  }
}
