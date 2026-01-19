// https://www.geeksforgeeks.org/problems/strongly-connected-components-kosarajus-algo/1
// https://www.youtube.com/watch?v=RpgcYiky7uw

/*

Kosaraju’s algorithm is based on one key observation:

If you collapse each SCC into a single node, the graph becomes a DAG (Directed Acyclic Graph).

Now the idea is:

Order nodes by finish time (DFS)

Reverse all edges

Process nodes in decreasing finish time

Each DFS in the reversed graph gives one SCC

------------------------------------------

🔍 Why reversing edges works

In the original graph, SCCs may have outgoing edges

After reversing, those outgoing edges become incoming

So when we start DFS from the node with the latest finish time, we are trapped inside its SCC

We can’t escape to another SCC → perfect isolation

------------------------------------------

🪜 Algorithm Steps (High Level)
Step 1: DFS and store nodes by finish time

Run DFS on original graph

Push node to stack after DFS completes

Step 2: Reverse the graph

Reverse every edge u → v to v → u

Step 3: DFS in stack order

Pop nodes from stack

DFS on reversed graph

Each DFS gives one SCC

*/

/*

DFS

O(V + E) & O(V + E)

*/

class Solution {
  kosaraju(adj) {
    /*
        ============================
        KOSARAJU'S ALGORITHM OVERVIEW
        ============================

        GOAL:
        -----
        Find Strongly Connected Components (SCCs) in a directed graph.

        IDEA (high level):
        ------------------
        1️⃣ Do a DFS and push nodes to a stack based on FINISH TIME
        2️⃣ Reverse the graph
        3️⃣ Pop nodes from stack and DFS on reversed graph to extract SCCs

        WHY this works:
        ---------------
        - Finish time ordering ensures we always start DFS from an SCC
          that has NO PATH to any other SCC in the reversed graph.
        - This prevents SCCs from getting mixed together.
        */

    const V = adj.length;

    // visited array reused for both DFS passes
    const vis = new Array(V).fill(0);

    // Stack to store nodes in increasing order of finish time
    // (top of stack = highest finish time)
    const stack = [];

    // Reversed adjacency list
    const adjR = Array.from({ length: V }, () => []);

    // To store SCCs (optional, useful for understanding)
    const components = [];

    /*
        ==================================================
        STEP 1: DFS TO COMPUTE FINISH TIME ORDER (STACK)
        ==================================================

        Key Rule of DFS:
        ----------------
        A node finishes ONLY AFTER all nodes reachable from it finish.

        Therefore:
        If A → B (A can reach B),
        then finish(A) > finish(B)

        Consequence:
        ------------
        In SCC graph (which is a DAG),
        SCCs that have outgoing edges finish later.

        Result:
        -------
        The SCC that finishes LAST is a "SINK SCC"
        (no outgoing edges to other SCCs).
        */

    const dfs = (node) => {
      vis[node] = 1;

      for (let nei of adj[node]) {
        if (!vis[nei]) {
          dfs(nei);
        }
      }

      /*
            IMPORTANT:
            ----------
            We push AFTER exploring all neighbors.
            This guarantees correct finish time ordering.

            Stack top will contain node with MAX finish time.
            */
      stack.push(node);
    };

    // Run DFS from every unvisited node
    // Ensures disconnected parts are covered
    for (let i = 0; i < V; i++) {
      if (!vis[i]) {
        dfs(i);
      }
    }

    /*
        ==================================
        STEP 2: REVERSE THE GRAPH
        ==================================

        Why reverse?
        ------------
        Original SCC graph is a DAG.
        When reversed:
        - Sink SCCs become SOURCE SCCs
        - Source SCCs have no incoming edges

        This is crucial because:
        -------------------------
        DFS started from a SOURCE SCC in reversed graph
        CANNOT escape to another SCC.
        */

    // Reset visited array for second DFS
    for (let i = 0; i < V; i++) {
      vis[i] = 0;
    }

    // Build reversed adjacency list
    for (let u = 0; u < V; u++) {
      for (let v of adj[u]) {
        adjR[v].push(u); // reverse edge u → v to v → u
      }
    }

    /*
        ==================================================
        STEP 3: DFS ON REVERSED GRAPH USING STACK ORDER
        ==================================================

        Stack pop order:
        ----------------
        Nodes are popped in DECREASING finish time.

        First node popped:
        ------------------
        - Belongs to SCC that finished LAST
        - That SCC was a SINK in original graph
        - Hence it is a SOURCE in reversed graph

        DFS from it will:
        -----------------
        - Stay completely inside its SCC
        - Not reach any other SCC
        */

    let sccCount = 0;

    const traverse = (node, temp) => {
      vis[node] = 1;
      temp.push(node);

      for (let nei of adjR[node]) {
        if (!vis[nei]) {
          traverse(nei, temp);
        }
      }
    };

    while (stack.length > 0) {
      const node = stack.pop();

      /*
            If already visited:
            -------------------
            This node already belongs to an SCC
            discovered earlier, so skip.
            */
      if (!vis[node]) {
        const temp = [];
        sccCount++;

        /*
                DFS on reversed graph starting from highest finish time node.

                GUARANTEE:
                ----------
                This DFS will find EXACTLY ONE SCC
                because:
                - No incoming edges from other SCCs
                - DFS cannot leak out
                */
        traverse(node, temp);

        components.push(temp);
      }
    }

    /*
        components = [
            [nodes of SCC1],
            [nodes of SCC2],
            ...
        ]

        sccCount = number of SCCs
        */

    return sccCount;
  }
}
