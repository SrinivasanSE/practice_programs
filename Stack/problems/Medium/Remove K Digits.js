// https://www.geeksforgeeks.org/build-lowest-number-by-removing-n-digits-from-a-given-number/

class Solution {
    removeKdigits(s, k) {
        // code here
        let stk = []
        
        for(let c of s) {
            while (k > 0 && stk.length > 0 && +c < stk[stk.length - 1]) {
                stk.pop()
                k--
            }
            stk.push(+c)
        }
        while (k > 0 && stk.length) {
            k--
            stk.pop()
        }
        let res = ""
        for(let i = 0; i < stk.length; i++) {
            if(stk[i] == "0" && !res) {
                continue
            }
            res += stk[i]
        }
        if(!res) {
            res = "0"
        }
        return res   
        
    }
}

/*
The idea is based on the fact that a character among first (n+1) characters must be there in resultant number. 
So we pick the smallest of first (n+1) digits and put it in result, and recur for the remaining characters. Below is complete algorithm.  
*/

function buildLowestNumber(str, n) {
	// Base Case 1: If n == 0, append the whole 'str' to 'res' and return
	if (n === 0) {
		return str;
	}

	const len = str.length;

	// Base Case 2: If 'len' is smaller or equal to n, everything can be removed
	if (len <= n) {
		return "";
	}

	// Find the smallest character among the first (n+1) characters of 'str'
	let minIndex = 0;
	for (let i = 1; i <= n; ++i) {
		if (str[i] < str[minIndex]) {
			minIndex = i;
		}
	}

	// Append 'str[minIndex]' to 'res' and recur for the substring after minIndex
	// and for n = n-minIndex
	return str[minIndex] + buildLowestNumber(str.substring(minIndex + 1), n - minIndex);
}

