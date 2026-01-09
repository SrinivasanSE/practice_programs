// https://leetcode.com/problems/number-of-provinces/description/

/*

Using DFS - by creating adj arr

*/

const dfs = (node, visited, adj) => {
  visited[node] = true;

  for (let n of adj[node]) {
    if (!visited[n]) {
      dfs(n, visited, adj);
    }
  }
};

var findCircleNum = function (isConnected) {
  const v = isConnected.length;
  const visited = new Array(v).fill(false);
  const adj = Array.from({ length: v }, () => []);

  for (let i = 0; i < isConnected.length; i++) {
    for (let j = 0; j < isConnected.length; j++) {
      if (isConnected[i][j] == 1 && i != j) {
        adj[i].push(j);
        adj[j].push(i);
      }
    }
  }
  let cnt = 0;
  for (let i = 0; i < v; i++) {
    if (!visited[i]) {
      cnt++;
      dfs(i, visited, adj);
    }
  }

  return cnt;
};

/*

Using DFS - without creating adj arr

*/

const _dfs = (node, visited, isConnected, v) => {
  visited[node] = true;

  for (let i = 0; i < v; i++) {
    if (isConnected[node][i] == 1 && !visited[i]) {
      dfs(i, visited, isConnected, v);
    }
  }
};

var findCircleNum = function (isConnected) {
  const v = isConnected.length;
  const visited = new Array(v).fill(false);
  let cnt = 0;
  for (let i = 0; i < v; i++) {
    if (!visited[i]) {
      cnt++;
      _dfs(i, visited, isConnected, v);
    }
  }

  return cnt;
};

/*

Using BFS - by creating adj arr

*/

const bfs = (node, visited, adj) => {
  visited[node] = true;
  const q = [node];

  while (q.length > 0) {
    const curr = q.shift();
    for (let n of adj[curr]) {
      if (!visited[n]) {
        visited[n] = true;
        q.push(n);
      }
    }
  }
};

var findCircleNum = function (isConnected) {
  const v = isConnected.length;
  const visited = new Array(v).fill(false);
  const adj = Array.from({ length: v }, () => []);

  for (let i = 0; i < isConnected.length; i++) {
    for (let j = 0; j < isConnected.length; j++) {
      if (isConnected[i][j] == 1 && i != j) {
        adj[i].push(j);
        adj[j].push(i);
      }
    }
  }
  let cnt = 0;
  for (let i = 0; i < v; i++) {
    if (!visited[i]) {
      cnt++;
      bfs(i, visited, adj);
    }
  }

  return cnt;
};

/*

Using BFS - without creating adj arr

*/

const _bfs = (node, visited, isConnected, v) => {
  visited[node] = true;
  const q = [node];

  while (q.length > 0) {
    const curr = q.shift();
    for (let i = 0; i < v; i++) {
      if (isConnected[curr][i] == 1 && !visited[i]) {
        visited[i] = true;
        q.push(i);
      }
    }
  }
};

var findCircleNum = function (isConnected) {
  const v = isConnected.length;
  const visited = new Array(v).fill(false);
  let cnt = 0;
  for (let i = 0; i < v; i++) {
    if (!visited[i]) {
      cnt++;
      _bfs(i, visited, isConnected, v);
    }
  }

  return cnt;
};
