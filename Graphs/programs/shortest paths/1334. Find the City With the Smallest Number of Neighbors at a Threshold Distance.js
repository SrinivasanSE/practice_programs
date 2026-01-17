// https://leetcode.com/problems/find-the-city-with-the-smallest-number-of-neighbors-at-a-threshold-distance/description/

/*

Floyd algo

O(n^3) & O(n^2)

*/

var findTheCity = function (n, edges, distanceThreshold) {
  // dist[i][j] = shortest distance from city i to city j
  const dist = Array.from({ length: n }, () => new Array(n).fill(Infinity));

  // Initialize distances using given edges
  for (let [u, v, w] of edges) {
    // Undirected graph
    dist[u][v] = w;
    dist[v][u] = w;
  }

  // Distance from a city to itself is 0
  for (let i = 0; i < n; i++) {
    dist[i][i] = 0;
  }

  // Floyd–Warshall algorithm
  // Try each city as an intermediate ("via")
  for (let via = 0; via < n; via++) {
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        // Relax path i → via → j
        dist[i][j] = Math.min(dist[i][j], dist[i][via] + dist[via][j]);
      }
    }
  }

  let city = -1;
  let cityCount = n;

  // Count reachable cities for each city
  for (let i = 0; i < n; i++) {
    let cnt = 0;

    for (let j = 0; j < n; j++) {
      if (dist[i][j] <= distanceThreshold) {
        cnt++;
      }
    }

    // If fewer reachable cities OR tie with larger index
    if (cnt <= cityCount) {
      city = i;
      cityCount = cnt;
    }
  }

  return city;
};

/*

BFS - Dijkstra

O(n * (E log V)) & O(E + V)

*/

var findTheCity = function (n, edges, distanceThreshold) {
  // Adjacency list
  const adj = Array.from({ length: n }, () => []);

  for (let [u, v, w] of edges) {
    adj[u].push([v, w]);
    adj[v].push([u, w]);
  }

  let city = -1;
  let cityCount = n;

  // Run Dijkstra from every city
  for (let i = 0; i < n; i++) {
    // Min-heap: [distance, node]
    const pq = new PriorityQueue((a, b) => a[0] - b[0]);

    // dist[j] = shortest distance from city i to city j
    const dist = new Array(n).fill(Infinity);
    dist[i] = 0;

    pq.enqueue([0, i]);

    while (!pq.isEmpty()) {
      const [currDist, node] = pq.dequeue();

      // All future nodes in PQ will have distance ≥ currDist, So we can break
      if (currDist > distanceThreshold) break;

      // Ignore outdated entries
      if (currDist > dist[node]) continue;

      for (let [nei, wt] of adj[node]) {
        if (currDist + wt < dist[nei]) {
          dist[nei] = currDist + wt;
          pq.enqueue([dist[nei], nei]);
        }
      }
    }

    // Count reachable cities
    let cnt = 0;
    for (let j = 0; j < n; j++) {
      if (dist[j] <= distanceThreshold) cnt++;
    }

    // Tie-breaking handled by <=
    if (cnt <= cityCount) {
      city = i;
      cityCount = cnt;
    }
  }

  return city;
};
