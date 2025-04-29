// https://www.geeksforgeeks.org/rearrange-characters-string-no-two-adjacent/



class Solution {
    rearrangeString(str) {
        // code here
        const freq = {}
        let maxFreq = 0
        for(let char of str) {
            freq[char] = (freq[char] || 0) + 1
            maxFreq = Math.max(freq[char], maxFreq)
            
        }
        
        if (maxFreq > Math.ceil(str.length/2)) return ""
        const heap = new MaxHeap()
        for(let key of Object.keys(freq)) {
            heap.insert({char: key, freq: freq[key]})
        }
        let lastUsed = null
        let res = ""
        while(!heap.isEmpty()) {
            let {freq, char} = heap.extractMax()
            freq-=1
            res += char
            
            if (lastUsed) {
                heap.insert(lastUsed)
            }
            
            if (freq > 0) {
                lastUsed = {freq, char}
            } else {
                lastUsed = null
            }
        }
        if (res.length === str.length) {
            return res
        }
        return ""
    }
}