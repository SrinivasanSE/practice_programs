// https://leetcode.com/discuss/post/1072418/disjoint-set-union-dsuunion-find-a-compl-2oqn/

/*


1️⃣ What is a Disjoint Set (Union–Find)?

A Disjoint Set data structure maintains a collection of non-overlapping sets and supports two very fast operations:

Core operations

Find → “Which set does this element belong to?”

Union → “Merge two sets”

Real-life intuition 🧠

Think of groups of friends:

Initially, everyone is alone

When two people become friends → their groups merge

Later, you want to know:

“Are A and B in the same friend group?”

That’s exactly what Disjoint Set does.

2️⃣ Why do we need it?

Used in problems like:

Cycle detection in graphs

Kruskal’s MST

Dynamic connectivity

Connected components

Why not DFS/BFS every time?
➡️ Because Disjoint Set answers queries in almost O(1) time.

3️⃣ Core Concepts (VERY IMPORTANT)
① Parent array

Each node points to its parent

Root node is the representative of the set

If parent[x] == x → x is the leader

Example:

parent = [0, 1, 1, 3, 3]

Sets:
{1,2}
{3,4}

② Find with Path Compression

Goal: Quickly find the root and flatten the tree.

Before:

4 → 3 → 1


After path compression:

4 → 1
3 → 1


➡️ Makes future operations extremely fast.

③ Union

Merge two sets by attaching one root to another.

Two optimizations:

Union by Rank

Union by Size

They prevent the tree from becoming tall.

Why Rank vs Size?
Method	What it tracks	Common use
Rank	Tree height	Theoretical
Size	Number of nodes	Practical


*/

/*

O(α(N)) & O(m α(n)) ≈ O(m)

*/

class DisJointSet {
  constructor(n) {
    /*
        parent[i] = immediate parent of i
        Initially, every node is its OWN parent
        => each node is a separate set
        */
    this.parent = new Array(n + 1);

    /*
        rank[i] = approx height of tree rooted at i
        Used only in unionByRank
        */
    this.rank = new Array(n + 1).fill(0);

    /*
        size[i] = number of nodes in set rooted at i
        Used only in unionBySize
        */
    this.size = new Array(n + 1).fill(1);

    // Initially: parent[i] = i
    for (let i = 0; i <= n; i++) {
      this.parent[i] = i;
    }
  }

  findPar(u) {
    /*
        If u is the parent of itself,
        then u is the root (leader)
        */
    if (u == this.parent[u]) {
      return u;
    }

    /*
        Path Compression:
        Make u directly point to root
        */
    return (this.parent[u] = this.findPar(this.parent[u]));
  }

  unionByRank(u, v) {
    // Find ultimate parents
    const edgeUPar = this.findPar(u);
    const edgeVPar = this.findPar(v);

    // Already in same set → do nothing
    if (edgeUPar == edgeVPar) return;

    /*
        Attach smaller rank tree
        under larger rank tree
        */
    if (this.rank[edgeUPar] < this.rank[edgeVPar]) {
      this.parent[edgeUPar] = edgeVPar;
    } else if (this.rank[edgeUPar] > this.rank[edgeVPar]) {
      this.parent[edgeVPar] = edgeUPar;
    } else {
      /*
            Same rank:
            - Attach one to another
            - Increase rank of new root
            */
      this.parent[edgeVPar] = edgeUPar;
      this.rank[edgeUPar]++;
    }
  }

  unionBySize(u, v) {
    // Find ultimate parents
    const edgeUPar = this.findPar(u);
    const edgeVPar = this.findPar(v);

    // Same component → nothing to do
    if (edgeUPar == edgeVPar) return;

    /*
        Attach smaller set
        under larger set
        */
    if (this.size[edgeUPar] < this.size[edgeVPar]) {
      this.parent[edgeUPar] = edgeVPar;
      this.size[edgeVPar] += this.size[edgeUPar];
    } else {
      this.parent[edgeVPar] = edgeUPar;
      this.size[edgeUPar] += this.size[edgeVPar];
    }
  }
}
