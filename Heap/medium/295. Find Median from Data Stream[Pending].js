// https://www.geeksforgeeks.org/median-of-stream-of-integers-running-integers/
// https://leetcode.com/problems/find-median-from-data-stream/description/

// Check the follow up questions in LC


class Solution {
    maxHeap = new PriorityQueue((a, b) => b - a) // this holds the lower half of numbers, ex: [2, 1]  for [1, 2, 3, 4]
    minHeap = new PriorityQueue((a, b) => a - b) // this holds the upper half of numbers, [3, 4]
    
    addNumber(num) { // O(logN)
        if (this.maxHeap.isEmpty() || this.maxHeap.peek() >= num) { 
            this.maxHeap.enqueue(num) // push the small numbers
        } else {
            this.minHeap.enqueue(num) // push the greater numbers here
        }
        
        // maxHeap can contain 1 element more than the minHeap
        if (this.maxHeap.size() > this.minHeap.size() + 1) { // if the maxHeap contains more elements than 1, move it to minHeap
            this.minHeap.enqueue(this.maxHeap.dequeue())
        } else if (this.minHeap.size() > this.maxHeap.size()) { // if the minHeap contains more, move it to maxHeap
            this.maxHeap.enqueue(this.minHeap.dequeue())
        }
    }
    
    findMedian() { // O(1)
        // The largest of the lower half (maxHeap top)
        //  and smallest of the upper half (minHeap top) are exactly the middle elements needed to compute the median.
        if (this.maxHeap.size() > this.minHeap.size()) { // if maxHeap contains more elements,than it's top is the median, maxHeap = [2, 1] minHeap = [3]
            return this.maxHeap.peek() // 2 is the median
        }
        return (this.maxHeap.peek() + this.minHeap.peek())/2.0 // if they contain same no of elements, top of both will be median
        // maxHeap - [2, 1] minHeap = [3, 4] median = (2 + 3)/2
    }
    getMedian(arr) { // O(NlogN)
        // code here
        let out = []
        for(let num of arr) {
            this.addNumber(num)
            out.push(this.findMedian())
        }
        
        return out
    }
}