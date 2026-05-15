// https://www.geeksforgeeks.org/dsa/floyd-warshall-algorithm-dp-16/

/*

Floyd–Warshall is an All-Pairs Shortest Path algorithm.

It finds:

Shortest distance between every pair of vertices

Works with negative weights

Can detect negative cycles

Uses Dynamic Programming

Unlike Dijkstra (single source), Floyd–Warshall computes shortest paths between all pairs in one run.

2️⃣ Core Idea / Intuition (MOST IMPORTANT)
Key question:

Can the shortest path from i → j be improved by going through some intermediate node k?

If yes:

i → k → j  <  i → j


So we update:

dist[i][j] = min(
    dist[i][j],
    dist[i][k] + dist[k][j]
)

The algorithm relies on the principle of optimal substructure, meaning:

If the shortest path from i to j passes through some vertex k, then the path from i to k and the path from k to j must also be shortest paths.
The iterative approach ensures that by the time vertex k is considered, all shortest paths using only vertices 0 to k-1 have already been computed.

    */

// O(V^3) & O(V^2)

function floydWarshall(n, edges) {
  const INF = 1e9;

  // Step 1: Initialize distance matrix
  const dist = Array.from({ length: n }, () => Array(n).fill(INF));

  // Distance to self = 0
  for (let i = 0; i < n; i++) dist[i][i] = 0;

  // Fill initial edges
  for (let [u, v, w] of edges) {
    // there could be multiple edges from u to v
    dist[u][v] = Math.min(dist[u][v], w);
  }

  // Step 2: Main DP
  for (let via = 0; via < n; via++) {
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        if (
          dist[i][via] != INF &&
          dist[via][j] != INF &&
          dist[i][via] + dist[via][j] < dist[i][j]
        ) {
          dist[i][j] = dist[i][via] + dist[via][j];
        }
      }
    }
  }

  // Negative cycle detection
  for (let i = 0; i < n; i++) {
    if (dist[i][i] < 0) {
      console.log("Negative cycle exists");
    }
  }

  return dist;
}

function floydWarshallWithPath(n, edges) {
  const INF = 1e15;
  // A very large number representing "no path"
  // We use this instead of Infinity to avoid overflow in additions

  // dist[i][j] = shortest distance from node i to node j
  // Initially, we assume no node can reach any other node
  const dist = Array.from({ length: n }, () => Array(n).fill(INF));

  // next[i][j] = the FIRST node you should go to
  // when traveling from i to j along the shortest path
  //
  // Example:
  // If shortest path from 0 → 3 is: 0 → 1 → 2 → 3
  // then next[0][3] = 1
  const next = Array.from({ length: n }, () => Array(n).fill(null));

  // ---------------- INITIALIZATION ----------------

  for (let i = 0; i < n; i++) {
    // Distance from a node to itself is always 0
    // (staying in the same place costs nothing)
    dist[i][i] = 0;

    // To go from i to i, the next node is i itself
    next[i][i] = i;
  }

  // ---------------- ADD DIRECT EDGES ----------------

  for (let [u, v, w] of edges) {
    // If multiple edges exist between u and v,
    // we keep the one with the smallest weight
    if (w < dist[u][v]) {
      dist[u][v] = w;

      // If going directly from u → v,
      // the first step from u to v is v itself
      next[u][v] = v;
    }
  }

  /*
    Example after this step:
    Edge: 0 → 1 (3)

    dist[0][1] = 3
    next[0][1] = 1

    Meaning:
    To go from 0 to 1, go directly to 1
    */

  // ---------------- FLOYD–WARSHALL ----------------
  // Try using every node as an intermediate ("via")

  for (let via = 0; via < n; via++) {
    // Try all possible source nodes
    for (let i = 0; i < n; i++) {
      // Try all possible destination nodes
      for (let j = 0; j < n; j++) {
        /*
                If going from i → via → j is shorter than
                the currently known path i → j,
                then update it.
                */

        if (dist[i][via] + dist[via][j] < dist[i][j]) {
          // Update shortest distance
          dist[i][j] = dist[i][via] + dist[via][j];

          /*
                    VERY IMPORTANT LINE 👇

                    We do NOT write:
                        next[i][j] = via

                    Why?
                    Because next[i][j] must store the FIRST STEP
                    from i toward j.

                    Since the path is:
                        i → via → j

                    The first step from i → j
                    is the same as the first step from i → via
                    */

          next[i][j] = next[i][via];

          /*
                    Example:
                    Suppose:
                        i = 0, via = 1, j = 3

                    And we already know:
                        next[0][1] = 1

                    Then:
                        next[0][3] = 1

                    Meaning:
                        To go from 0 to 3, first go to 1
                    */
        }
      }
    }
  }

  // Return both matrices:
  // dist → shortest distances
  // next → information needed to print paths
  return { dist, next };
}

function getPath(u, v, next) {
  // This array will store the final path
  // We always start the path from the source node `u`
  //
  // Example:
  // If we want path from 0 → 3
  // path = [0]
  const path = [u];

  /*
    We keep moving forward until we reach the destination `v`.

    IMPORTANT:
    - `next[x][y]` tells us:
        "From node x, what is the VERY NEXT node
         to go to if we want to reach y optimally?"

    So in every iteration:
    - We move ONE STEP forward
    - We never jump
    - We always follow a valid edge
    */

  while (u !== v) {
    /*
        Move to the next node on the shortest path from u → v

        Example:
        Suppose the shortest path is:
            0 → 1 → 2 → 3

        Stored as:
            next[0][3] = 1
            next[1][3] = 2
            next[2][3] = 3

        Step-by-step:
            u = 0 → next[0][3] = 1
            u = 1 → next[1][3] = 2
            u = 2 → next[2][3] = 3
        */

    u = next[u][v];

    /*
        Add this node to the path

        After each iteration, the path grows:

        Iteration 1:
            path = [0, 1]

        Iteration 2:
            path = [0, 1, 2]

        Iteration 3:
            path = [0, 1, 2, 3]
        */

    path.push(u);
  }

  // When u === v, we have reached the destination
  // `path` now contains the full shortest path
  return path;
}
