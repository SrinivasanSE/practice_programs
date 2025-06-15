// https://www.geeksforgeeks.org/dsa/job-sequencing-problem/



class Solution {
    jobSequencing(deadline, profit) {
        // code here
        let jobs = []
        const n = deadline.length
        
        for(let i = 0; i < n; i++) {
            jobs.push({deadline: deadline[i], profit: profit[i]})
        }
        
        jobs.sort((a, b) => a.deadline - b.deadline)
        let totalJobs = 0, maxProfit = 0
        const pq = new MinHeap()
        for(let job of jobs) {
            if (job.deadline > pq.size()) {
                pq.push(job.profit)
            }
            else if (pq.size() > 0 && pq.top() < job.profit) { // if job is already scheduled, check if the profit is higher, if so, replace it
                pq.pop()
                pq.push(job.profit)
            }
        }
        
        while (pq.size() > 0) {
            totalJobs++
            maxProfit += pq.pop()
        }
        
        return [totalJobs, maxProfit]
    }
}

class Solution {
    jobSequencing(deadline, profit) {
        // code here
        let jobs = []
        const n = deadline.length
        
        for(let i = 0; i < n; i++) {
            jobs.push({deadline: deadline[i], profit: profit[i]})
        }
        
        jobs.sort((a, b) => b.profit - a.profit)
        let totalJobs = 0, maxProfit = 0
        let slots = new Array(Math.max(...deadline) + 1).fill(0)
        for(let job of jobs) {
            
            for(let j = job.deadline; j >= 1; j--) {
                if (!slots[j]) {
                    slots[j] = 1
                    totalJobs += 1
                    maxProfit += job.profit
                    break
                }
            }
        }
        
        return [totalJobs, maxProfit]
    }
}

// Learn disjoint set

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