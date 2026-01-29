// https://leetcode.com/problems/find-eventual-safe-states/description/

/*

A node is called eventually safe if:

Starting from that node, every possible path leads to a terminal node (no outgoing edges) and NEVER enters a cycle.

So the real problem becomes:

Can I detect whether a node can reach a cycle?

Key observation:

If a node reaches a cycle, it is NOT safe

If all paths from a node end safely, it IS safe

This is a cycle detection problem in a directed graph.

*/

/*

DFS - Cycle detection

O(V + E) & O(V)

*/

var eventualSafeNodes = function (graph) {
    const v = graph.length;

    // state[i]:
    // 0 → unvisited
    // 1 → visiting (in current DFS stack)
    // 2 → safe node (fully processed)
    const state = new Array(v).fill(0);

    const res = [];

    // DFS returns:
    // true  → node is safe
    // false → node leads to a cycle
    const dfs = (node) => {

        // If already visited:
        // state == 2 → safe
        // state == 1 → cycle detected
        if (state[node] != 0) return state[node] == 2;

        // Mark node as being visited
        state[node] = 1;

        // Explore all neighbors
        for (let nei of graph[node]) {
            // If any neighbor leads to a cycle → current node unsafe
            if (!dfs(nei)) return false;
        }

        // All neighbors are safe → mark node safe
        state[node] = 2;
        return true;
    };

    // Check safety of each node
    for (let i = 0; i < v; i++) {
        if (dfs(i)) res.push(i);
    }

    return res;
};


/*

BFS - Topo sort

O(V + E + V log V) & O(V + E)

*/


/*

Reverse the graph

Original edge: u → v

Reversed edge: v → u

Now:

Terminal nodes become sources (indegree = 0)

Nodes that can reach terminal nodes will eventually get indegree = 0

🧩 Why Topological Sort Works Here
In the reversed graph:

Nodes with indegree = 0 are safe

Removing a safe node may create new safe nodes

This is exactly Kahn’s Algorithm (BFS Topological Sort)

| Node Type                        | Behavior                     |
| -------------------------------- | ---------------------------- |
| Terminal nodes                   | Start with indegree 0 → safe |
| Nodes leading only to safe nodes | Become indegree 0 → safe     |
| Cycle nodes                      | Never reach indegree 0       |
| Nodes leading to cycles          | Never reach indegree 0       |


*/


var eventualSafeNodes = function (graph) {
    const v = graph.length;

    // Reverse adjacency list
    const adjRev = Array.from({ length: v }, () => []);

    // inDegree[i] = number of outgoing edges from i (original graph)
    const inDegree = new Array(v).fill(0);

    // Build reverse graph + compute indegrees
    for (let i = 0; i < v; i++) {
        for (let nei of graph[i]) {
            adjRev[nei].push(i); // reverse edge
            inDegree[i]++;       // count outgoing edges
        }
    }

    const res = [];
    const q = [];

    // Nodes with no outgoing edges are terminal → safe
    for (let i = 0; i < v; i++) {
        if (inDegree[i] === 0) q.push(i);
    }

    // BFS (Kahn’s Algorithm)
    while (q.length > 0) {
        const curr = q.shift();
        res.push(curr);

        // Remove edges pointing to curr
        for (let nei of adjRev[curr]) {
            inDegree[nei]--;

            // If no more outgoing edges → safe
            if (inDegree[nei] === 0) {
                q.push(nei);
            }
        }
    }

    // Required sorted output
    res.sort((a, b) => a - b);
    return res;
};
