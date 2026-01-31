// https://www.geeksforgeeks.org/problems/minimum-multiplications-to-reach-end/1

/*

Think of this problem as a graph problem:

Each number x is a node

From node x, you can go to (x * arr[i]) % 100000

Each multiplication costs exactly 1 step

👉 Since all edges have equal weight (1),
BFS guarantees the shortest number of multiplications

Shortest path with uniform edge weight ⇒ BFS, not Dijkstra

*/

/*

BFS

O(10^5) & O(10^5)

*/

class Solution {
  minimumMultiplications(arr, start, end) {
    // If already at destination
    if (start == end) return 0;

    const MOD = 100000;

    /*
        dist[x] = minimum steps needed to reach number x
        Initialize with large value (unvisited)
        */
    const dist = new Array(99999).fill(1e9);

    // Starting point takes 0 steps
    dist[start] = 0;

    // BFS queue
    const q = [start];

    let newNum;

    while (q.length > 0) {
      const curr = q.shift();

      /*
            From current number, try all multiplications
            Example:
                curr = 3
                arr = [2, 5]
                Possible next = (3*2)%100000 = 6
                                (3*5)%100000 = 15
            */
      for (let num of arr) {
        newNum = (curr * num) % MOD;

        /*
            If we found a shorter way to reach newNum
        */
        if (dist[curr] + 1 < dist[newNum]) {
          dist[newNum] = dist[curr] + 1;

          /*
            First time reaching end is guaranteed shortest
            because BFS explores level by level
          */
          if (newNum == end) {
            return dist[newNum];
          }

          q.push(newNum);
        }
      }
    }

    // If end is unreachable
    return -1;
  }
}

/*

BFS - NO relaxation needed, we can use dist arr as vis arr

O(10^5) & O(10^5)

*/

class Solution {
  minimumMultiplications(arr, start, end) {
    if (start == end) return 0;

    const MOD = 100000;

    /*
        dist[x] = steps needed to reach x
        -1 means unvisited
        */
    const dist = new Array(99999).fill(-1);

    dist[start] = 0;
    const q = [start];

    let newNum;

    while (q.length > 0) {
      const curr = q.shift();

      // If reached destination, return steps
      if (curr == end) return dist[curr];

      for (let num of arr) {
        newNum = (curr * num) % MOD;

        /*
                If newNum has not been visited yet
                */
        if (dist[newNum] == -1) {
          dist[newNum] = dist[curr] + 1;
          q.push(newNum);
        }
      }
    }

    return -1;
  }
}
