// https://www.geeksforgeeks.org/problems/minimum-spanning-tree/1


/*

Prim’s Algorithm

O(ELogE) & O(V + E)

*/


class Solution {
    spanningTree(V, edges) {

        /*
        ===========================
        PRIM'S ALGORITHM – INTUITION
        ===========================

        Goal:
        -----
        Connect ALL vertices using exactly (V - 1) edges
        such that the TOTAL weight is MINIMUM.

        Key Idea:
        ---------
        - We DON'T decide nodes one by one
        - We decide EDGES one by one (globally minimum)

        At every step:
        "Among all edges that connect
         (visited → unvisited) nodes,
         pick the edge with MINIMUM weight"

        This is why we need a MIN-HEAP (Priority Queue).

        ------------------------------------------------
        Example Graph:
        
            0 --10-- 1
             \       
              1       
               \     
                2 --1-- 1

        Correct MST:
        0 → 2 (1)
        2 → 1 (1)
        Total = 2
        ------------------------------------------------
        */

        // vis[node] = 1 means:
        // node is already INCLUDED in the MST
        const vis = new Array(V).fill(0)

        // Build adjacency list
        // adj[u] = [[v1, w1], [v2, w2], ...]
        const adj = Array.from({ length: V }, () => [])

        for (let [u, v, w] of edges) {
            adj[u].push([v, w])
            adj[v].push([u, w])
        }

        /*
        Priority Queue stores:
        [edgeWeight, currentNode, parentNode]

        Why store parent?
        -----------------
        To reconstruct WHICH edge was used in the MST.

        PQ always gives us:
        "The cheapest edge available so far"
        */
        const pq = new PriorityQueue((a, b) => a[0] - b[0])

        /*
        Start from node 0 with a dummy edge:
        - weight = 0
        - parent = -1 (no real parent)

        This is just to kickstart the algorithm.
        */
        pq.enqueue([0, 0, -1])

        let sum = 0           // total weight of MST
        const mstEdges = []   // stores final MST edges

        /*
        MAIN LOOP
        =========

        PQ may contain MANY entries for the same node.
        Only the FIRST time we pop a node is valid.
        */
        while (!pq.isEmpty()) {

            // Extract the globally smallest edge
            const [wt, node, parent] = pq.dequeue()

            /*
            CRITICAL CHECK
            --------------
            If node is already visited:
            - This edge is OUTDATED
            - A cheaper edge already added this node
            */
            if (vis[node]) continue

            /*
            ACCEPT EDGE
            -----------
            Now we FINALIZE this node into the MST
            */
            vis[node] = 1
            sum += wt

            /*
            Skip dummy starting edge
            */
            if (parent !== -1) {
                mstEdges.push([parent, node, wt])
            }

            /*
            EXPLORE NEIGHBORS
            -----------------
            Add ALL edges going out of this node.

            IMPORTANT:
            ----------
            - We do NOT mark neighbors as visited here
            - We only OFFER edges as candidates
            */
            for (let [nei, w] of adj[node]) {
                if (!vis[nei]) {
                    pq.enqueue([w, nei, node])
                }
            }
        }

        /*
        At the end:
        - mstEdges.length === V - 1
        - sum is the minimum possible total weight
        */
        return { sum, mstEdges }
    }
}
