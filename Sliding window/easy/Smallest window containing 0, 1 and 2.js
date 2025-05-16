// https://www.geeksforgeeks.org/smallest-window-containing-0-1-and-2/


const smallestSubstring = (S) => {
    let res = 9999999;

    // To check 0, 1 and 2
    let zero = false, one = false, two = false;

    // To store indexes of 0, 1 and 2
    let zeroindex, oneindex, twoindex;
    for (let i = 0; i < S.length; i++) {
        if (S[i] == "0") {
            zero = true;
            zeroindex = i;
        }
        else if (S[i] == "1") {
            one = true;
            oneindex = i;
        }
        else if (S[i] == "2") {
            two = true;
            twoindex = i;
        }

        // Calculating length
        if (zero && one && two)
            res = Math.min(res,
                Math.max(...[zeroindex, oneindex, twoindex])
                - Math.min(...[zeroindex, oneindex, twoindex]));
    }

    if (res == 9999999)
        return -1;
    return res + 1;
}


class Solution {
    // Function to check whether the list is palindrome.
    smallestSubstring(S) {
        // your code here
        const n = S.length
        let res = n + 1
        const hashmap = { 0: 0, 1: 0, 2: 0 }
        let formed = 0, start = 0
        for (let end = 0; end < n; end++) {
            hashmap[S[end]]++

            if (hashmap[S[end]] === 1) {
                formed++
            }

            while (start <= end && formed === 3) {
                res = Math.min(res, end - start + 1)

                hashmap[S[start]]--

                if (hashmap[S[start]] === 0) {
                    formed -= 1
                }

                start += 1
            }
        }

        return res === n + 1 ? -1 : res
    }
}