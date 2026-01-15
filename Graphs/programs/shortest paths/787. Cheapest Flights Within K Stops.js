// https://leetcode.com/problems/cheapest-flights-within-k-stops/description/

// TODO: Check DP approach

/*

1) What makes this problem tricky?

We want minimum cost

But we can use at most k stops

Normal Dijkstra ❌ fails because:

A cheaper path may use more stops

A more expensive path may use fewer stops

The cheapest way to reach a node may prevent reaching the destination due to stop limit

2) Why BFS instead of Dijkstra?

Stop count matters more than greedy cost ordering

We want to explore all paths with ≤ k stops

BFS naturally processes paths in increasing stop count

3) Why dist[] still works here?

Even though multiple paths can reach the same node:

We only care about the cheapest cost so far

If a new path gives a cheaper cost → we update and explore further

More expensive paths are safely ignored

4) Why we do NOT stop when we first reach dst?

Because:

The first path reaching dst may not be the cheapest

Another path with more stops but lower cost may exist

So we must process all valid paths up to k stops.

*/

/*

BFS

O(E × k) & O(n + E)

*/

var findCheapestPrice = function (n, flights, src, dst, k) {
  // Adjacency list:
  // adj[u] = [[v1, cost1], [v2, cost2], ...]
  const adj = Array.from({ length: n }, () => []);

  // dist[i] = minimum cost found so far to reach city i
  // Initialize all costs to infinity
  const dist = new Array(n).fill(1e9);

  // Build the graph
  for (let [u, v, price] of flights) {
    adj[u].push([v, price]);
  }

  // Queue for BFS:
  // [currentNode, totalCostSoFar, stopsUsedSoFar]
  const q = [[src, 0, 0]];

  // Cost to reach source is 0
  dist[src] = 0;

  // BFS traversal with stop constraint
  while (q.length > 0) {
    const [node, price, stop] = q.shift();

    // If stops exceed k, we cannot proceed further from this path
    if (stop > k) continue;

    // Explore neighbors
    for (let [nei, p] of adj[node]) {
      // Relaxation step:
      // If reaching 'nei' via this path is cheaper
      if (price + p < dist[nei]) {
        dist[nei] = price + p;

        // Push next state with one more stop
        q.push([nei, dist[nei], stop + 1]);
      }
    }
  }

  // If destination was never reached, return -1
  return dist[dst] == 1e9 ? -1 : dist[dst];
};

/*

BFS - Dijkstra

O(E × log(nk)) & O(nk + E)

*/

var findCheapestPrice = function (n, flights, src, dst, k) {
  // Adjacency list
  // adj[u] = [[v, cost], ...]
  const adj = Array.from({ length: n }, () => []);
  for (let [u, v, price] of flights) {
    adj[u].push([v, price]);
  }

  // Min-heap priority queue
  // Each element: [totalCostSoFar, currentNode, stopsUsedSoFar]
  const pq = new PriorityQueue((a, b) => a[0] - b[0]);

  // dist[node][stops] = minimum cost to reach 'node' using 'stops' edges
  const dist = Array.from({ length: n }, () => new Array(k + 2).fill(1e9));

  // Start from source
  pq.enqueue([0, src, 0]);
  dist[src][0] = 0;

  while (!pq.isEmpty()) {
    const [cost, node, stops] = pq.dequeue();

    // If destination is reached, this is the cheapest possible
    // because PQ always expands lowest-cost path first
    if (node === dst) return cost;

    // If stop limit exceeded, do not expand further
    if (stops === k + 1) continue;

    // Explore neighbors
    for (let [nei, price] of adj[node]) {
      const newCost = cost + price;

      // Relaxation with stop tracking
      // Have we found a cheaper way to reach nei using exactly stops + 1 flights
      if (newCost < dist[nei][stops + 1]) {
        dist[nei][stops + 1] = newCost;
        pq.enqueue([newCost, nei, stops + 1]);
      }
    }
  }

  return -1;
};
