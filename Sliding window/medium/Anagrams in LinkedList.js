// https://www.geeksforgeeks.org/find-anagrams-in-linked-list/

//Check the variant of allowing overlapping anagrams below

function isAnagram(a, b) {
    for(let i = 0; i < a.length; i++) {
        if (a[i] != b[i]) return false
    }
    
    return true
}
class Solution {
    // Function to find anagrams of a string in another string.
    findAnagrams(head, str) {
        // your code here
        
        let start = head
        const _freq = new Array(26).fill(0)
        const m = str.length
        for(let char of str) {
            _freq[char.charCodeAt(0) - 97]++
        }
        
        const res = []
        let prev = null, end, freq
        while (start) {
            freq = new Array(26).fill(0)
            end = start
           for(let i = 0; i < m && end != null; i++) {
                freq[end.data.charCodeAt(0) - 97]++
                prev = end
                end = end.next
            }
            if (isAnagram(freq, _freq)) {
                prev.next = null
                res.push(start)
                start = end
            } else {
                start = start.next
            }
        }
        
        return res
    }
}




function isSameFreq(freq1, freq2) {
    for (let i = 0; i < 26; i++) {
        if (freq1[i] !== freq2[i]) return false;
    }
    return true;
}

class Solution {
    findAnagrams(head, str) {
        const res = [];
        if (!head || str.length === 0) return res;

        const patternFreq = new Array(26).fill(0);
        const windowFreq = new Array(26).fill(0);
        const aCode = 'a'.charCodeAt(0);
        const len = str.length;

        for (let ch of str) {
            patternFreq[ch.charCodeAt(0) - aCode]++;
        }

        let start = head;
        let end = head;
        let count = 0;
        const windowNodes = [];

        while (end) {
            const idx = end.data.charCodeAt(0) - aCode;
            windowFreq[idx]++;
            windowNodes.push(end);
            count++;

            if (count === len) {
                if (isSameFreq(patternFreq, windowFreq)) {
                    // Build a new linked list for the anagram
                    let dummy = { data: windowNodes[0].data, next: null };
                    let curr = dummy;
                    for (let i = 1; i < len; i++) {
                        curr.next = { data: windowNodes[i].data, next: null };
                        curr = curr.next;
                    }
                    res.push(dummy);
                }

                // Slide the window
                const removeIdx = windowNodes[0].data.charCodeAt(0) - aCode;
                windowFreq[removeIdx]--;
                windowNodes.shift();
                start = start.next;
                count--;
            }

            end = end.next;
        }

        return res;
    }
}
