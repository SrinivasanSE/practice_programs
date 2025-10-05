// https://www.geeksforgeeks.org/dsa/program-for-least-recently-used-lru-page-replacement-algorithm/


class Solution {
    pageFaults(N, C, pages) {
        // code here
        const dq = []
        const set = new Set()
        
        let pageFaults = 0
        
        for (let page of pages) {
            if (!set.has(page)) {
                pageFaults++ // when the page is not there
                
                if (set.size === C) {
                    set.delete(dq.pop()) // delete the least recently used which is at the end of the dequeue
                }
                
                dq.unshift(page) // add the new page to the front
                set.add(page)
            } else { // page already exists, so we have to remove it and add to the front to track it as recently used
                const index = dq.indexOf(page)
                dq.splice(index, 1) 
                dq.unshift(page)
            }
        }
        
        return pageFaults
    }
}