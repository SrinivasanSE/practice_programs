// https://www.geeksforgeeks.org/dsa/activity-selection-problem-greedy-algo-1/

// check naive sol for this

class Solution {
    activitySelection(start, finish) {
        // code here
        const activities = []
        
        const n = start.length
        
        for(let i = 0; i < n; i++) {
            activities.push({start: start[i], finish: finish[i]})
        }
        
        activities.sort((a, b) => a.finish - b.finish)
        
        let count = 0
        let last = -1
        for(let i = 0; i < n; i++) {
            if (last < activities[i].start) {
                last = activities[i].finish
                count++
            }
        }
        
        return count
        
    }
}


function activitySelection(start, finish)
{
    let ans = 0;
    let minHeap = new MinHeap();

    // Insert all activities into the min heap
    for (let i = 0; i < start.length; i++) {
        minHeap.push([ finish[i], start[i] ]);
    }

    let finishtime = -1;

    // Process activities in order of finish time
    while (minHeap.size() > 0) {
        let activity
            = minHeap.pop(); // Get the activity with the
                             // smallest finish time
        if (activity[1] > finishtime) {
            finishtime = activity[0];
            ans++;
        }
    }

    return ans;
}