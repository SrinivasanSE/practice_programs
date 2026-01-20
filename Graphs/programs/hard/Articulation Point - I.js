// https://www.geeksforgeeks.org/problems/articulation-point-1/1

/*

DFS

O(V + E) & O(V)

*/

class Solution {
  // Function to find articulation points in an undirected graph.
  articulationPoints(V, adj) {
    const vis = new Array(V).fill(0); // visited array
    const time = new Array(V); // discovery time
    const low = new Array(V); // lowest reachable time
    const mark = new Array(V).fill(0); // mark articulation points

    let timer = 0;

    const dfs = (node, parent) => {
      vis[node] = 1;
      time[node] = low[node] = timer;
      timer++;

      let child = 0; // number of DFS children (used for root)

      for (let nei of adj[node]) {
        // Ignore the edge back to parent
        if (nei === parent) continue;

        // Case 1: Tree edge
        if (!vis[nei]) {
          child++;
          dfs(nei, node);

          // After returning, update low-link value
          low[node] = Math.min(low[node], low[nei]);

          /*
                      ARTICULATION CONDITION (NON-ROOT):

                      If the subtree rooted at 'nei' cannot reach
                      any ancestor of 'node', then removing 'node'
                      disconnects the graph.
                    */
          if (low[nei] >= time[node] && parent !== -1) {
            mark[node] = 1;
          }
        }
        // Case 2: Back edge to ancestor
        else {
          /*
                      IMPORTANT:
                      We use time[nei], NOT low[nei],
                      because this is a direct edge to an ancestor.
                    */
          low[node] = Math.min(low[node], time[nei]);
        }
      }

      /*
              ROOT SPECIAL CASE:
              Root is articulation point if it has more than one DFS child.
            */
      if (parent === -1 && child > 1) {
        mark[node] = 1;
      }
    };

    // Run DFS for each component
    for (let i = 0; i < V; i++) {
      if (!vis[i]) {
        dfs(i, -1);
      }
    }

    // Collect articulation points
    const ans = [];
    for (let i = 0; i < V; i++) {
      if (mark[i] === 1) ans.push(i);
    }

    return ans.length === 0 ? [-1] : ans;
  }
}
