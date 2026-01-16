// https://leetcode.com/problems/number-of-ways-to-arrive-at-destination/description/

/*

BFS - Dijkstra

O(E log V) & O(V + E)

*/

var countPaths = function (n, roads) {
  /*
    Example graph:
        0 --1--> 1
        0 --1--> 2
        1 --1--> 3
        2 --1--> 3

    There are TWO shortest paths from 0 to 3:
        0 → 1 → 3
        0 → 2 → 3
    */

  const adj = Array.from({ length: n }, () => []);

  for (let [u, v, time] of roads) {
    adj[u].push([v, time]);
    adj[v].push([u, time]);
  }

  const pq = new PriorityQueue((a, b) => a[0] - b[0]);

  // dist[i] = shortest distance to reach node i
  const dist = new Array(n).fill(Infinity);

  // ways[i] = number of shortest paths to reach node i
  const ways = new Array(n).fill(0);

  // Starting at node 0
  dist[0] = 0;
  ways[0] = 1; // Only one way to start (standing at node 0)
  pq.enqueue([0, 0]);

  while (!pq.isEmpty()) {
    const [time, node] = pq.dequeue();

    for (let [nei, t] of adj[node]) {
      const newDistance = time + t;

      /*
            Case 1: Found a STRICTLY SHORTER path
            -----------------------------------
            Example:
                dist[3] was Infinity
                newDistance = 2
            We discovered the first shortest path.
            */
      if (newDistance < dist[nei]) {
        dist[nei] = newDistance;
        ways[nei] = ways[node]; // Inherit number of paths
        pq.enqueue([newDistance, nei]);
      } else if (newDistance === dist[nei]) {

      /*
            Case 2: Found ANOTHER path with SAME SHORTEST distance
            ------------------------------------------------------
            Example:
                dist[3] = 2 already
                newDistance = 2 again via a different route

            This means:
                Another shortest path exists!
                So we ADD number of ways.
            */
        ways[nei] = (ways[nei] + ways[node]) % MOD;
      }
    }
  }

  // Final answer = number of shortest paths to destination
  return ways[n - 1] % MOD;
};
