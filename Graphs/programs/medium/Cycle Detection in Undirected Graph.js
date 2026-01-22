// https://www.geeksforgeeks.org/problems/detect-cycle-in-an-undirected-graph/1

/*

BFS

O(V + E) & O(V + E)

*/

class Solution {
  isCycle(V, edges) {
    // Step 1: Build adjacency list
    const adj = Array.from({ length: V }, () => []);
    for (let [u, v] of edges) {
      adj[u].push(v);
      adj[v].push(u); // undirected graph
    }

    // Step 2: Visited array to track visited nodes
    const vis = new Array(V).fill(false);

    // Step 3: BFS function to detect cycle in one component
    const bfs = (start) => {
      const q = [];

      // Push starting node with parent = -1
      q.push([start, -1]);
      vis[start] = true;

      while (q.length > 0) {
        const [node, parent] = q.shift();

        // Traverse all neighbors
        for (let nei of adj[node]) {
          // Case 1: Neighbor not visited → normal BFS
          if (!vis[nei]) {
            vis[nei] = true;
            q.push([nei, node]);
          }

          // Case 2: Neighbor visited AND not parent → cycle
          else if (nei !== parent) {
            return true;
          }
        }
      }

      return false; // no cycle in this component
    };

    // Step 4: Graph may be disconnected
    // Run BFS from every unvisited node
    for (let i = 0; i < V; i++) {
      if (!vis[i]) {
        if (bfs(i)) return true;
      }
    }

    // No cycle found in any component
    return false;
  }
}

/*

DFS

O(V + E) & O(V + E)

*/

const detectCycle = (node, parent, vis, adj) => {
  // Mark the current node as visited
  vis[node] = true;

  // Explore all adjacent vertices
  for (let n of adj[node]) {
    // Case 1: If neighbor is NOT visited,
    // continue DFS deeper
    if (!vis[n]) {
      // Pass current node as parent
      if (detectCycle(n, node, vis, adj) == true) {
        return true; // cycle found in DFS subtree
      }
    }

    // Case 2: If neighbor is visited AND
    // neighbor is NOT the parent,
    // then a cycle exists
    else if (parent != n) {
      return true;
    }
  }

  // No cycle found from this path
  return false;
};

class Solution {
  isCycle(V, edges) {
    // Create adjacency list
    const adj = Array.from({ length: V }, () => []);

    // Visited array
    const vis = new Array(V).fill(false);

    // Build the undirected graph
    for (let [u, v] of edges) {
      adj[u].push(v);
      adj[v].push(u);
    }

    // Graph may be disconnected
    // So we check every component
    for (let i = 0; i < V; i++) {
      if (!vis[i]) {
        // Start DFS from unvisited node
        if (detectCycle(i, -1, vis, adj) == true) {
          return true; // cycle found
        }
      }
    }

    // No cycle found in any component
    return false;
  }
}
