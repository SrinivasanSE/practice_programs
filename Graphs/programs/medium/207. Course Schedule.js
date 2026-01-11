// https://leetcode.com/problems/course-schedule/description/

/*

BFS - Topo sort

O(V + E) & O(V)

*/

/*

Each course may depend on other courses.

If there is a cycle, some courses will never become free of dependencies

If there is no cycle, we can always:

Start with courses having 0 prerequisites

Gradually remove their dependency edges

Eventually complete all courses

This idea is exactly Topological Sorting using BFS (Kahn’s Algorithm).

*/

var canFinish = function (numCourses, prerequisites) {
  // ------------------------------------------------
  // STEP 1: Build graph and indegree array
  // ------------------------------------------------

  // adj[v] → list of courses that depend on course v
  const adj = Array.from({ length: numCourses }, () => []);

  // inDegree[i] → number of prerequisites for course i
  const inDegree = new Array(numCourses).fill(0);

  for (let [u, v] of prerequisites) {
    // v must be taken before u
    adj[v].push(u);

    // u has one more prerequisite
    inDegree[u]++;
  }

  // ------------------------------------------------
  // STEP 2: Push all courses with no prerequisites
  // ------------------------------------------------

  const q = [];

  for (let i = 0; i < numCourses; i++) {
    // Courses with indegree 0 can be taken immediately
    if (inDegree[i] == 0) q.push(i);
  }

  // ------------------------------------------------
  // STEP 3: BFS (Kahn’s Algorithm)
  // ------------------------------------------------

  // Count how many courses we are able to take
  let visited = 0;

  while (q.length > 0) {
    const curr = q.shift();
    visited++;

    // Removing curr "unlocks" its dependent courses
    for (let nei of adj[curr]) {
      inDegree[nei]--;

      // If all prerequisites are now satisfied
      if (inDegree[nei] == 0) {
        q.push(nei);
      }
    }
  }

  // ------------------------------------------------
  // STEP 4: Check if all courses were completed
  // ------------------------------------------------

  // If visited == numCourses → no cycle
  // Else → cycle exists
  return visited == numCourses;
};

/*

DFS - Cycle detection for directed

O(V + E) & O(V)

*/

var canFinish = function (numCourses, prerequisites) {
  // ------------------------------------------------
  // STEP 1: Build adjacency list
  // ------------------------------------------------

  // adj[v] = list of courses that depend on course v
  const adj = Array.from({ length: numCourses }, () => []);

  for (let [u, v] of prerequisites) {
    // To take course u, course v must be completed first
    // So create a directed edge: v → u
    adj[v].push(u);
  }

  // ------------------------------------------------
  // STEP 2: Visitation state array
  // ------------------------------------------------

  // vis[i] meanings:
  // 0 → not visited
  // 1 → currently in DFS recursion stack
  // 2 → fully processed
  const vis = new Array(numCourses).fill(0);

  // ------------------------------------------------
  // STEP 3: DFS function to detect cycle
  // ------------------------------------------------
  const dfs = (node) => {
    // If node is already in current DFS path → cycle detected
    if (vis[node] == 1) return true;

    // If node is fully processed → safe, no cycle here
    if (vis[node] == 2) return false;

    // Mark node as visiting (enter recursion path)
    vis[node] = 1;

    // Visit all dependent courses
    for (let nei of adj[node]) {
      if (dfs(nei)) return true;
    }

    // Backtrack: mark node as fully processed
    vis[node] = 2;

    // No cycle found starting from this node
    return false;
  };

  // ------------------------------------------------
  // STEP 4: Run DFS on all courses
  // ------------------------------------------------

  // Graph may be disconnected, so check each node
  for (let i = 0; i < numCourses; i++) {
    if (dfs(i)) return false;
  }

  // No cycle found → all courses can be finished
  return true;
};
