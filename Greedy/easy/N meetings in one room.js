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
        
        c.sort((a, b) => a[1] - b[1])
        let count = 0
        let last = -1
        for(let i = 0; i < start.length; i++) {
            if (last < c[i][0] ) {
                last = c[i][1]
                count++
            }
        }
        
        return count
    }
}