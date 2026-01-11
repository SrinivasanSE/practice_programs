// https://www.geeksforgeeks.org/problems/topological-sort/1

/*

Topological sorting for Directed Acyclic Graph (DAG) is a linear ordering of vertices such that for every directed edge u -> v, vertex u comes before v in the ordering.

Applies only to DAGs (Directed Acyclic Graphs), and is not possible for cyclic or undirected graphs.

Why Topological Sort is not possible for graphs with undirected edges or cycles?
Undirected Graph:
Every edge u–v can be seen as both u→v and v→u, so you can’t decide which one should come first.

Cyclic Graph:
Let's say the graph contains the cycle, u→v→w→u, then you’d need u before v, v before w, and w before u — impossible to satisfy.

*/

/*

DFS

O(V + E) & O(V)

*/

class Solution {
  topoSort(V, edges) {
    // vis[i] = 1 → node i has already been visited
    const vis = new Array(V).fill(0);

    // Adjacency list representation of the directed graph
    const adj = Array.from({ length: V }, () => []);

    // Build the graph from the given edge list
    // For edge u → v, u must come before v
    for (let [u, v] of edges) {
      adj[u].push(v);
    }

    // Stack to store nodes in finishing order
    const stk = [];

    const dfs = (node) => {
      // Mark node as visited
      vis[node] = 1;

      // Visit all unvisited neighbors
      for (let nei of adj[node]) {
        if (!vis[nei]) {
          dfs(nei);
        }
      }

      // Push node after exploring all outgoing edges
      // This ensures dependencies are already in stack
      stk.push(node);
    };

    // Call DFS for all nodes (graph may be disconnected)
    for (let i = 0; i < V; i++) {
      if (!vis[i]) {
        dfs(i);
      }
    }

    // Pop elements from stack to get topological order
    const res = [];
    while (stk.length > 0) {
      res.push(stk.pop());
    }

    return res;
  }
}

/*

Key idea (Kahn’s Algorithm – BFS based)

Indegree of a node = number of incoming edges

Nodes with indegree = 0 have no dependencies

Such nodes can be safely placed first in the ordering

After removing them, new nodes may become indegree 0

When a node’s indegree becomes zero, it means all its parent nodes have been processed. 
So it has no remaining dependencies and is safe to be added to the queue and included in the topological order.

Repeat using BFS

➡ This simulates “removing” nodes layer by layer.

*/

/*

BFS (Kahn’s Algorithm)



*/

class Solution {
  topoSort(V, edges) {
    // inDegree[i] = number of incoming edges to node i
    const inDegree = new Array(V).fill(0);

    // Adjacency list representation of the graph
    const adj = Array.from({ length: V }, () => []);

    // Queue for BFS (stores nodes with inDegree = 0)
    const q = [];

    // Step 1: Build graph and compute in-degrees
    for (let [u, v] of edges) {
      adj[u].push(v); // u → v
      inDegree[v]++; // v has one more incoming edge
    }

    // Step 2: Push all nodes with inDegree = 0 into queue
    for (let i = 0; i < V; i++) {
      if (inDegree[i] == 0) q.push(i);
    }

    // Result array to store topological order
    const ans = [];

    // Step 3: BFS traversal
    while (q.length > 0) {
      const curr = q.shift(); // remove node with 0 indegree
      ans.push(curr); // add it to topo order

      // Reduce indegree of its neighbors
      for (let nei of adj[curr]) {
        inDegree[nei]--;

        // If indegree becomes 0, push into queue
        if (inDegree[nei] == 0) q.push(nei);
      }
    }

    return ans;
  }
}
