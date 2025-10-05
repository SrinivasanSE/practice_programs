
// learn Shortest Remaining Time First (Preemptive SJF) Scheduling Algorithm

/*

O(nlogn) & O(1)

*/


class Solution {
    // Function to solve the given problem.
    solve(bt) {
        // your code here
        bt.sort((a, b) => a - b) // sort by process time in asc order
        
        let wt = 0, t = 0
        const n = bt.length
        for (let i = 0; i < n; i++) {
            wt += t // wait time will be 0 for the first process
            t += bt[i] // calculates the time
        }
        
        return Math.floor(wt / n)
    }
}