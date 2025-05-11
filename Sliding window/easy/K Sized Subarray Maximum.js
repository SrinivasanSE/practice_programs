// https://www.geeksforgeeks.org/sliding-window-maximum-maximum-of-all-subarrays-of-size-k/

//Dequeue
class Solution {
    maxOfSubarrays(arr, k) {
        // code here
        const n = arr.length
        
        if (n < k) {
            return
        }
        
        let out = []
        
        const dequeue = []
        
        for(let i = 0; i < n; i++) {
            while (dequeue.length > 0 && arr[dequeue[dequeue.length - 1]] <= arr[i]) {
                dequeue.pop()
            }
            
            dequeue.push(i)
            
            if (dequeue[0] <= i - k) {
                dequeue.shift()
            }
            
            if (i >= k - 1) {
                out.push(arr[dequeue[0]])
            }
        }
        
        return out
    }
}


// Max heap
class Solution {
    maxOfSubarrays(arr, k) {
        // code here
        const n = arr.length
        
        if (n < k) {
            return
        }
        
        let out = []
        const pq = new PriorityQueue(compare)
        for(let i = 0; i < k; i++) {
            pq.enqueue({value: arr[i], index: i})
        }
        out.push(pq.getTop().value)
        for(let i = k; i < n; i++) {
           pq.enqueue({value: arr[i], index: i})
           while(pq.getTop().index <= i - k) {
               pq.dequeue()
           }
           
           out.push(pq.getTop().value)
        }
        
        return out
    }
}



class Solution {
    maxOfSubarrays(arr, k) {
        // code here
        const n = arr.length
        
        if (n < k) {
            return
        }
        let out = []
        let max
        for(let i = 0; i < n - k + 1; i++) {
            max = 0
            for (let j = 0; j < k; j++) {
                max = Math.max(max, arr[i + j])
            }
            
            out.push(max)
        }
        return out
    }
}