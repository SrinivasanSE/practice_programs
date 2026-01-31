| Feature                 | **Dijkstra**          | **Bellman–Ford**           | **Floyd–Warshall**    |
| ----------------------- | --------------------- | -------------------------- | --------------------- |
| Type                    | Greedy                | Dynamic Programming        | Dynamic Programming   |
| Shortest path           | Single-source         | Single-source              | All-pairs             |
| Handles negative edges  | ❌ No                  | ✅ Yes                      | ✅ Yes                 |
| Detects negative cycles | ❌ No                  | ✅ Yes                      | ✅ Yes                 |
| Graph type              | Directed / Undirected | Directed / Undirected      | Directed / Undirected |
| Edge weight constraint  | Non-negative only     | Any                        | Any                   |
| Time Complexity         | `O(E log V)` (heap)   | `O(VE)`                    | `O(V³)`               |
| Space Complexity        | `O(V + E)`            | `O(V)`                     | `O(V²)`               |
| Best for                | Large sparse graphs   | Graphs with negative edges | Dense graphs          |
| Scalability             | ⭐⭐⭐⭐                  | ⭐⭐                         | ⭐                     |
| Typical implementation  | Min-heap (PQ)         | Edge relaxation loops      | 2D DP matrix          |
| Early stopping          | ❌                     | ✅                          | ❌                     |
| Used in                 | Routing, networks     | Currency arbitrage         | APSP problems         |
| Interview frequency     | ⭐⭐⭐⭐                  | ⭐⭐⭐                        | ⭐⭐                    |
