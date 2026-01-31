// https://www.geeksforgeeks.org/problems/implementing-dijkstra-set-1-adjacency-matrix/1


/*

O(ELogV) & O(V + E)

*/


class Solution {
    // Dijkstra's algorithm
    // V = number of vertices
    // edges = edge list [u, v, w]
    // src = source vertex
    dijkstra(V, edges, src) {

        // Step 1: Distance array
        // dist[i] will store shortest distance from src to i
        const dist = new Array(V).fill(Infinity)

        // Step 2: Adjacency list
        const adj = Array.from({ length: V }, () => [])

        // Build graph (undirected)
        for (let [u, v, w] of edges) {
            adj[u].push([v, w])
            adj[v].push([u, w])
        }

        // Step 3: Min Heap (Priority Queue)
        // Stores [distance, node]
        const pq = new PriorityQueue((a, b) => a - b)

        // Step 4: Initialize source
        dist[src] = 0
        pq.enqueue([0, src])

        // Step 5: Process nodes
        while (!pq.isEmpty()) {
            const [d, node] = pq.dequeue()

            // Ignore outdated entries
            if (d > dist[node]) continue

            // Relax all adjacent edges
            for (let [nei, w] of adj[node]) {
                const newDist = dist[node] + w

                if (newDist < dist[nei]) {
                    dist[nei] = newDist
                    pq.enqueue([newDist, nei])
                }
            }
        }

        // Step 6: Return shortest distances
        return dist
    }
}



