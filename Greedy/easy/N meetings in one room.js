// https://www.geeksforgeeks.org/problems/n-meetings-in-one-room-1587115620/1?page=1&category=Greedy&difficulty=Easy&status=unsolved&sortBy=submissions

// Check the dp approach for this

class Solution {
    // Function to find the maximum number of meetings that can
    // be performed in a meeting room.
    maxMeetings(start, end) {
        // code here
        let c = []
        
        for(let i = 0; i < start.length; i++) {
            c.push([start[i], end[i]])
        }
        
        c.sort((a, b) => a[1] - b[1]) // sort by finish time, choose the meetings which ends first
        let count = 0
        let last = -1 // tracks end time of previous meeting
        for(let i = 0; i < start.length; i++) {
            if (last < c[i][0] ) {
                last = c[i][1]
                count++
            }
        }
        
        return count
    }
}

// https://www.geeksforgeeks.org/find-maximum-meetings-in-one-room/
// return the index of the meeting instead of count

class Solution {
    maxMeetings(N, S, F) {
        // code here
        const meetings = []
        
        for(let i = 0; i < N; i++) {
            meetings.push({start: S[i], finish: F[i], index: i})
        }
        
        meetings.sort((a, b) => a.finish - b.finish)
        
        const res = []
        let last = -1
        for(let i = 0; i < N; i++) {
            if (last < meetings[i].start) {
                res.push(meetings[i].index + 1)
                last = meetings[i].finish
            }
        }
        res.sort((a, b) => a - b)
        return res
    }
}