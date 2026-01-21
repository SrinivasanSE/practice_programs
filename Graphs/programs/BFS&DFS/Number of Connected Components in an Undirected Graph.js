// https://www.geeksforgeeks.org/problems/connected-components-in-an-undirected-graph/1#approach-1-using-depth-first-search-dfs

/*

BFS

O(V + E) & O(V + E)

*/

class Solution {
  getComponents(V, edges) {
    // code here
    const vis = new Array(V).fill(0);
    const adj = Array.from({ length: V }, () => []);

    for (let [u, v] of edges) {
      adj[u].push(v);
      adj[v].push(u);
    }

    const bfs = (node, temp) => {
      const q = [node];
      vis[node] = 1;
      while (q.length > 0) {
        const curr = q.shift();
        temp.push(curr);
        for (let nei of adj[curr]) {
          if (!vis[nei]) {
            q.push(nei);
            vis[nei] = 1;
          }
        }
      }
    };

    let connected = [],
      temp;
    for (let i = 0; i < V; i++) {
      if (!vis[i]) {
        temp = [];
        bfs(i, temp);
        connected.push(temp);
      }
    }

    return connected;
  }
}

/*

DFS

O(V + E) & O(V + E)

*/

/**
 * @param {number} V
 * @param {number[][]} edges

 * @returns {number[][]}
 */

class Solution {
  getComponents(V, edges) {
    // code here
    const vis = new Array(V).fill(0);
    const adj = Array.from({ length: V }, () => []);

    for (let [u, v] of edges) {
      adj[u].push(v);
      adj[v].push(u);
    }

    const dfs = (node, temp) => {
      temp.push(node);
      vis[node] = 1;

      for (let nei of adj[node]) {
        if (!vis[nei]) {
          dfs(nei, temp);
        }
      }
    };

    let connected = [],
      temp;
    for (let i = 0; i < V; i++) {
      if (!vis[i]) {
        temp = [];
        dfs(i, temp);
        connected.push(temp);
      }
    }

    return connected;
  }
}

/*

DSU

O(V + E) & O(V + E)

*/

class Solution {
  getComponents(V, edges) {
    // ---------------------------------------------------
    // Step 1: Create adjacency list (optional for DSU,
    // but helps to clearly represent the graph)
    // adj[i] will store all neighbors of vertex i
    // ---------------------------------------------------
    const adj = Array.from({ length: V }, () => []);

    // ---------------------------------------------------
    // Step 2: Initialize Disjoint Set (Union-Find)
    // Each node initially belongs to its own component
    // ---------------------------------------------------
    const ds = new DisJointSet(V);

    // ---------------------------------------------------
    // Step 3: Build the adjacency list from edge list
    // Since the graph is undirected:
    //   u -> v
    //   v -> u
    // ---------------------------------------------------
    for (let [u, v] of edges) {
      adj[u].push(v);
      adj[v].push(u);
    }

    // ---------------------------------------------------
    // Step 4: Union connected vertices
    // If there is an edge between i and nei,
    // they belong to the same connected component
    // ---------------------------------------------------
    for (let i = 0; i < V; i++) {
      for (let nei of adj[i]) {
        // Merge the components of i and its neighbor
        ds.unionBySize(i, nei);
      }
    }

    // ---------------------------------------------------
    // Step 5: Group vertices by their ultimate parent
    // All nodes having the same parent belong to the
    // same connected component
    // ---------------------------------------------------
    const map = new Map();

    for (let i = 0; i < V; i++) {
      // Find ultimate parent (representative) of node i
      const par = ds.findPar(i);

      // Create a new component list if parent not seen
      if (!map.has(par)) {
        map.set(par, []);
      }

      // Add node i to its component group
      map.get(par).push(i);
    }

    // ---------------------------------------------------
    // Step 6: Return all connected components
    // map.values() gives arrays of nodes in each component
    // ---------------------------------------------------
    return Array.from(map.values());
  }
}
