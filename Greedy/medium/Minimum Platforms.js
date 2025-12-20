// https://www.geeksforgeeks.org/minimum-number-platforms-required-railwaybus-station/


/*

Brute

O(n^2) & O(1)

*/

class Solution {
    findPlatform(arr, dep) {
        // your code here

        const n = arr.length
        let platforms = 0, max = 0

        for (let i = 0; i < n; i++) {
            platforms = 1

            for (let j = 0; j < n; j++) {
                if (i != j) {
                    if (arr[i] >= arr[j] && arr[i] <= dep[j]) { // checking for overlap, arr[i] is btw arr[j] - dep[j]
                        platforms++
                    }
                }
            }

            max = Math.max(max, platforms)
        }


        return max
    }
}


/*

Better - Sorting

O(nlogn) & O(1)

*/


class Solution {
    // Function to find the minimum number of platforms required at the
    // railway station such that no train waits.
    findPlatform(arr, dep) {
        // your code here
        arr.sort((a, b) => a - b)
        dep.sort((a, b) => a - b)

        let i = 0, j = 0

        const n = arr.length
        let platforms = 0, max = 0
        while (i < n && j < n) {
            if (arr[i] <= dep[j]) { // if the train departs at/after the current arrival
                platforms++
                i++
            } else {
                platforms -= 1
                j++
            }

             max = Math.max(max, platforms) // keep tracking max no of platforms allocated at any time
        }

        return max
    }
}

/*

Better - Heap

O(nlogn) * O(1)

*/

function minPlatform(arr, dep) {
    let n = arr.length;

    let v = arr.map((time, index) => [time, dep[index]]); // add both arrival and departure to the temp arr
    
    // sort by arrival time
    v.sort((a, b) => a[0] - b[0]); 

    let pq = new MinHeap(); // to track train departures
    let ans = 0;

    for (let i = 0; i < n; i++) {
    
        // free platforms for trains that have departed
        while (pq.size > 0 && pq.peek() < v[i][0]) {
            pq.pop();
        }

        // add current train's departure
        pq.push(v[i][1]);

        // track maximum platforms used
        ans = Math.max(ans, pq.size);
    }

    return ans;
}

/*

Optimal 
The Sweep Line Algorithm is an efficient technique for solving interval-based problems. 
It works by treating each train's arrival and departure times as events on a timeline. 
By processing these events in chronological order, we can track the number of trains at the station at any moment, 
which directly indicates the number of platforms required at that time. 
The maximum number of overlapping trains during this process determines the minimum number of platforms needed.

O(n + r) & O(r), where r is max(dep)

*/

class Solution {
    findPlatform(arr, dep) {
        // your code here

        const n = arr.length
        const maxDept = Math.max(...dep)
        let count = 0
        let max = 0
        const v = new Array(maxDept + 2).fill(0) // we use index + 1 for dep, so there should be enough space. Assume max(dep) = 1, new Array(2), [0, 1], but we need index 2, so we add + 2

        for (let i = 0; i < n; i++) {
            v[arr[i]]++
            v[dep[i] + 1]-- // we add 1 to mark the next minute as free, if two train arrive and depart at the same time, it will give wrong output if we don't add 1
        }

        for (let i = 0; i <= maxDept + 1; i++) {
            count += v[i]
            max = Math.max(max, count)
        }

        return max

    }
}




