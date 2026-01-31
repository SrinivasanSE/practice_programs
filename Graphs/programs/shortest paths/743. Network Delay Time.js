// https://leetcode.com/problems/network-delay-time/description/


/*

BFS - Dijkstra

O(E log V) & O(V + E)

*/

var networkDelayTime = function (times, n, k) {
  // Build adjacency list
  const adj = Array.from({ length: n + 1 }, () => []);
  for (let [u, v, w] of times) {
    adj[u].push([v, w]);
  }

  // Min-heap: [timeSoFar, node]
  const pq = new PriorityQueue((a, b) => a[0] - b[0]);

  // minTime[node] = shortest time to reach node
  const minTime = new Array(n + 1).fill(1e9);

  // Source initialization
  minTime[k] = 0;
  pq.enqueue([0, k]);

  while (!pq.isEmpty()) {
    const [time, node] = pq.dequeue();

    // !IMPORTANT - Skip stale entries (not shortest anymore). We might have already reached to this node with shorter time
    // and queue might still contain stale entries which takes higher time. Ignore this entry because we already found a better (shorter) way to reach this node.
    if (time > minTime[node]) continue;

    // Relax edges
    for (let [nei, w] of adj[node]) {
      if (time + w < minTime[nei]) {
        minTime[nei] = time + w;
        pq.enqueue([minTime[nei], nei]);
      }
    }
  }

  // Find maximum shortest time
  let max = 0;
  for (let i = 1; i <= n; i++) {
    if (minTime[i] === 1e9) return -1; // unreachable node
    max = Math.max(max, minTime[i]);
  }

  return max;
};


/*

BFS - Dijkstra (Using Visit set)

O(E log V) & O(V + E)

*/

var networkDelayTime = function (times, n, k) {
  // Using visited set

  // Build adjacency list
  // adj[u] = [[v, weight], ...]
  const adj = Array.from({ length: n + 1 }, () => []);
  for (let [u, v, w] of times) {
    adj[u].push([v, w]);
  }

  // Min-heap: [timeSoFar, node]
  const pq = new PriorityQueue((a, b) => a[0] - b[0]);

  // Tracks nodes whose shortest time is finalized
  const visit = new Set();

  // Start from source node k
  pq.enqueue([0, k]);
  let max = 0;

  while (!pq.isEmpty()) {
    const [time, node] = pq.dequeue();

    // If already finalized, skip
    if (visit.has(node)) continue;

    // Mark node as finalized
    visit.add(node);

    // Update maximum delay
    max = Math.max(max, time);

    // Explore neighbors
    for (let [nei, w] of adj[node]) {
      if (!visit.has(nei)) {
        pq.enqueue([time + w, nei]);
      }
    }
  }

  // If all nodes are reached, return max delay
  return visit.size === n ? max : -1;
};


/*

Bellman Ford

O(V*E) & O(V)

*/


var networkDelayTime = function (times, n, k) {

    /*
      dist[i] = shortest time needed for the signal
                to reach node i from node k

      Nodes are labeled from 1 to n,
      so we create an array of size (n + 1)
    */
    const dist = new Array(n + 1).fill(Infinity);

    // Signal starts from node k → time = 0
    dist[k] = 0;

    /*
      Bellman–Ford algorithm

      Key ideas:
      - Shortest path in a graph can have at most (n - 1) edges
      - Repeatedly relax all edges
      - If no update happens in an iteration → stop early
    */

    for (let i = 1; i < n; i++) {

        // Track whether any distance update happens in this iteration
        let relaxed = false;

        // Try to relax every edge
        for (let [u, v, w] of times) {

            /*
              Relaxation condition:
              1. u must already be reachable
              2. Going from u → v gives a shorter time
            */
            if (dist[u] !== Infinity && dist[u] + w < dist[v]) {

                // Update shortest time to reach v
                dist[v] = dist[u] + w;

                // Mark that at least one relaxation happened
                relaxed = true;
            }
        }

        /*
          Optimization: Early stopping

          If no distance was updated in this round,
          then all shortest paths are already found.
        */
        if (!relaxed) break;
    }

    /*
      After computing shortest times,
      the answer is the maximum time among all nodes.

      If any node is unreachable → return -1
    */
    let maxTime = 0;

    for (let i = 1; i <= n; i++) {
        if (dist[i] === Infinity) return -1;
        maxTime = Math.max(maxTime, dist[i]);
    }

    return maxTime;
};
