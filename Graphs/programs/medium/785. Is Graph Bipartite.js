// https://leetcode.com/problems/is-graph-bipartite/description/

/*

BFS

O(V + E) & O(V)

*/

/*

A graph is bipartite if:

We can divide all nodes into two groups (colors) such that
no two adjacent nodes have the same color.

*/

const isCheck = (node, color, graph) => {
  // Queue for BFS traversal
  const q = [];

  // Start BFS from the given node
  q.push(node);

  // Assign the first color (0) to the starting node
  color[node] = 0;

  // Standard BFS loop
  while (q.length > 0) {
    // Get the current node
    const curr = q.shift();

    // Traverse all adjacent nodes
    for (let nei of graph[curr]) {
      // Case 1: Neighbor is uncolored
      if (color[nei] == -1) {
        // Assign opposite color to neighbor
        // If curr is 0 → neighbor becomes 1
        // If curr is 1 → neighbor becomes 0
        color[nei] = 1 - color[curr];

        // Push neighbor to queue for further BFS
        q.push(nei);
      }
      // Case 2: Neighbor already colored
      // If neighbor has same color as current node,
      // bipartite condition is violated
      else if (color[nei] == color[curr]) {
        return false;
      }
    }
  }

  // If BFS finishes without conflicts,
  // this component is bipartite
  return true;
};

var isBipartite = function (graph) {
  // Number of vertices
  const v = graph.length;

  // Color array initialized to -1 (unvisited / uncolored)
  const color = new Array(v).fill(-1);

  // Loop through all vertices (important for disconnected graphs)
  for (let i = 0; i < v; i++) {
    // If vertex is not colored yet,
    // it means we found a new connected component
    if (color[i] == -1) {
      // Check if this component is bipartite
      if (isCheck(i, color, graph) == false) return false;
    }
  }

  // All components are bipartite
  return true;
};

/*

DFS

O(V + E) & O(V)

*/

const _isCheck = (node, color, graph, currColor) => {
  // Assign the current color to this node
  color[node] = currColor;

  // Visit all neighbors of the current node
  for (let nei of graph[node]) {
    // Case 1: Neighbor has not been colored yet
    if (color[nei] == -1) {
      // Recursively color the neighbor with opposite color
      if (_isCheck(nei, color, graph, 1 - currColor) == false) return false;
    }
    // Case 2: Neighbor already colored with same color
    // This violates bipartite property
    else if (color[nei] == currColor) {
      return false;
    }
  }

  // No conflicts found in this DFS path
  return true;
};

var isBipartite = function (graph) {
  // Number of vertices
  const v = graph.length;

  // Initialize all vertices as uncolored
  const color = new Array(v).fill(-1);

  // Loop through all vertices (handles disconnected graphs)
  for (let i = 0; i < v; i++) {
    // If vertex is uncolored, it starts a new component
    if (color[i] == -1) {
      // Start DFS with color 0
      if (_isCheck(i, color, graph, 0) == false) return false;
    }
  }

  // All components are bipartite
  return true;
};
