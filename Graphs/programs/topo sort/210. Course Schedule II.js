// https://leetcode.com/problems/course-schedule-ii/description/

/*

BFS - Topo sort & Cycle detection

O(V + E) & O(V)

*/

var findOrder = function (numCourses, prerequisites) {
  // ------------------------------------------------
  // STEP 1: Build adjacency list and in-degree array
  // ------------------------------------------------

  // adj[v] = list of courses that depend on course v
  const adj = Array.from({ length: numCourses }, () => []);

  // inDegree[i] = number of prerequisites required for course i
  const inDegree = new Array(numCourses).fill(0);

  for (let [u, v] of prerequisites) {
    // v → u (v must be done before u)
    adj[v].push(u);
    inDegree[u]++;
  }

  // ------------------------------------------------
  // STEP 2: Initialize queue with courses having no prerequisites
  // ------------------------------------------------

  const q = []; // queue for BFS
  const ans = []; // stores valid course order

  for (let i = 0; i < numCourses; i++) {
    // Courses with no prerequisites can be taken immediately
    if (inDegree[i] == 0) q.push(i);
  }

  // ------------------------------------------------
  // STEP 3: BFS traversal (Topological Sort)
  // ------------------------------------------------

  while (q.length > 0) {
    const curr = q.shift();
    ans.push(curr); // course is completed

    // Reduce in-degree of dependent courses
    for (let nei of adj[curr]) {
      inDegree[nei]--;

      // If all prerequisites are satisfied, add to queue
      if (inDegree[nei] == 0) q.push(nei);
    }
  }

  // ------------------------------------------------
  // STEP 4: Cycle check
  // ------------------------------------------------

  // If all courses are processed, return order
  // Otherwise, cycle exists → impossible to finish all courses
  return ans.length == numCourses ? ans : [];
};

/*

DFS - Topo sort & Cycle detection

O(V + E) & O(V)

*/

var findOrder = function (numCourses, prerequisites) {
  const adj = Array.from({ length: numCourses }, () => []);
  const vis = new Array(numCourses).fill(0);
  const out = [];

  for (let [u, v] of prerequisites) {
    // DFS returns ans in reverse order, we reverse and return in topo sort, we can do this here or just change the order here, push v instead of u
    adj[u].push(v);
  }

  const dfs = (node) => {
    if (vis[node] == 2) return false;
    if (vis[node] == 1) return true;

    vis[node] = 1;
    for (let nei of adj[node]) {
      if (dfs(nei)) return true;
    }
    vis[node] = 2;
    out.push(node); // store the node as in topo sort
    return false;
  };

  for (let i = 0; i < numCourses; i++) {
    if (dfs(i)) return []; // if cycle is detected, just return the empty arr
  }

  return out;
};
