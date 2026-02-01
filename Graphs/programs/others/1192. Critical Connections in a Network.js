// https://leetcode.com/problems/critical-connections-in-a-network/description/

/*

Tarjan’s Algorithm

What is a Critical Connection (Bridge)?

An edge (u, v) is a bridge if:

Removing this edge disconnects the graph (increases number of components).

In simple words:

This edge is the only path between two parts of the graph.

Core Intuition (VERY IMPORTANT)

DFS creates a DFS tree.

For every edge u → v:

Either it is a tree edge (DFS goes deeper)

Or a back edge (connects to an ancestor)

We track:

time[u] → when node u was first visited

low[u] → the earliest discovery time reachable from u

using tree edges + at most one back edge

🔑 Bridge condition

For a DFS tree edge u → v:

if (low[v] > time[u])


Then:

v (and its subtree) cannot reach u or any ancestor of u

So edge (u, v) is the only connection

Why low[child] > time[parent] Means Bridge

Child subtree cannot reach:

parent

or any ancestor of parent

No alternative path exists

Removing edge disconnects the graph

✔ That edge is a bridge

*/

/*

DFS

O(V + E) & O(V + E)

*/

var criticalConnections = function (n, connections) {
  // timer is used to assign discovery time to each node
  // it increases every time we visit a new node
  let timer = 1;

  // Adjacency list representation of the graph
  const adj = Array.from({ length: n }, () => []);

  // vis[node] = 1 means node is already visited in DFS
  const vis = new Array(n).fill(0);

  // time[node]  → discovery time of node
  // low[node]   → lowest discovery time reachable from node
  //               (including itself, children, and back edges)
  const time = new Array(n);
  const low = new Array(n);

  // Build undirected graph
  for (let [u, v] of connections) {
    adj[u].push(v);
    adj[v].push(u);
  }

  // This will store all bridges
  const bridges = [];


  const dfs = (node, parent) => {
    // Assign discovery time and low time
    time[node] = low[node] = timer;
    timer++;

    // Mark node as visited
    vis[node] = 1;

    // Explore all neighbors
    for (let nei of adj[node]) {
      // Ignore the edge going back to parent
      // (because this is not a back edge, it's the same edge)
      if (nei === parent) continue;

      // Case 1: Neighbor is NOT visited → Tree Edge
      if (vis[nei] === 0) {
        // DFS on child
        dfs(nei, node);

        // After returning from DFS,
        // update low value of current node
        low[node] = Math.min(low[node], low[nei]);

        /**
         * BRIDGE CONDITION
         * If the lowest node reachable from `nei`
         * is strictly greater than discovery time of `node`,
         * then there is NO back edge connecting nei-subtree
         * to node or its ancestors.
         *
         * Removing this edge will disconnect the graph.
         */
        if (low[nei] > time[node]) {
          bridges.push([node, nei]);
        }
      }
      // Case 2: Neighbor is already visited → Back Edge
      else {
        /**
         * Back edge found
         * We update low[node] using discovery time of neighbor
         * (NOT low[nei], because nei may be child)
         */
        low[node] = Math.min(low[node], time[nei]);
      }
    }
  };

  /**
   * Important:
   * Graph may be disconnected.
   * So we run DFS from every unvisited node.
   */
  for (let i = 0; i < n; i++) {
    if (!vis[i]) {
      dfs(i, -1);
    }
  }

  return bridges;
};


/*

What is a Back Edge?

A back edge is:

An edge that connects a node to one of its ancestors in the DFS tree (not its parent).

Important:

Back edges only appear in DFS

They indicate a cycle

They provide an alternate path back to earlier nodes.

Why Do We Update low[node] Using time[nei]?

Because:

A back edge means node can reach an ancestor

So the earliest reachable time is the ancestor’s discovery time

low[node] = min(low[node], time[ancestor])

*/

