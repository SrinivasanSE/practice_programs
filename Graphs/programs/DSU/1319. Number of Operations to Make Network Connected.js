// https://leetcode.com/problems/number-of-operations-to-make-network-connected/description/

/*

🧠 Problem restated (in simple words)

You have n computers (nodes)

connections[i] = [u, v] means there is a cable between u and v

You can remove a cable and reconnect it elsewhere

Goal: Make all computers connected

Return minimum number of operations, or -1 if impossible

*/


/*

DSU

O(m) & O(n)


*/


var makeConnected = function (n, connections) {

    /*
    ================================
    STEP 1: FEASIBILITY CHECK
    ================================

    To connect 'n' nodes, the minimum number of edges required is (n - 1).

    Reason:
    - A connected graph with no cycles (tree) always has exactly n - 1 edges.
    - Even if we are allowed to REMOVE and REUSE cables,
      we still need at least n - 1 total cables.

    If total cables < n - 1:
    - There is NO way to connect all computers
    - So we can immediately return -1

    This is why we do NOT need to count extra edges later.
    */
    if (connections.length < n - 1) return -1


    /*
    ================================
    STEP 2: BUILD CONNECTED COMPONENTS USING DSU
    ================================

    Disjoint Set (Union-Find) will group nodes
    that are already connected.

    Initially:
    Each node is its own component
    {0}, {1}, {2}, ..., {n-1}
    */
    const ds = new DisJointSet(n)


    /*
    ================================
    STEP 3: UNION ALL GIVEN CONNECTIONS
    ================================

    For every cable [u, v]:
    - If u and v are already connected → DSU ignores it
    - If not → DSU merges their components

    Important:
    - We DO NOT care whether an edge is "extra" or "useful"
    - DSU automatically handles redundancy
    */
    for (let [u, v] of connections) {
        ds.unionBySize(u, v)
    }


    /*
    ================================
    STEP 4: COUNT CONNECTED COMPONENTS
    ================================

    In DSU:
    - A node 'i' is a component leader (root) if parent[i] == i
    - Each root represents ONE connected component

    Example:
    parent = [0,0,2,3,3]

    Components:
    {0,1}, {2}, {3,4}
    → components = 3
    */
    let components = 0
    for (let i = 0; i < n; i++) {
        if (ds.parent[i] == i) components++
    }


    /*
    ================================
    STEP 5: COMPUTE MINIMUM OPERATIONS
    ================================

    If there are 'components' disconnected parts:

    Each operation can connect TWO components
    → reduces component count by 1

    To reduce components from:
    components → 1

    Required operations:
    components - 1

    Why we don't check extra edges:
    - Since total edges >= n - 1 (checked earlier),
      there are GUARANTEED enough spare cables
      to perform these (components - 1) operations.
    */
    return components - 1
};

