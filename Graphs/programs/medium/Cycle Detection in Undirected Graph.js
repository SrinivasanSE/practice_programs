// https://www.geeksforgeeks.org/problems/detect-cycle-in-an-undirected-graph/1


const _detectCycle = (node, vis, adj) => {
    const q = [[node, -1]]
    vis[node] = true
    
    while (q.length > 0) {
        const [curr, parent] = q.shift()
        
        for (let n of adj[curr]) {
            if (!vis[n]) {
                vis[n] = true
                q.push([n, curr])
            } else if (parent != n) return true
        }
    }
    
    return false
}


class Solution {
    isCycle(V, edges) {
        // Code here
        
        const adj = Array.from({length: V}, () => [])
        const vis = new Array(V).fill(false)
        
        for (let [u, v] of edges) {
            adj[u].push(v)
            adj[v].push(u)
        }
        
        for (let i = 0; i < V; i++) {
            if (!vis[i]) {
                if (_detectCycle(i, vis, adj) == true) return true
            }
        }
        
        return false
        
    }
}


/**
 * @param {number} V
 * @param {number[][]} edges
 * @returns {boolean}
 */
 
const detectCycle = (node, parent, vis, adj) => {
    vis[node] = true
        
        for (let n of adj[node]) {
            if (!vis[n]) {
                if (detectCycle(n, node, vis, adj) == true) return true
            } else if (parent != n) return true
        }
    
    return false
}


class Solution {
    isCycle(V, edges) {
        // Code here
        
        const adj = Array.from({length: V}, () => [])
        const vis = new Array(V).fill(false)
        
        for (let [u, v] of edges) {
            adj[u].push(v)
            adj[v].push(u)
        }
        
        for (let i = 0; i < V; i++) {
            if (!vis[i]) {
                if (detectCycle(i, -1, vis, adj) == true) return true
            }
        }
        
        return false
        
    }
}