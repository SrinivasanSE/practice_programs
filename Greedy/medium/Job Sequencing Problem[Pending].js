// https://www.geeksforgeeks.org/dsa/job-sequencing-problem/

// Learn disjoint set

/*

Brute - Sorting

O(n^2) & O(n)

*/

class Solution {
    jobSequencing(deadline, profit) {
        // code here
        let jobs = []
        const n = deadline.length
        
        for(let i = 0; i < n; i++) {
            jobs.push({deadline: deadline[i], profit: profit[i]})
        }
        
        jobs.sort((a, b) => b.profit - a.profit) // sort by profit in desc order
        let totalJobs = 0, maxProfit = 0
        let slots = new Array(Math.max(...deadline) + 1).fill(0)
        for(let job of jobs) {
            
            for(let j = job.deadline; j >= 1; j--) { // check if any slot is available and try to place at the end as much as possible
                if (!slots[j]) {
                    slots[j] = 1
                    totalJobs += 1
                    maxProfit += job.profit
                    break  // when assigned, break
                }
            }
        }
        
        return [totalJobs, maxProfit]
    }
}

/*

Better - Heap
O(nlogn) & O(n)

*/

class Solution {
    jobSequencing(deadline, profit) {
        // code here
        let jobs = []
        const n = deadline.length
        
        for(let i = 0; i < n; i++) {
            jobs.push({deadline: deadline[i], profit: profit[i]})
        }
        
        jobs.sort((a, b) => a.deadline - b.deadline) // sort by deadline in asc order
        let totalJobs = 0, maxProfit = 0
        const pq = new MinHeap()
        for(let job of jobs) {
            if (job.deadline > pq.size()) { // we process deadline in ascending oder, if size is 2 and job.deadline is 3, 
            // we have already scheduled 2 jobs with deadline less than this which can be completed and this job also can be added
                pq.push(job.profit)
            } // it will come to else if when the size is equal, deadline 4 and we already have 4 jobs in the heap, so we try to find the max profit job
            else if (pq.size() > 0 && pq.top() < job.profit) { // if job is already scheduled, check if the profit is higher, if so, replace it
                // for ex: [(1,19), (1,25), (2,100), (2,27), (3,15)] 25 will replace 19 and now it will be [25, 100] now when (2, 27) comes, 
                // since this job has higher profit, 27 will replace 25 and this job with deadline 2 can be done at that place to get max profit
                pq.pop()
                pq.push(job.profit)
            }
        }
        
        while (pq.size() > 0) { // pq holds all the jobs's profit we scheduled
            totalJobs++
            maxProfit += pq.pop()
        }
        
        return [totalJobs, maxProfit]
    }
}

/*

Optimal - yet to understand

*/


class Solution {
    jobSequencing(deadline, profit) {
        // code here
        let jobs = []
        const n = deadline.length
        let maxDeadline = 0
        for(let i = 0; i < n; i++) {
            jobs.push({deadline: deadline[i], profit: profit[i]})
            maxDeadline = Math.max(deadline[i], maxDeadline)
        }
        
        jobs.sort((a, b) => b.profit - a.profit)
        let parent = new Array(maxDeadline + 1).fill(0)
        for(let i = 0; i <= maxDeadline; i++) {
            parent[i] = i
        }
        
        const find = (x) => {
            if (parent[x] === x) return x
            return parent[x] = find(parent[x]) // path compression technique
        }
        
        const union = x => parent[x] = x - 1 // this is for marking that job is not available
        let totalJobs = 0, maxProfit = 0
   
        for(let job of jobs) {      
            
            const temp = find(job.deadline)
            if (temp > 0) {
                union(temp)
                totalJobs++
                maxProfit += job.profit
            }
        }
        
        return [totalJobs, maxProfit]
    }
}