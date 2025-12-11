// https://leetcode.com/problems/longest-repeating-character-replacement/description/


/*

Brute

O(n^2) & O(1)

*/

class Solution {
    // Function to return the maximum length of substring where we can
    // replace at most k characters to make all characters the same
    characterReplacement(s, k) {

        // Variable to store the max length found
        let maxLength = 0;

        // Outer loop to start from every index
        for (let i = 0; i < s.length; i++) {

            // Frequency array for characters A-Z
            const freq = new Array(26).fill(0);

            // Track the highest frequency character in the window
            let maxFreq = 0;

            // Inner loop to expand the window
            for (let j = i; j < s.length; j++) {

                // Update frequency of current character
                freq[s.charCodeAt(j) - 65]++;

                // Update the max frequency character seen so far
                maxFreq = Math.max(maxFreq, freq[s.charCodeAt(j) - 65]);

                // Calculate current window size
                const windowSize = j - i + 1;

                // Calculate how many characters need replacement
                const replace = windowSize - maxFreq;

                // If replacements within limit, update result
                if (replace <= k) {
                    maxLength = Math.max(maxLength, windowSize);
                } else {
                    break
                }
            }
        }

        return maxLength;
    }
}

/*

Better

O(n + n) * O(26) & O(1)

*/

var characterReplacement = function (s, k) {
    const freq = new Array(26).fill(0);

    // Left pointer of sliding window
    let left = 0;

    // Max frequency of any char in window
    let maxFreq = 0;

    // Stores result
    let maxLen = 0;

    // Traverse the string with right pointer
    for (let right = 0; right < s.length; right++) {

        // Count frequency of current character
        const ch = s[right];
        freq[ch.charCodeAt(0) - 65]++

        // Update max frequency in window
        maxFreq = Math.max(maxFreq, freq[ch.charCodeAt(0) - 65]);

        // If window is invalid, shrink it
        while ((right - left + 1) - maxFreq > k) {
            freq[s[left].charCodeAt(0) - 65]--;
            maxFreq = 0
            for (let i = 0; i < 26; i++) { // find the maxFreq from the hashmap again since we reduced the frequency
                maxFreq = Math.max(maxFreq, freq[i])
            }
            left++;
        }

        // Update result
        maxLen = Math.max(maxLen, right - left + 1);
    }

    return maxLen;
};

/*

Optimal

O(n) & O(1)

*/

/*

Similar to 1004 Max Consecutive 1s

we dont want to minimize our max freq variable to get better result, ie. if we get result for max freq 3 we will continue to look for max freq greater 
than 3 if it exists and ignore freq less than equal 3. 
This will eliminate need of freq map scan and also remove while loop if we want to look for better max length.

so the trick is, agree that we don't have updated maxFreq but when the length increases as new char comes, we need to have a greater maxFreq to get a bigger and valid ans. if its invalid at maxFreq 3, it won't be vaild on maxFreq 2,1.. it will be on 4,5,6.. and if any char get this freq, we'll be aware from the start of iteration.
we remove only 1 char in one iteration.

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

