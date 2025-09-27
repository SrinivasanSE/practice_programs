// https://leetcode.com/problems/longest-repeating-character-replacement/description/

/*

Similar to 1004 Max Consecutive 1s

we dont want to minimize our max freq variable to get better result, ie. if we get result for max freq 3 we will continue to look for max freq greater 
than 3 if it exists and ignore freq less than equal 3. 
This will eliminate need of freq map scan and also remove while loop if we want to look for better max length.

so the trick is, agree that we don't have updated maxFreq but when the length increases as new char comes, we need to have a greater maxFreq to get a bigger and valid ans. if its invalid at maxFreq 3, it won't be vaild on maxFreq 2,1.. it will be on 4,5,6.. and if any char get this freq, we'll be aware from the start of iteration.
we remove only 1 char in one iteration.
O(n) & O(1)
*/



var characterReplacement = function(s, k) {
    const n = s.length
    let maxFreq = 0
    let start = 0, right = 0
    const hashmap = new Array(26).fill(0)

    for(right = 0; right < n; right++) {
        hashmap[s.charCodeAt(right) - 65]++
        maxFreq = Math.max(maxFreq, hashmap[s.charCodeAt(right) - 65])

        if ((right - start + 1) - maxFreq > k) { // check how many chars needs to be replaced and if it's greater than k or not
            hashmap[s.charCodeAt(start) - 65]--
            start++
        }
    }

    return right - start
};

