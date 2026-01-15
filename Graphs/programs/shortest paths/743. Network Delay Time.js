// https://leetcode.com/problems/network-delay-time/description/

// TODO: Explore bellman's algo

/*

BFS - Dijkstra

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
