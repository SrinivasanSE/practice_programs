// https://www.geeksforgeeks.org/print-binary-tree-levels-sorted-order/

class Solution {
    binTreeSortedLevels(arr, n) {
        let q = [];
        q.push({ data: arr[0], index: 0 });
        let res = [];

        while (q.length > 0) { // queue is used for tracking the level and heap is used to add all the nodes in that level and then print in sorted order
            const len = q.length;

            // Create a min-heap using your custom PriorityQueue
            const pq = new PriorityQueue((a, b) => a - b);

            for (let i = 0; i < len; i++) {
                const { data, index } = q.shift();
                pq.enqueue(data);

                const left = 2 * index + 1;
                const right = 2 * index + 2;

                if (left < n) {
                    q.push({ data: arr[left], index: left });
                }

                if (right < n) {
                    q.push({ data: arr[right], index: right });
                }
            }

            // Extract sorted values from priority queue for this level
            const level = [];
            while (!pq.isEmpty()) {
                level.push(pq.dequeue());
            }

            res.push(level);
        }

        return res;
    }
}

