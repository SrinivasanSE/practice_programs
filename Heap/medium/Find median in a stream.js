// https://www.geeksforgeeks.org/median-of-stream-of-integers-running-integers/


class Solution {
    maxHeap = new PriorityQueue((a, b) => b - a)
    minHeap = new PriorityQueue((a, b) => a - b)
    
    addNumber(num) {
        if (this.maxHeap.isEmpty() || this.maxHeap.peek() >= num) {
            this.maxHeap.enqueue(num)
        } else {
            this.minHeap.enqueue(num)
        }
        
        if (this.maxHeap.size() > this.minHeap.size() + 1) {
            this.minHeap.enqueue(this.maxHeap.dequeue())
        } else if (this.minHeap.size() > this.maxHeap.size()) {
            this.maxHeap.enqueue(this.minHeap.dequeue())
        }
    }
    
    findMedian() {
        if (this.maxHeap.size() > this.minHeap.size()) {
            return this.maxHeap.peek()
        }
        return (this.maxHeap.peek() + this.minHeap.peek())/2.0
    }
    getMedian(arr) {
        // code here
        let out = []
        for(let num of arr) {
            this.addNumber(num)
            out.push(this.findMedian())
        }
        
        return out
    }
}