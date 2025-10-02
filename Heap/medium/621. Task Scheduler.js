// https://leetcode.com/problems/task-scheduler/description/

/*

Brute - Heap and Dequeue
O(TLogk) & O(k)

*/

var leastInterval = function(tasks, n) {
    const heap = new MaxHeapC()
    const q = []

    const map = new Map()

    for (let task of tasks) {  // O(T), T = no of tasks
        map.set(task, (map.get(task) || 0 ) + 1)
    }

    for (let val of map.values()) { // O(klogk), k = no of unique tasks
        heap.insert(val) // heap will contain the freq of the tasks
    }

    let time = 0, cnt = 0
    // process tasks from heap or queue
    while (!heap.isEmpty() || q.length > 0) { // O(Tlogk), T tasks will be inserted and extracted from heap
        time++
        if (!heap.isEmpty()) {
            cnt = heap.extractMax() - 1 // since this task is processed, calculate the remaining pending tasks and push it to queue again
            if (cnt) {
                q.push([cnt, time + n]) // push with gap n
            }
        }
        if (q.length && q[0][1] === time) { // if the current time matches the first one in the queue, that means the time has come for this task to get scheduled
            heap.insert(q[0][0]) // insert again to heap and pop from queue
            q.shift()
        }

    }

    return time
};

/*

Better - Hashmap & Sorting
O(T) & O(1)

*/


var leastInterval = function(tasks, n) {
    const freqMap = new Array(26).fill(0)
    let curr

    for (let task of tasks) {
        curr = task.charCodeAt() - 65
        freqMap[curr]++
    }

    freqMap.sort((a, b) => b - a) // sort the freq in desc order, the max will be at the top

    let cycles = freqMap[0] - 1 // this represents how many cycles are there, A--A--A, maxFreq = 3, 3 - 1 = 2, we have two cycles/slots between 3 A's
    let gaps = cycles * n // Represents how many gaps are there, A--A--A, cycles = 2, there should be n gap, so 2*2 = 4, we can see four hyphens

    for (let i = 1; i < 26; i++) {
        gaps -= Math.min(cycles, freqMap[i]) // we try to reduce the gaps by filling the remaining chars in the gap, 
        // it can be only min of cycles and freq of the char, if B has freq of 3 and cycles is 2, we can only fill the two gaps, each in a cycle,
        //  because in one cycle, B can't be together since n gap is needed, AB-AB-AB
    }

    return gaps < 0 ? tasks.length : tasks.length + gaps // if gaps is negative, that means there is no idle time and all gaps can be filled
};


/*

Optimal - Greedy

O(T) & O(1)

*/

var leastInterval = function(tasks, n) {
    const freqMap = new Array(26).fill(0)
    let maxFreq = 0, tasksWithMaxFreq = 0, curr

    for (let task of tasks) {
        curr = task.charCodeAt() - 65
        freqMap[curr]++
        maxFreq = Math.max(maxFreq, freqMap[curr])
    }

    for (let i = 0; i < 26; i++) {
        if (freqMap[i] === maxFreq) { // we find how many tasks has the same maxFreq
            tasksWithMaxFreq++
        }
    }

    const minIntervals = (maxFreq - 1) * (n + 1) + tasksWithMaxFreq

    return Math.max(tasks.length, minIntervals) // if enough tasks are there, no idle time is needed and tasks.length will be the ans
};

/*

maxFreq - 1 -> there are maxFreq - 1 cycles between the maxFreq elements, A--A--A, 2 cycles between 3 A's
n + 1 -> There are n gaps between the A's and including A's it's 3 slots per cycle
tasksWithMaxFreq -> We don't include the last A in the above 2, so we include that and other chars with same maxFreq, 
so both A and B will be in the last block like AB-AB-AB if they have the same maxFreq

*/