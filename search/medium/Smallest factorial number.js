// https://www.geeksforgeeks.org/smallest-number-least-n-trailing-zeroes-factorial/
// https://www.geeksforgeeks.org/count-trailing-zeroes-factorial-number/


/*

Trailing zeros in a number are produced by factors of 10, which are the result of multiplying pairs of 2 and 5. 
In the context of factorials, there are always more factors of 2 than factors of 5, 
so the number of trailing zeros is determined by the number of times 5 appears as a factor in the numbers from 1 to ( n ).

Time Complexity: O(log2N)

We take log2N in binary search and our check() function takes log5N time so the overall time complexity becomes log2N * log5N which in a more general sense can be written as (logN)2 which can also be written as log2N.

Auxiliary Space: O(1)
*/

check(num, n) {
        let count = 0, f = 5
        
        while (f <= num) {
            count += Math.floor(num/f)
            f*=5
        }
        
        return count >= n
    }
    

    findNum(n){
        //code here
        let l = 0, r = 5*n
        
        if (n === 1) {
            return 5
        }
        
        while(l < r) {
            let mid = l + Math.floor((r - l)/2)
            if (this.check(mid, n)) {
                r = mid
            } else {
                l = mid + 1
            }
            
            
        }
        
        return r
    }
